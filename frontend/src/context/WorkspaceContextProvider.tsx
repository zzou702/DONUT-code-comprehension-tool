import React, { ReactElement, useEffect, useState } from "react";
import QuestionState from "../models/QuestionState";
import type monaco from "monaco-editor";
import axios from "axios";
import Question from "../models/Question";
import { Difficulties, parse } from "../models/Difficulty";
import ProgramGenState from "../models/ProgramGenState";
import Message from "../models/Message";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const OFFLINE_MODE = false;
export interface WorkspaceContextType {
  studentId: string;
  setStudentId: (studentId: string) => void;
  hasInputStudentId: boolean;
  setInputStudentId: (hasInputStudentId: boolean) => void;

  prompt: string;
  setPrompt: (newPrompt: string) => void;

  language: string;
  setLanguage: (language: string) => void;

  program: string;
  programId: string;
  programLoading: boolean;
  generateProgram: (prompt: string) => Promise<void>;

  editor: monaco.editor.IStandaloneCodeEditor | undefined;
  setEditor: (editor: monaco.editor.IStandaloneCodeEditor) => void;
  isEditorDisabled: boolean;
  setEditorDisabled: (isDisabled: boolean) => void;
  isEditorReadOnly: boolean;
  setEditorReadOnly: (isReadOnly: boolean) => void;

  programGenState: ProgramGenState;
  setProgramGenState: (state: ProgramGenState) => void;

  isTutorialOpen: boolean;
  setTutorialOpen: (isOpen: boolean) => void;

  questionUpdatedFlag: number;
  currentQuestionNumber: number;
  setCurrentQuestion: (number: number) => void;

  /**
   * Get the current question. Use this when you need to modify the question's properties.
   */
  getCurrentQuestion: () => QuestionState;
  resetCurrentQuestion: () => void;

  questionStates: QuestionState[];
  loadQuestions: () => boolean;
  generateQuestions: () => Promise<void>;
  saveQuestions: () => void;
  clearQuestions: () => void;
  questionsLoading: boolean;

  isSubmitting: boolean;
  submitAnswer: (
    question: string,
    answer: string,
    difficulty: string
  ) => Promise<void>;

  messages: Message[];
  addMessage: (message: Message) => void;
  clearMessages: () => void;
  loadMessages: () => Promise<void>;
  messagesLoading: boolean;

  // TODO: remove temp chat functionality for testing
  sendChatPrompt: (message: Message) => Promise<string>;
  responseLoading: boolean;

  // Explanation context
  highlightedLines: string[];
  setHighlightedLines: (lines: string[]) => void;
  explanation: string;
  setExplanation: (explanation: string) => void;
  generateExplanation: () => Promise<void>;
  explanationLoading: boolean;
  setExplanationLoading: (loading: boolean) => void;

  isFeedbackOpen: boolean;
  setFeedbackOpen: (isFeedbackOpen: boolean) => void;

  resetWorkspace: () => void;
}

const WorkspaceContext = React.createContext<WorkspaceContextType>(
  {} as WorkspaceContextType
);

enum LocalStorageKeys {
  QuestionStates = "QuestionStates",
}

type Props = {
  children: ReactElement | ReactElement[];
};

