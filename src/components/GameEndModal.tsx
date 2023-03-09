import React from "react";
import ReactConfetti from "react-confetti";
import Modal from "react-modal";
import { GameState } from "../types/gameState";

interface GameEndModalType {
  gameState: GameState;
  getUserName:(username: string) => void
}
const GameEndModal: React.FC<GameEndModalType> = ({
  gameState,
  getUserName
}: GameEndModalType) => {
  const [modalState, setState] = React.useState<boolean>(true);
  const [userName, setUserName] = React.useState<String>("");


  const modalStyle = {
    overlay: {
      backgroundColor: "rgba(23, 43, 77, 0.75)",
    },
    content: {
      backgroundColor: "#fefefe",
      color: "#333",
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      overflow: "hidden",
      width: "50%",
      height: "50%",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      padding: "1rem",
    },
  };
  const changeStateModal = () => {
    setState(false);
  };
  const handleSubmit=(e:any)=>{
    e.preventDefault()
    getUserName(userName.toString())
  }
  return (
    <>
      <div>
        <Modal
          isOpen={modalState}
          onRequestClose={changeStateModal}
          contentLabel="Example Modal"
          style={modalStyle}
        >
          <button onClick={changeStateModal}>
            <i className="fa-solid fa-x"></i>
          </button>
          {gameState === GameState.win ? (
            <>
              <h1 className=" p-4 rounded text-center font-bold text-2xl">
                You Win!
              </h1>
              <ReactConfetti
                width={window.innerWidth}
                height={window.innerHeight}
              />
              <div className="grid place-content-center mt-10">
                <form  className="grid place-content-center" onSubmit={(e)=>handleSubmit(e)}>
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Please enter your name if you want to save your score
                </label>
                <input
                  type="text"
                  id="name"
                  className="bg-gray-50 mb-5 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="John Doe"
                  value={userName.toString()}
                  onChange={(e)=>setUserName(e.target.value)}
                  required
                />
                <button
                  type="submit"
                  className="text-white w-max bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                    Save
                </button>
                </form>
              </div>
            </>
          ) : (
            <>
              <h1 className=" p-4 rounded text-center font-bold text-2xl">
                You Lose...
              </h1>
            </>
          )}
        </Modal>
      </div>
    </>
  );
};

export default GameEndModal;
