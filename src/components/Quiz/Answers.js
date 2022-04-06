import "./Answers.scss";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAnswersBtns, isQuizCompleted, updateStats } from "../../helpers";

const Answers = ({ is5050, setIs5050 }) => {
  const dispatch = useDispatch();
  const currentQuestion = useSelector((state) => state.currentQuestion);
  const username = useSelector((state) => state.username);
  const score = useSelector((state) => state.score);
  const lives = useSelector((state) => state.lives);
  const numberOfCorrectAnswers = useSelector(
    (state) => state.numberOfCorrectAnswers
  );

  useEffect(() => {
    // when the question changes, we check if it's already answered. if so, the answers will be marked
    setIs5050(false);
  }, [currentQuestion]);

  const onClickHandler = (e) => {
    e.preventDefault();

    if (currentQuestion.hasAnswered) {
      // if the question has already been answered, then a click on an answer will do nothing
      return;
    }

    // if the question was NOT answered (but is now)
    currentQuestion.hasAnswered = true;

    if (e.target.innerText === currentQuestion.correct_answer) {
      // in case the user chose the correct answer
      updateStats(dispatch, "correct");

      // in case the quiz is completed successfully, a new user is created in order to be saved in the db
      isQuizCompleted(
        dispatch,
        username,
        score,
        lives,
        numberOfCorrectAnswers,
        currentQuestion
      );
    } else {
      // in case the user chose an incorrect answer
      updateStats(dispatch, "incorrect");

      // in case the quiz is complete when the last answer is incorrect, a new user is created in order to be saved in the db
      isQuizCompleted(
        dispatch,
        username,
        score,
        lives - 1,
        numberOfCorrectAnswers,
        currentQuestion
      );
    }
  };

  // getting the answers jsx
  const answersBtns = getAnswersBtns(currentQuestion, is5050, onClickHandler);

  return <div className="answers">{answersBtns}</div>;
};

export default Answers;
