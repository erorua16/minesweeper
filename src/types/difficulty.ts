export enum Difficulty {
  easy = "easy",
  normal = "normal",
  medium = "medium",
  hard = "hard",
}
export type DifficultyContextType = {
  difficulty: Difficulty;
  setDifficulty: React.Dispatch<React.SetStateAction<Difficulty>>;
};
