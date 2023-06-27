import Question from "./Question";

export default class QuestionState {
  private _question: Question;
  private _number: number;

  isCorrect: boolean;
  completionStatus: CompletionStatus;
  currentAnswer: string;
  finalAnswer: string;
  feedback: string;

  constructor(question: Question, number: number) {
    this._question = question;
    this._number = number;

    this.isCorrect = false;
    this.completionStatus = CompletionStatus.COMPLETED;
    this.currentAnswer = "";
    this.finalAnswer = "";
    this.feedback = "";
  }

  get question() {
    return this._question;
  }

  get number() {
    return this._number;
  }
}

export enum CompletionStatus {
  COMPLETED,
  ATTEMPTED,
  NOT_ATTEMPTED,
}
