import React, { ReactElement, useState } from "react";
import Question from "../models/Question";
import QuestionState from "../models/QuestionState";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
export interface WorkspaceContextType {
  setCurrentQuestion: (number: number) => void;
  currentQuestion: QuestionState;

  questionPrompt: string;
  setQuestionPrompt: (newPrompt: string) => void;
  questionStates: QuestionState[];
  generateQuestions: () => void;

  submitAnswer: (answer: string) => void;

  // TODO: remove temp chat functionality for testing
  chatPrompt: string;
  chatResponse: string;
  sendChatPrompt: (prompt: string) => Promise<string>;
  responseLoading: boolean;
}

const WorkspaceContext = React.createContext<WorkspaceContextType>(
  {} as WorkspaceContextType
);

type Props = {
  children: ReactElement | ReactElement[];
};

function WorkspaceContextProvider({ children }: Props) {
  const [currentQuestion, setCurrentQuestionState] = useState<QuestionState>();
  const [questionStates, setQuestionStates] = useState<QuestionState[]>();

  const [prompt, setPromptState] = useState<string>(
    "Generate a program that calculates the determinant of a square matrix."
  );

  const setCurrentQuestion = (number: number) => {
    const questionState = questionStates?.find(
      (questionState) => questionState.number == number
    );

    if (!questionState) {
      return;
    }
    setCurrentQuestionState(questionState);
  };

  const setPrompt = (newPrompt: string) => {
    setPromptState(newPrompt);
  };

  const generateQuestions = () => {
    const questions = [
      "What does the await keyword do?",
      "What are the path parameters passed to the API call?",
    ];

    setQuestionStates(
      questions.map(
        (question, index) =>
          new QuestionState(new Question(question), index + 1)
      )
    );
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
      throw new Error(`Error when messaging chat API: ${error}`);
    }
  };

  const context = {
    setCurrentQuestion,
    currentQuestion,
    questionPrompt: prompt,
    setQuestionPrompt: setPrompt,
    questionStates,
    generateQuestions,

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
