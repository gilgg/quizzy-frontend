import { createStore } from "redux";

const initState = {
  username: "Anonymous user",
  users: [],
  questions: [],
  currentQuestion: {},
  numberOfQuestionsAnswered: 0,
  numberOfCorrectAnswers: 0,
  score: 0,
  lives: 3,
  haveUsed5050: false,
  haveUsedTimeAdding: false,
  gameOver: false,
  isQuizCompleted: false,
  showModal: false,
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case "INIT":
      return {
        ...initState,
        questions: [...action.questions],
        currentQuestion: action.questions[0],
      };
    case "CHANGE_USERNAME":
      return {
        ...state,
        username: action.username ? action.username : state.username,
      };
    case "CHANGE_CURRENT_QUESTION":
      return {
        ...state,
        currentQuestion: state.questions[action.index],
        numberOfQuestionsAnswered: state.currentQuestion.question_number,
      };
    case "MARK_ANSWERED":
      const isQuizCompleted =
        state.numberOfQuestionsAnswered + 1 === state.questions.length &&
        state.lives > 0;

      return {
        ...state,
        currentQuestion: {
          ...state.currentQuestion,
          hasAnswered: true,
        },
        numberOfQuestionsAnswered: state.numberOfQuestionsAnswered + 1,
        numberOfCorrectAnswers: action.isCorrect
          ? state.numberOfCorrectAnswers + 1
          : state.numberOfCorrectAnswers,
        isQuizCompleted,
      };
    case "CHANGE_SCORE":
      const score =
        state.score + action.score < 0 ? 0 : state.score + action.score;
      return {
        ...state,
        score,
      };
    case "CHANGE_LIVES":
      const lives =
        state.lives + action.lives < 1 ? 0 : state.lives + action.lives;
      return {
        ...state,
        lives,
        gameOver: !lives ? true : false,
        showModal: !lives ? true : false,
      };
    case "USE_5050":
      return {
        ...state,
        haveUsed5050: true,
      };
    case "USE_EXTRA_10_SECONDS":
      return {
        ...state,
        haveUsedTimeAdding: true,
      };
    case "END_GAME":
      return {
        ...state,
        users: [...action.users],
        gameOver: true,
        isQuizCompleted: action.isQuizCompleted,
      };
    case "SHOW_MODAL":
      return {
        ...state,
        showModal: action.showOrNot,
      };
    default:
      return state;
  }
};

const store = createStore(reducer);

export default store;
