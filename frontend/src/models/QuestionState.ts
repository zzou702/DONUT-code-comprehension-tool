import Question from "./Question";

export default class QuestionState {
  private _question: Question;
  private _number: number;

  questionId: string;
  isCorrect: boolean;
  completionStatus: CompletionStatus;
  answer: string;
  feedback: string;

  constructor(question: Question, number: number) {
    this._question = question;
    this._number = number;

    this.questionId = "";
    this.isCorrect = false;
    this.completionStatus = CompletionStatus.NOT_ATTEMPTED;
    this.answer = "";
    this.feedback = "";
  }

  reset() {
    // TODO: cannot move the above initialisation into here only.
    this.isCorrect = false;
    this.completionStatus = CompletionStatus.NOT_ATTEMPTED;
    this.answer = "";
    this.feedback = "";
  }

  get question() {
    return this._question;
  }

  get number() {
    return this._number;
  }

  attempted() {
    // Check needed as users will frequently select between questions.
    if (this.completionStatus === CompletionStatus.NOT_ATTEMPTED) {
      this.completionStatus = CompletionStatus.ATTEMPTED;
    }
  }

  completed() {
    // No checks needed as conditions for completing a question act as checks.
    this.completionStatus = CompletionStatus.COMPLETED;
  }
}

export enum CompletionStatus {
  COMPLETED,
  ATTEMPTED,
  NOT_ATTEMPTED,
}
