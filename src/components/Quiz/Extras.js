import "./Extras.scss";
import { useSelector, useDispatch } from "react-redux";
import { getUsersFromAPI } from "../../helpers";

const Extras = ({ currentQuestion, setIs5050 }) => {
  const dispatch = useDispatch();
  const username = useSelector((state) => state.username);
  const score = useSelector((state) => state.score);
  const numberOfCorrectAnswers = useSelector(
    (state) => state.numberOfCorrectAnswers
  );
  const haveUsed5050 = useSelector((state) => state.haveUsed5050);
  const haveUsedTimeAdding = useSelector((state) => state.haveUsedTimeAdding);

  const on5050Handler = (e) => {
    e.preventDefault();

    // if the user haven't yet used 50-50 option ,but now wants to use it - we mark it as used
    if (!haveUsed5050) {
      setIs5050(true);
      dispatch({ type: "USE_5050" });
    }
  };

  const onTimeAddingHandler = (e) => {
    e.preventDefault();

    // if the user haven't yet used the time adding option, but now wants to use it - we mark it as used
    if (!haveUsedTimeAdding) {
      dispatch({ type: "USE_EXTRA_10_SECONDS" });
    }
  };

  const onFinishGameHandler = async (e) => {
    e.preventDefault();

    const newUser = {
      name: username,
      score,
      numberOfCorrectAnswers,
      avgAnswerTime: "00:0000",
    };

    // we save the user's stats in the database
    getUsersFromAPI(dispatch, newUser, false);
  };

  return (
    <div className="extras">
      {/* in case there are only 2 answers then don't show 50-50 */}
      {currentQuestion.shuffeledAnswers.length > 2 && (
        <button
          className={`btn-50-50 ${haveUsed5050 ? "inactive" : ""}`}
          onClick={on5050Handler}
        >
          <div className="correct-50">50</div>
          <div className="incorrect-50">50</div>
        </button>
      )}
      <button
        className={`extras-seconds ${haveUsedTimeAdding ? "inactive" : ""}`}
        onClick={onTimeAddingHandler}
      >
        Gimme extra 10 seconds!
      </button>
      <button className="extras-finish" onClick={onFinishGameHandler}>
        Finish game
      </button>
    </div>
  );
};

export default Extras;
