import React from "react";
import ReactConfetti from "react-confetti";
import Modal from 'react-modal';
import { GameState } from "../types/gameState";

interface GameEndModalType {
    gameState: GameState;
}
const GameEndModal :React.FC<GameEndModalType> = ({gameState}:GameEndModalType) => {

    const [modalState, setState] = React.useState<boolean>(true);

    const modalStyle ={
        overlay: {
            backgroundColor: 'rgba(23, 43, 77, 0.75)'
        },
        content: {
            backgroundColor: '#fefefe',
            color: '#333',
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            overflow: 'hidden',
            width: '60%',
            height: '60%',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            padding: '1rem'
        }
      }
    const changeStateModal = () => {
        setState(false);
    }

    return <>
    <div>
        <Modal
        isOpen={modalState}
        onRequestClose={changeStateModal}
        contentLabel="Example Modal"
        style={modalStyle}
        >
            <button onClick={changeStateModal}><i className="fa-solid fa-x"></i></button>
            { gameState === GameState.win ? 
            <>
            <h1 className=" p-4 rounded text-center font-bold text-2xl">You Win!</h1>
            <ReactConfetti width={window.innerWidth} height={window.innerHeight} />
            </> : <>
            <h1 className=" p-4 rounded text-center font-bold text-2xl">You Lose...</h1>
            </>}
        </Modal>
    </div>
    </>
}

export default GameEndModal