import React, { createContext, useReducer } from "react";
import { Difficulty } from "../types/difficulty";
import { InitialStateType } from "../types/leaderBoard";




const initialState = {
  user:{name:'',date:new Date(),finalTime:{seconds:0,minutes:0},
  level:Difficulty.easy},
  user_level: { easy: [], normal: [], medium: [], hard: [] },
};
const appProvider = createContext<{
  state: InitialStateType;
  dispatch: React.Dispatch<any>;
}>({
  state: initialState,
  dispatch: () => null,
});
const { Provider } = appProvider;
const StateProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer((curState: any, action: any) => {
    switch (action.type) {
      case "SET_USER": {
        const newState = {
          ...curState,
          user: action.payload,
        };
        return newState;
      }
      case "SET_USER_LEVEL": {
        const newState = {
          ...curState,
          user_level: action.payload,
        };
        return newState;
      }
      default:
        throw new Error();
    }
  }, initialState);
  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};
export { appProvider, StateProvider };
