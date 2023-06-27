export default class Question {
  private _description: string;

  constructor(description: string) {
    this._description = description;
  }

  get description() {
    return this._description;
  }
}
