export default class Difficulty {
  private _name: string;
  private _color: string;

  constructor(name: string, color: string) {
    this._name = name;
    this._color = color;
  }

  get name() {
    return this._name;
  }

  get color() {
    return this._color;
  }
}

export const Difficulties = {
  EASY: new Difficulty("EASY", "#aaf"),
  MEDIUM: new Difficulty("MEDIUM", "#faf"),
  HARD: new Difficulty("HARD", "#faa"),
};

export function parse(name: string): Difficulty | undefined {
  const enumValue = Object.values(Difficulties).find(
    (difficulty: Difficulty) => difficulty.name === name
  );
  return enumValue;
}
