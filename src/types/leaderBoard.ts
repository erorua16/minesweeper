import { Difficulty } from "./difficulty";

export interface userType {
  name: string;
  date: Date;
  finalTime: finalTimeType;
  level: Difficulty;
}
export type finalTimeType = {
  seconds: number;
  minutes: number;
};
export type userLevelType = {
  easy: userType[];
  normal: userType[];
  medium: userType[];
  hard: userType[];
};
export type InitialStateType = {
    user:userType
    user_level:userLevelType
  };