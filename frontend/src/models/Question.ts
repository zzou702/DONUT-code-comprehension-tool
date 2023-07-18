import Difficulty from "./Difficulty";

export default class Question {
  private _description: string;
  private _difficulty: Difficulty;

  constructor(description: string, difficulty: Difficulty) {
    this._description = description;
    this._difficulty = difficulty;
  }

  get description() {
    return this._description;
  }

  get difficulty() {
    return this._difficulty;
  }
}
