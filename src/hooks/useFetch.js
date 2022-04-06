import { useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { getCorrectStr, getShuffeledAnswers } from "../helpers";

const useFetch = (startAgain, setStartAgain) => {
  const dispatch = useDispatch();
  useEffect(() => {
    const getQuestionsFromApi = async () => {
      const questionsFromApi = (
        await axios.get("https://opentdb.com/api.php?amount=100")
      ).data.results;

      const questions = questionsFromApi
        .map((q, index) => {
          return {
            correct_answer: q.correct_answer,
            incorrect_answers: q.incorrect_answers,
            question: getCorrectStr(q.question),
            shuffeledAnswers: getShuffeledAnswers(q),
            hasAnswered: false,
            question_number: index + 1,
          };
        })
        .slice(0, 3);
      console.log(questions);

      dispatch({ type: "INIT", questions });
    };

    // if there's a new game then new questions are fetched from the API
    if (startAgain) {
      getQuestionsFromApi();
      setStartAgain(false);
    }
  }, [startAgain]);
};

export default useFetch;