function WorkspaceContextProvider({ children }: Props) {
  const [studentId, setStudentId] = useState("");
  const [hasInputStudentId, setInputStudentId] = useState(false);

  const DEFAULT_prompt = "";
  const [prompt, setPromptState] = useState<string>(DEFAULT_prompt);

  const setPrompt = (newPrompt: string) => {
    setPromptState(newPrompt);
  };

  const DEFAULT_language = "javascript";
  const [language, setLanguage] = useState<string>(DEFAULT_language);

  const DEFAULT_program = "";
  const [program, setProgram] = useState<string>(DEFAULT_program);
  const [programId, setProgramId] = useState("");
  const [programLoading, setProgramLoading] = useState(false);

  const generateProgram = async (prompt: string) => {
    console.log(`Generating program with prompt: "${prompt}".`);

    if (OFFLINE_MODE) {
      const dummyProgram = "Dummy program";
      setProgram(dummyProgram);
      setProgramId("id");
      setLanguage("javascript");

      return;
    }

    setProgramLoading(true);

    try {
      const response = await axios.post(`${API_BASE_URL}/ai/program`, {
        prompt,
        student_id: studentId,
      });
      console.log(response);

      const result = response.data.result;

      setProgram(result.program);
      setProgramId(result.program_id);
      setLanguage(result.language);
    } catch (error) {
      console.error(error);
    } finally {
      setProgramLoading(false);
    }
  };

  const [editor, setEditorState] =
    useState<monaco.editor.IStandaloneCodeEditor>();

  const setEditor = (editor: monaco.editor.IStandaloneCodeEditor) => {
    setEditorState(editor);
  };

  const [isEditorDisabled, setEditorDisabled] = useState(false);
  const [isEditorReadOnly, setEditorReadOnly] = useState(false);

  const [programGenState, setProgramGenState] = useState<ProgramGenState>(
    ProgramGenState.UNSELECTED
  );

  const [isTutorialOpen, setTutorialOpen] = useState(true);

  const [questionStates, setQuestionStates] = useState<QuestionState[]>([]);
  const [questionsLoading, setQuestionsLoading] = useState(false);

  const [questionUpdatedFlag, setQuestionUpdatedFlag] = useState(0);
  const [currentQuestionNumber, setCurrentQuestionNumber] = useState<number>();

  /**
   * Call this each time the current question is modified to notify components to rerender.
   * FIXME: Not using useState for currentQuestion, as need to be able to modify and store inside of an array.
   */
  const triggerQuestionUpdatedFlag = () => {
    setQuestionUpdatedFlag((prev) => prev + 1);
  };

  const setCurrentQuestion = (number: number) => {
    setCurrentQuestionNumber(number);
    triggerQuestionUpdatedFlag();
  };

  const getCurrentQuestion = () => {
    if (!questionStates || !currentQuestionNumber) {
      return;
    }
    const currentQuestion = questionStates.find(
      (questionState) => questionState.number == currentQuestionNumber
    );

    return currentQuestion;
  };

  const resetCurrentQuestion = () => {
    const currentQuestion = getCurrentQuestion();

    if (!currentQuestion) {
      return;
    }
    currentQuestion.reset();
    triggerQuestionUpdatedFlag();
    clearMessages();
  };

  const loadQuestions = (): boolean => {
    console.log("Loading questions from local storage...");

    const serialized = localStorage.getItem(LocalStorageKeys.QuestionStates);
    console.log(serialized);

    if (!serialized) {
      console.warn("Questions have never been saved to local storage.");
      return false;
    }

    const questions = JSON.parse(serialized) as QuestionState[];

    if (questions.length == 0) {
      console.warn("No saved questions in local storage.");
      return false;
    }

    console.log("Setting state");
    console.log(questions);

    setQuestionStates(questions);
    return true;
  };

  const generateQuestions = async () => {
    console.log("Generating questions...");

    if (OFFLINE_MODE) {
      const newQuestionStates = [
        new QuestionState(
          new Question("Dummy question description", Difficulties.EASY),
          questionStates.length + 1
        ),
      ];

      setQuestionStates((prevStates) => {
        if (!prevStates) {
          return newQuestionStates;
        }
        return [...prevStates, ...newQuestionStates];
      });
      return;
    }

    setQuestionsLoading(true);

    try {
      if (!editor) {
        throw new Error("Editor ref is undefined.");
      }
      const program = editor.getValue();

      const response = await axios.post(`${API_BASE_URL}/ai/questions`, {
        // FIXME: align camelCase
        program_id: programId, // May be empty if using custom code.
        program,
        student_id: studentId,
      });
      console.log(response);

      const result = response.data.result;

      // Reassigns if already existing.
      setProgramId(response.data.program_id);

      const newQuestionStates =
        // Parse each question in result to a QuestionState.
        result.map(
          (
            question: { description: string; difficulty: string },
            index: number
          ) => {
            const difficulty = parse(question.difficulty);

            if (!difficulty) {
              throw new Error(
                `Difficulty ${difficulty} is an invalid Difficulty type.`
              );
            }

            return new QuestionState(
              new Question(question.description, difficulty),
              questionStates.length + index + 1 // Question number is based on amount of existing questions
            );
          }
        );

      // Append new questions onto old ones
      setQuestionStates((prevStates) => {
        if (!prevStates) {
          return newQuestionStates;
        }
        return [...prevStates, ...newQuestionStates];
      });
    } catch (error) {
      console.error(error);
    } finally {
      setQuestionsLoading(false);
    }
  };

  const saveQuestions = () => {
    console.log("Saving questions to local storage...");
    if (!questionStates) {
      console.error(`Questions are undefined: ${questionStates}`);
      return;
    }
    const serialized = JSON.stringify(questionStates);

    localStorage.setItem(LocalStorageKeys.QuestionStates, serialized);
  };

  const clearQuestions = () => {
    localStorage.removeItem(LocalStorageKeys.QuestionStates);
    setQuestionStates([]);
  };

  const [isSubmitting, setSubmitting] = useState(false);

  //submitting the answer
  const submitAnswer = async (
    question: string,
    answer: string,
    difficulty: string
  ) => {
    try {
      if (!editor) {
        throw new Error("Editor ref is undefined.");
      }

      const currentQuestion = getCurrentQuestion();
      if (!currentQuestion) {
        throw new Error("Question is undefined.");
      }
      console.log("Submitting answer...");
      console.log("\nquestion: " + question);
      console.log("\nanswer: " + answer);

      setSubmitting(true);

      const response = await axios.post(`${API_BASE_URL}/ai/submitAnswer`, {
        // FIXME: align camelCase
        student_id: studentId,
        program_id: programId,
        program,
        question,
        answer,
        difficulty,
      });
      const result = response.data.result;

      currentQuestion.questionId = response.data.question_id;
      currentQuestion.answer = answer;
      triggerQuestionUpdatedFlag();

      //Storing the feedback in session storage
      sessionStorage.setItem(question + "feedback", result);
    } catch (error) {
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  // TODO: remove temp chat functionality for testing

  const [messages, setMessages] = useState<Message[]>([]);

  const addMessage = (message: Message) => {
    // Remember: need to have prevMessages to ensure each call appends rather than overrides.
    setMessages((prevMessages) => [...prevMessages, message]);
  };

  const clearMessages = () => {
    setMessages([]);
  };

  const loadMessages = async () => {
    try {
      clearMessages();

      const currentQuestion = getCurrentQuestion();
      if (!currentQuestion) {
        throw new Error("No question selected.");
      }

      console.log("LOAD MESSAGES:");
      console.log(currentQuestion);

      setMessagesLoading(true);

      const response = await axios.post(`${API_BASE_URL}/ai/getFeedback`, {
        question_id: currentQuestion.questionId,
      });

      // Add question and answer as messages
      addMessage(new Message("ChatGPT", currentQuestion.question.description));
      addMessage(new Message("User", currentQuestion.answer, true));

      const mappedArray = response.data.result;

      for (let i = 0; i < mappedArray.length; i++) {
        if (i % 2 === 0) {
          addMessage(new Message("ChatGPT", mappedArray[i]));
        } else {
          addMessage(new Message("User", mappedArray[i], true));
        }
      }
    } catch (error) {
      console.error(error);
    } finally {
      setMessagesLoading(false);
    }
  };

  const [messagesLoading, setMessagesLoading] = useState(false);

  const [responseLoading, setResponseLoading] = useState(false);

  const sendChatPrompt = async (message: Message): Promise<string> => {
    try {
      const currentQuestion = getCurrentQuestion();
      if (!currentQuestion) {
        throw new Error("No question selected.");
      }
      const new_prompt = message.content;
      addMessage(message);

      setResponseLoading(true);

      const response = await axios.post(`${API_BASE_URL}/ai/feedbackChat`, {
        question_id: currentQuestion.questionId,
        new_prompt,
      });

      const result = response.data.result;
      console.log("Chat response: ");
      console.log(response.data);

      addMessage(new Message("ChatGPT", result));
      setResponseLoading(false);

      return result;
    } catch (error) {
      console.log(error);
      throw error;
    } finally {
      setResponseLoading(false);
    }
  };

  // Highlighted lines
  const [highlightedLines, setHighlightedLines] = useState<string[]>([]);
  const [explanation, setExplanation] = useState<string>();
  const [explanationLoading, setExplanationLoading] = useState(false);

  //Generate explanation
  const generateExplanation = async () => {
    setExplanationLoading(true);

    try {
      if (!editor) {
        throw new Error("Editor ref is undefined.");
      }
      const program = editor.getValue();

      const response = await axios.post(`${API_BASE_URL}/ai/explanation`, {
        program,
        highlightedLines,
      });
      console.log(response);

      const result = response.data.result;
      console.log(result);

      setExplanation(result);
    } catch (error) {
      console.error(error);
    } finally {
      setExplanationLoading(false);
    }
  };

  const [isFeedbackOpen, setFeedbackOpen] = useState(false);

  const resetWorkspace = () => {
    setInputStudentId(false);
    setProgramGenState(ProgramGenState.UNSELECTED);

    setPrompt(DEFAULT_prompt);
    setProgram(DEFAULT_program);
    clearQuestions();

    setHighlightedLines([]);
    setExplanation("");

    clearMessages();

    // TODO: add additional states that need to be reset.

    setLanguage(DEFAULT_language);
  };

  const context = {
    studentId,
    setStudentId,
    hasInputStudentId,
    setInputStudentId,
    prompt,
    setPrompt,
    language,
    setLanguage,
    program,
    programId,
    programLoading,
    generateProgram,
    editor,
    setEditor,
    isEditorDisabled,
    setEditorDisabled,
    isEditorReadOnly,
    setEditorReadOnly,
    programGenState,
    setProgramGenState,
    isTutorialOpen,
    setTutorialOpen,
    questionUpdatedFlag,
    currentQuestionNumber,
    setCurrentQuestion,
    getCurrentQuestion,
    resetCurrentQuestion,
    questionStates,
    loadQuestions,
    generateQuestions,
    saveQuestions,
    clearQuestions,
    questionsLoading,
    isSubmitting,
    submitAnswer,
    messages,
    addMessage,
    clearMessages,
    loadMessages,
    messagesLoading,
    sendChatPrompt,
    responseLoading,
    highlightedLines,
    setHighlightedLines,
    explanation,
    setExplanation,
    generateExplanation,
    explanationLoading,
    setExplanationLoading,
    isFeedbackOpen,
    setFeedbackOpen,
    resetWorkspace,
  } as WorkspaceContextType;

  return (
    <WorkspaceContext.Provider value={context}>
      {children}
    </WorkspaceContext.Provider>
  );
}

export { WorkspaceContext, WorkspaceContextProvider };
