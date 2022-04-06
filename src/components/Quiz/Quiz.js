import "./Quiz.scss";
import { useState } from "react";
import { useSelector } from "react-redux";
import MoveQuestion from "./MoveQuestion";
import Answers from "./Answers";
import OtherInfo from "./OtherInfo";
import Extras from "./Extras";

const Quiz = () => {
  const questions = useSelector((state) => state.questions);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [is5050, setIs5050] = useState(false);
  const currentQuestion = questions[questionIndex];

  return (
    <div className="quiz">
      <MoveQuestion
        questionIndex={questionIndex}
        setQuestionIndex={setQuestionIndex}
        currentQuestion={currentQuestion}
      />
      <h3 className="quiz-question">{currentQuestion.question}</h3>
      {questions.length > 0 && (
        <Answers is5050={is5050} setIs5050={setIs5050} />
      )}
      <div>
        <OtherInfo />
        <Extras currentQuestion={currentQuestion} setIs5050={setIs5050} />
      </div>
    </div>
  );
};

export default Quiz;
