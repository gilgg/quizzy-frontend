import axios from "axios";

const stars = () => {
  let starsArr = [];
  const count = 200;
  let i = 0;

  while (i < count) {
    const x = Math.floor(Math.random() * window.innerWidth);
    const y = Math.floor(Math.random() * window.innerHeight);

    const duration = Math.random() * 2;
    const size = Math.random() * 4;
    const left = x + "px";
    const top = y + "px";
    const width = 1 + size + "px";
    const height = 1 + size + "px";
    const star = (
      <i
        key={i}
        className="star"
        style={{
          left,
          top,
          width,
          height,
          animationDuration: 4 + duration + "s",
          animationDelay: duration + "s",
        }}
      ></i>
    );

    i++;
    starsArr.push(star);
  }
  return starsArr;
};

const getShuffeledAnswers = (currentQuestion) => {
  const correct = {
    type: "correct",
    content: getCorrectStr(currentQuestion.correct_answer),
  };

  const incorrectAnswersUpdated = currentQuestion.incorrect_answers.map(
    (ans) => {
      return {
        type: "incorrect",
        content: getCorrectStr(ans),
      };
    }
  );

  const arrRaw = [correct, ...incorrectAnswersUpdated];
  const shuffeledAnswersArr = orderArrRandomly(arrRaw);

  return shuffeledAnswersArr;
};

const orderArrRandomly = (arr) => {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }

  return arr;
};

const getCorrectStr = (str) => {
  return str
    .replaceAll("&quot;", "'")
    .replaceAll("&#039;", "'")
    .replaceAll("&rsquo;", "'")
    .replaceAll("&ldquo;", "'")
    .replaceAll("&amp;", "&")
    .replaceAll("&Uuml;", "Ü")
    .replaceAll("&eacute;", "é");
};

const getAnswersBtns = (currentQuestion, is5050, onClickHandler) => {
  const twoAnswers =
    currentQuestion.shuffeledAnswers.length === 2 ? true : false;

  // in case there are only 2 answers we dont want to be able to use the 50-50 button
  let randIncorrectAns1 = getRandomNumber();
  while (
    !twoAnswers &&
    currentQuestion.shuffeledAnswers[randIncorrectAns1].type === "correct"
  ) {
    randIncorrectAns1 = getRandomNumber();
  }

  let randIncorrectAns2 = getRandomNumber();
  while (
    !twoAnswers &&
    (currentQuestion.shuffeledAnswers[randIncorrectAns2].type === "correct" ||
      randIncorrectAns1 === randIncorrectAns2)
  ) {
    randIncorrectAns2 = getRandomNumber();
  }

  const btns = currentQuestion.shuffeledAnswers.map((ans, index) => {
    return (
      <button
        key={index}
        className={`answers-btn ${ans.type} ${
          currentQuestion.hasAnswered ||
          (!twoAnswers &&
            is5050 &&
            (index === randIncorrectAns1 || index === randIncorrectAns2))
            ? "active"
            : ""
        }`}
        onClick={onClickHandler}
      >
        {ans.content}
      </button>
    );
  });
  return btns;
};

const getRandomNumber = () => {
  return Math.floor(Math.random() * 4);
};

const getUsersFromAPI = async (dispatch, newUser, isQuizCompleted) => {
  dispatch({ type: "SHOW_MODAL", showOrNot: true });

  const users = (
    await axios.post(`${process.env.REACT_APP_API_URL}/users/new`, newUser)
  ).data;

  dispatch({ type: "END_GAME", users, isQuizCompleted });
};

const isQuizCompleted = (
  dispatch,
  username,
  score,
  lives,
  numberOfCorrectAnswers,
  currentQuestion
) => {
  const NUM_OF_QUESTIONS = 15;

  // in case the quiz is complete, a new user is created in order to be saved in the db
  const newUser = {
    name: username,
    score,
    numberOfCorrectAnswers,
    avgAnswerTime: "00:0000",
  };

  if (NUM_OF_QUESTIONS === currentQuestion.question_number) {
    // quiz is completed
    if (lives > 0) {
      // completed successfully
      getUsersFromAPI(dispatch, newUser, true);
    } else {
      // completed unsuccessfully
      getUsersFromAPI(dispatch, newUser, false);
    }
  } else {
    // quiz is NOT completed
    if (lives === 0) {
      // the user fails before the quiz is comlete
      getUsersFromAPI(dispatch, newUser, false);
    }
  }
};

const updateStats = (dispatch, correctOrIncorrect) => {
  if (correctOrIncorrect === "correct") {
    dispatch({ type: "CHANGE_SCORE", score: 10 });
    dispatch({ type: "MARK_ANSWERED", isCorrect: true });
  } else {
    dispatch({ type: "CHANGE_SCORE", score: -10 });
    dispatch({ type: "CHANGE_LIVES", lives: -1 });
    dispatch({ type: "MARK_ANSWERED", isCorrect: false });
  }
};

export {
  stars,
  orderArrRandomly,
  getShuffeledAnswers,
  getCorrectStr,
  getAnswersBtns,
  getUsersFromAPI,
  isQuizCompleted,
  updateStats,
};
