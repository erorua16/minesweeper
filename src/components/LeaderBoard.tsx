import React from "react";
import moment from "moment";

import { Difficulty } from "../types/difficulty";

interface Props {
  finalTime: {
    seconds: number;
    minutes: number;
  };
  defaultDifficulty?: string;
}

const LeaderBoard = ({ finalTime, defaultDifficulty }: Props) => {
  const [level, setLevel] = React.useState<Difficulty>();
  const [playerList, setPlayerList] = React.useState([]);
  console.log(playerList, "PlayerListparsed");

  
  const handleLevelChange = (event: any) => {
    const value = event.target.value;
    switch (value) {
      case Difficulty.easy:
        
        setLevel(Difficulty.easy);
        if (localStorage.getItem("minesweeper-easy")) {
          //localStorage.setItem("minesweeper-easy", JSON.stringify([enock]));
          const players: any = localStorage.getItem("minesweeper-easy");
          const playersParsed = JSON.parse(players);

          //localStorage.settem("minesweeper-easy", JSON.stringify([enock]));
          setPlayerList(playersParsed);
          // setPlayerListParsed(JSON.parse(playerList))
        }

        console.log("easy");
        break;
      case Difficulty.normal:
        setLevel(Difficulty.normal);
        let loc: any = localStorage.getItem("name");
        let locPars = JSON.parse(loc)? JSON.parse(loc):[];

        locPars.push(enock);
        console.log(locPars);
        console.log("normal");
        break;
      case Difficulty.medium:
        setLevel(Difficulty.medium);
        setPlayerList([]);

        console.log("medium");
        break;
      case Difficulty.hard:
        setLevel(Difficulty.hard);
        setPlayerList([]);

        console.log("hard");
        break;
      default:
        setLevel(Difficulty.default);
    }
  };

  const enock = {
    name: "papa",
    date: new Date(),
    finalTime: finalTime,
    level: "easy",
  };

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
                      playerList.map((player: any, id) => (
                        <tr key={id}>
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
