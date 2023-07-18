enum Difficulty {
  EASY = "EASY",
  MEDIUM = "MEDIUM",
  HARD = "HARD",
}

export default Difficulty;

export function parse(difficulty: string): Difficulty | undefined {
  const enumValue = Object.values(Difficulty).find(
    (enumItem: Difficulty) => enumItem === difficulty
  );
  return enumValue;
}
