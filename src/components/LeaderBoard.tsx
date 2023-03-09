import React from "react";
import moment from "moment";
import { GameState } from "../types/gameState";
import { Difficulty } from "../types/difficulty";
import { appProvider } from "../reducer/AppProvider";
import Utils from "../service/Utils";
import { finalTimeType } from "../types/leaderBoard";

interface Props {
  finalTime: finalTimeType,
  gameState: GameState;
  userName: string;
  defaultDifficulty: Difficulty;
}
interface userType {
  name: string;
  date: Date;
  finalTime: finalTimeType;
  level: Difficulty;
}

const LeaderBoard = ({
  finalTime,
  defaultDifficulty,
  userName,
  gameState,
}: Props) => {
  const { dispatch, state } = React.useContext(appProvider);
  const [level, setLevel] = React.useState<Difficulty>();
  const [playerList, setPlayerList] = React.useState([]);
  Utils.GetUsersInLocalStorage();
  const playingUSer: userType = {
    name: userName,
    date: new Date(),
    finalTime: finalTime,
    level: defaultDifficulty,
  };
 const arr = [
    { minutes: 2, seconds: 30 },
    { minutes: 1, seconds: 45 },
    { minutes: 3, seconds: 10 }
  ];
  const sortBySecondsAndMinutes=(arr:string[])=>{
    arr.sort((a:any, b:any) => {
      if (a.minutes === b.minutes) {
        return a.seconds - b.seconds;
      }
      return a.minutes - b.minutes;
    });
  }
  

  const handleLevelChange = (event: any) => {
    const value = event.target.value;
    switch (value) {
      case Difficulty.easy:
        const easy: any = state.user_level.easy;
        setPlayerList(easy);
        break;
      case Difficulty.normal:
        const normal: any = state.user_level.normal;
        setPlayerList(normal);
        break;
      case Difficulty.medium:
        const medium: any = state.user_level.medium;
        setPlayerList(medium);
        break;
      case Difficulty.hard:
        const hard: any = state.user_level.hard;
        setPlayerList(hard);
        break;
      default:
        setLevel(Difficulty.default);
    }
  };

  const setItemAndDispatch = (parsedUserWithLevel: string[]) => {
    dispatch({ type: "SET_USER_LEVEL", payload: parsedUserWithLevel });
    localStorage.setItem("minesweeper", JSON.stringify(parsedUserWithLevel));
  };

  const addUserInLocalStorage = () => {
    let userWithLevel: any = localStorage.getItem("minesweeper");
    let parsedUserWithLevel = JSON.parse(userWithLevel)
      ? JSON.parse(userWithLevel)
      : null;
    if (parsedUserWithLevel) {
      console.log(parsedUserWithLevel.easy.length, "parsedUserWithLevel");
      let level = state.user.level;
      switch (level) {
        case Difficulty.easy:
          console.log(state.user_level.easy.length, "parsedUserWithLevel easy");
          if (playingUSer.name.length > 0) {
            parsedUserWithLevel.easy.push(playingUSer);
            setItemAndDispatch(parsedUserWithLevel);
          }
          break;
        case Difficulty.normal:
          if (playingUSer.name.length > 0) {
            parsedUserWithLevel.normal.push(playingUSer);
            setItemAndDispatch(parsedUserWithLevel);
          }
          break;
        case Difficulty.medium:
          if (playingUSer.name.length > 0) {
            parsedUserWithLevel.medium.push(playingUSer);
            setItemAndDispatch(parsedUserWithLevel);
          }
          break;
        case Difficulty.hard:
          if (playingUSer.name.length > 0) {
            parsedUserWithLevel.hard.push(playingUSer);
            setItemAndDispatch(parsedUserWithLevel);
          }
          break;
        default:
      }
    }
  };
  React.useEffect(() => {
    if (gameState === GameState.win) {
      dispatch({ type: "SET_USER", payload: playingUSer });
    }
  }, [gameState]);
  React.useEffect(() => {
    dispatch({ type: "SET_USER", payload: playingUSer });
    addUserInLocalStorage();
  }, [userName]);

  return (
    <>
      <div>
        <button className="h-10 px-5 m-2 text-indigo-100 transition-colors duration-150 bg-indigo-700 rounded-lg focus:shadow-outline hover:bg-indigo-800">
          LeaderBoard
        </button>
      </div>
      <div className="flex flex-col">
        <h1 className="text-2xl font-semibold	">
          Select the level of Leader board
        </h1>
        <div>
          <select
            value={level}
            defaultValue={defaultDifficulty}
            onChange={handleLevelChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 my-5"
          >
            <option value={Difficulty.default}></option>
            <option value={Difficulty.easy}>Easy (9x9, 10 bombs)</option>
            <option value={Difficulty.normal}>Normal (16x16, 40 bombs)</option>
            <option value={Difficulty.medium}>Medium (22x22, 100 bombs)</option>
            <option value={Difficulty.hard}>Hard (30x30, 250 bombs)</option>
          </select>
        </div>
      </div>
      <section className="antialiased text-gray-600  px-4">
        <div className="flex flex-col justify-center h-full">
          <div className="w-full max-w-2xl mx-auto bg-white shadow-lg rounded-sm border border-gray-200">
            <header className="px-5 py-4 border-b border-gray-100">
              <h2 className="font-semibold text-gray-800">Leader Board</h2>
            </header>
            <div className="p-3">
              <div className="overflow-x-auto">
                <table className="table-auto w-full">
                  <thead className="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
                    <tr>
                      <th className="p-2 whitespace-nowrap">
                        <div className="font-semibold text-left">Name</div>
                      </th>
                      <th className="p-2 whitespace-nowrap">
                        <div className="font-semibold text-left">Level</div>
                      </th>
                      <th className="p-2 whitespace-nowrap">
                        <div className="font-semibold text-left">Time</div>
                      </th>
                      <th className="p-2 whitespace-nowrap">
                        <div className="font-semibold text-center">Date</div>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="text-sm divide-y divide-gray-100">
                    {playerList &&
                      playerList.map((player: any, i: any) => (
                        <tr key={i}>
                          <td className="p-2 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="font-medium text-gray-800">
                                {player.name}
                              </div>
                            </div>
                          </td>
                          <td className="p-2 whitespace-nowrap">
                            <div className="text-left">{player.level}</div>
                          </td>
                          <td className="p-2 whitespace-nowrap">
                            <div className="text-left font-medium text-green-500">
                              {`${
                                player.finalTime.minutes +
                                "Min  " +
                                player.finalTime.seconds +
                                "Sec"
                              } `}
                            </div>
                          </td>
                          <td className="p-2 whitespace-nowrap">
                            <div className="text-center font-medium ">
                              {moment(player.date).format("DD/MM/YYYY")}
                            </div>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default LeaderBoard;
