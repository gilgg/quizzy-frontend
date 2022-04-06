import "./MoveQuestion.scss";
import { useDispatch, useSelector } from "react-redux";

const MoveQuestion = ({ questionIndex, setQuestionIndex }) => {
  const dispatch = useDispatch();
  const currentQuestion = useSelector((state) => state.currentQuestion);

  // in case the question is the last one, then the next button shouldn't appear
  const showNextBtn = questionIndex < 15 && currentQuestion.hasAnswered;

  const onClickHandler = (e) => {
    e.preventDefault();
    // in case the user clicked on the next button
    if (e.target.className.includes("next")) {
      // in case the question is the last one or it is not answered yet, a click on the next button does nothing
      if (questionIndex === 15 || !currentQuestion.hasAnswered) {
        return;
      }

      // the next button appears, and the next question will show
      setQuestionIndex(questionIndex + 1);
      dispatch({ type: "CHANGE_CURRENT_QUESTION", index: questionIndex + 1 });
    } else {
      // in case the user clicked on the previous button
      // in case this is the first question, a click on the previous button does nothing
      if (questionIndex === 0) {
        return;
      }

      // the previous button appears, and the previous question will show
      setQuestionIndex(questionIndex - 1);
      dispatch({ type: "CHANGE_CURRENT_QUESTION", index: questionIndex - 1 });
    }
  };

  return (
    <div className="move-question">
      <button
        className={`move-question-previous ${
          questionIndex === 0 ? "inactive" : ""
        }`}
        onClick={onClickHandler}
      >
        Previous
      </button>
      <button
        className={`move-question-next ${!showNextBtn ? "inactive" : ""}`}
        onClick={onClickHandler}
      >
        Next
      </button>
    </div>
  );
};

export default MoveQuestion;
