import React, { ReactElement, useState } from "react";
import QuestionState from "../models/QuestionState";
import type monaco from "monaco-editor";
import axios from "axios";
import Question from "../models/Question";
import { parse } from "../models/Difficulty";
import InputOptionState from "../models/InputOptionState";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
export interface WorkspaceContextType {
  prompt: string;
  setPrompt: (newPrompt: string) => void;

  language: string;
  setLanguage: (language: string) => void;

  program: string;
  programLoading: boolean;
  generateProgram: () => Promise<void>;

  editor: monaco.editor.IStandaloneCodeEditor | undefined;
  setEditor: (editor: monaco.editor.IStandaloneCodeEditor) => void;
  isEditorDisabled: boolean;
  setEditorDisabled: (isDisabled: boolean) => void;
  inputOptionState: InputOptionState;
  setInputOptionState: (state: InputOptionState) => void;

  hasClosedTutorial: boolean;
  closeTutorial: () => void;

  setCurrentQuestion: (number: number) => void;
  currentQuestion: QuestionState;

  questionStates: QuestionState[];
  loadQuestions: () => boolean;
  generateQuestions: () => Promise<void>;
  saveQuestions: () => void;
  clearQuestions: () => void;
  questionsLoading: boolean;

  submitAnswer: (answer: string) => void;

  // TODO: remove temp chat functionality for testing
  chatPrompt: string;
  chatResponse: string;
  sendChatPrompt: (prompt: string) => Promise<string>;
  responseLoading: boolean;

  // Explanation context
  highlightedLines: string[];
  setHighlightedLines: (lines: string[]) => void;
  explanation: string;
  setExplanation: (explanation: string) => void;
  generateExplanation: () => Promise<void>;
  explanationLoading: boolean;
  setExplanationLoading: (loading: boolean) => void;
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
  const [prompt, setPromptState] = useState<string>("");

  const setPrompt = (newPrompt: string) => {
    setPromptState(newPrompt);
  };

  const [language, setLanguage] = useState<string>("javascript");

  const [program, setProgram] = useState<string>();
  const [programLoading, setProgramLoading] = useState(false);

  const generateProgram = async () => {
    console.log(`Generating program with prompt: "${prompt}".`);
    setProgramLoading(true);

    try {
      const response = await axios.post(`${API_BASE_URL}/ai/program`, {
        prompt,
      });
      console.log(response);

      const result = response.data.result;

      setProgram(result.program);
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

  const [inputOptionState, setInputOptionState] = useState<InputOptionState>(
    InputOptionState.UNSELECTED
  );

  const [hasClosedTutorial, setClosedTutorial] = useState(false);

  const closeTutorial = () => {
    // No need to reclose if already closed.
    if (hasClosedTutorial) {
      return;
    }
    setClosedTutorial(true);
  };

  const [currentQuestion, setCurrentQuestionState] = useState<QuestionState>();
  const [questionStates, setQuestionStates] = useState<QuestionState[]>();
  const [questionsLoading, setQuestionsLoading] = useState(false);

  const setCurrentQuestion = (number: number) => {
    const questionState = questionStates?.find(
      (questionState) => questionState.number == number
    );

    if (!questionState) {
      return;
    }
    setCurrentQuestionState(questionState);
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
    setQuestionsLoading(true);

    try {
      if (!editor) {
        throw new Error("Editor ref is undefined.");
      }
      const program = editor.getValue();

      const response = await axios.post(`${API_BASE_URL}/ai/questions`, {
        program,
      });
      console.log(response);

      const result = response.data.result;
      console.log(result);

      setQuestionStates(
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
              index + 1
            );
          }
        )
      );
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

  // TODO: remove temp chat functionality for testing

  const [chatPrompt, setChatPrompt] = useState<string>();
  const [chatResponse, setChatResponse] = useState<string>();
  const [responseLoading, setResponseLoading] = useState(false);

  const sendChatPrompt = async (prompt: string): Promise<string> => {
    setChatPrompt(prompt);
    setResponseLoading(true);

    try {
      const response = await axios.post(`${API_BASE_URL}/ai/chat/message`, {
        message: prompt,
      });

      // Response structure: https://platform.openai.com/docs/api-reference/making-requests
      const result = response.data.result.choices[0].message.content;
      setChatResponse(result);
      setResponseLoading(false);

      return result;
    } catch (error) {
      setResponseLoading(false);
      throw error;
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

  const context = {
    prompt,
    setPrompt,

    language,
    setLanguage,

    program,
    programLoading,
    generateProgram,

    editor,
    setEditor,
    isEditorDisabled,
    setEditorDisabled,
    inputOptionState,
    setInputOptionState,

    hasClosedTutorial,
    closeTutorial,

    setCurrentQuestion,
    currentQuestion,

    questionStates,
    loadQuestions,
    generateQuestions,
    saveQuestions,
    clearQuestions,
    questionsLoading,

    highlightedLines,
    setHighlightedLines,
    explanation,
    setExplanation,
    generateExplanation,
    explanationLoading,

    chatPrompt,
    chatResponse,
    sendChatPrompt,
    responseLoading,
  } as WorkspaceContextType;

  return (
    <WorkspaceContext.Provider value={context}>
      {children}
    </WorkspaceContext.Provider>
  );
}

export { WorkspaceContext, WorkspaceContextProvider };
