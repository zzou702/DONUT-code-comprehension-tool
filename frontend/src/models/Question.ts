export default class Question {
  private _description: string;
  isCompleted: boolean;

  constructor(description: string) {
    this._description = description;
    this.isCompleted = false;
  }

  get description() {
    return this._description;
  }
}
