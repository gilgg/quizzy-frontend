import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { isQuizCompleted, updateStats } from "../../helpers";

const Timer = () => {
  const dispatch = useDispatch();
  const username = useSelector((state) => state.username);
  const score = useSelector((state) => state.score);
  const lives = useSelector((state) => state.lives);
  const haveUsedTimeAdding = useSelector((state) => state.haveUsedTimeAdding);
  const currentQuestion = useSelector((state) => state.currentQuestion);
  const numberOfCorrectAnswers = useSelector(
    (state) => state.numberOfCorrectAnswers
  );
  const [secondsLeft, setSecondsLeft] = useState(30);
  const [timerOn, setTimerOn] = useState(false);
  let interval = null;

  // the timer still works when it reached 0, and now it stops
  if (secondsLeft === 0 && timerOn) {
    setTimerOn(false);
    clearInterval(interval);
    updateStats(dispatch, "incorrect");

    // in case the quiz is complete, a new user is created in order to be saved in the db
    isQuizCompleted(
      dispatch,
      username,
      score,
      lives - 1,
      numberOfCorrectAnswers,
      currentQuestion
    );
  }

  // new question appears
  useEffect(() => {
    setTimerOn(true); // turn the timer when the user is in new question

    if (currentQuestion.hasAnswered) {
      // stop the timer when the question was answered
      setTimerOn(false);
      clearInterval(interval);
    } else {
      // intialize the timer when the user is in new question
      setSecondsLeft(30);
    }
  }, [currentQuestion]);

  // starting & stopping the timer
  useEffect(() => {
    if (timerOn) {
      // the timer is initialized
      interval = setInterval(() => {
        setSecondsLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else {
      // the timer is stopped
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [timerOn]);

  // if the user clicked on the 10 seconds adder then 10 seconds are added
  useEffect(() => {
    if (haveUsedTimeAdding) {
      clearInterval(interval);
      setSecondsLeft((prevTime) => prevTime + 10);
    }
  }, [haveUsedTimeAdding]);

  return (
    <h1 className="timer">
      Time Left: 00:{secondsLeft >= 10 ? secondsLeft : "0" + secondsLeft}
    </h1>
  );
};

export default Timer;
