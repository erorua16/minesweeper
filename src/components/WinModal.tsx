import React from "react";
import ReactConfetti from "react-confetti";
import Modal from 'react-modal';

interface WinModalType {
    gameState: boolean;
}
const WinModal :React.FC<WinModalType> = ({gameState}:WinModalType) => {

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
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={changeStateModal}>Open Modal</button>
        <Modal
        isOpen={modalState}
        onRequestClose={changeStateModal}
        contentLabel="Example Modal"
        style={modalStyle}
        >
            <button onClick={changeStateModal}><i className="fa-solid fa-x"></i></button>
            <h1 className=" p-4 rounded text-center font-bold text-2xl">You Win!</h1>
            <ReactConfetti width={window.innerWidth} height={window.innerHeight} />
        </Modal>
    </div>
    </>
}

export default WinModal