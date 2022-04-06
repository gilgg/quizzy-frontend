import "./Modal.scss";
import { useCallback, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import ReactCanvasConfetti from "react-canvas-confetti";

const canvasStyles = {
  position: "fixed",
  pointerEvents: "none",
  width: "100%",
  height: "100%",
  top: 0,
  left: 0,
};

const Modal = ({ setStartAgain }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const gameOver = useSelector((state) => state.gameOver);
  const isQuizCompleted = useSelector((state) => state.isQuizCompleted);
  const modalMsg = isQuizCompleted ? "You did it!" : "GAME OVER";
  const modalMsgClass = isQuizCompleted ? "success" : "fail";

  // whenever the game ends we have to return to the welcome page
  if (gameOver) {
    history.replace("/");
  }

  const onGoToScoreboardHandler = (e) => {
    e.preventDefault();
    dispatch({ type: "SHOW_MODAL", showOrNot: false }); // remove the modal when viewing the scoreboard
    history.replace("/scores");
  };

  const onStartAgainHandler = (e) => {
    e.preventDefault();
    setStartAgain(true);
    dispatch({ type: "SHOW_MODAL", showOrNot: false }); // remove the modal on the welcome page
  };

  const refAnimationInstance = useRef(null);

  const getInstance = useCallback((instance) => {
    refAnimationInstance.current = instance;
  }, []);

  const makeShot = useCallback((particleRatio, opts) => {
    refAnimationInstance.current &&
      refAnimationInstance.current({
        ...opts,
        origin: { y: 0.7 },
        particleCount: Math.floor(200 * particleRatio),
      });
  }, []);

  const fire = useCallback(() => {
    makeShot(0.25, {
      spread: 26,
      startVelocity: 55,
    });

    makeShot(0.2, {
      spread: 60,
    });

    makeShot(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8,
    });

    makeShot(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2,
    });

    makeShot(0.1, {
      spread: 120,
      startVelocity: 45,
    });
  }, [makeShot]);

  return (
    <div className="modal-wrapper">
      <div className="modal">
        <h1 className={`modal-title ${modalMsgClass}`}>{modalMsg}</h1>
        {isQuizCompleted && fire()}
        <ReactCanvasConfetti refConfetti={getInstance} style={canvasStyles} />
        <button
          className="modal-btn-scoreboard"
          onClick={onGoToScoreboardHandler}
        >
          Go to Scoreboard
        </button>
        <button className="modal-btn-start-again" onClick={onStartAgainHandler}>
          Start Again
        </button>
      </div>
    </div>
  );
};

export default Modal;
