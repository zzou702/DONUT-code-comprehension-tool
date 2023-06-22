import React, { ReactElement, useState } from "react";
import Question from "../models/Question";

export interface WorkspaceContextType {
  prompt: string;
  setPrompt: (newPrompt: string) => void;
  questions: Question[];
  currentQuestion: Question;
  generateQuestions: () => void;
}

const WorkspaceContext = React.createContext<WorkspaceContextType>(
  {} as WorkspaceContextType
);

type Props = {
  children: ReactElement | ReactElement[];
};

function WorkspaceContextProvider({ children }: Props) {
  const [prompt, setPromptState] = useState<string>(
    "Generate a program that calculates the determinant of a square matrix."
  );

  const [questions, setQuestions] = useState<Question[]>();
  const [currentQuestion, setQuestion] = useState<Question>();

  const setPrompt = (newPrompt: string) => {
    setPromptState(newPrompt);
  };

  const generateQuestions = () => {
    setQuestions([
      new Question("What does the await keyword do?"),
      new Question("What are the path parameters passed to the API call?"),
    ]);
  };

  const context = {
    prompt,
    setPrompt,
    questions,
    currentQuestion,
    generateQuestions,
  } as WorkspaceContextType;

  return (
    <WorkspaceContext.Provider value={context}>
      {children}
    </WorkspaceContext.Provider>
  );
}

export { WorkspaceContext, WorkspaceContextProvider };
