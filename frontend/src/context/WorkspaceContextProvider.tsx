import React, { ReactElement, useState } from "react";
import Question from "../models/Question";
import QuestionState from "../models/QuestionState";

export interface WorkspaceContextType {
  setCurrentQuestion: (number: number) => void;
  currentQuestion: QuestionState;

  prompt: string;
  setPrompt: (newPrompt: string) => void;
  questionStates: QuestionState[];
  generateQuestions: () => void;

  submitAnswer: (answer: string) => void;
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

  const context = {
    setCurrentQuestion,
    currentQuestion,
    prompt,
    setPrompt,
    questionStates,
    generateQuestions,
  } as WorkspaceContextType;

  return (
    <WorkspaceContext.Provider value={context}>
      {children}
    </WorkspaceContext.Provider>
  );
}

export { WorkspaceContext, WorkspaceContextProvider };
