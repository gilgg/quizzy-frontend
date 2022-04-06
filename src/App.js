import "./App.scss";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Switch, Route, Redirect } from "react-router-dom";
import useFetch from "./hooks/useFetch";
import { stars } from "./helpers";
import Modal from "./components/Modal/Modal";
import Title from "./components/General/Title";
import WelcomePage from "./pages/WelcomePage";
import QuizPage from "./pages/QuizPage";
import ScoreboardPage from "./pages/ScoreboardPage";

const App = () => {
  const questions = useSelector((state) => state.questions);
  const showModal = useSelector((state) => state.showModal);
  const [startAgain, setStartAgain] = useState(true);
  useFetch(startAgain, setStartAgain);

  return (
    <>
      {showModal && <Modal setStartAgain={setStartAgain} />}
      <div className="app">
        {stars()}
        <Title />
        <Switch>
          <Route path="/" exact>
            <WelcomePage />
          </Route>
          <Route path="/quiz" exact>
            {questions.length > 0 && <QuizPage />}
          </Route>
          <Route path="/scores" exact>
            <ScoreboardPage setStartAgain={setStartAgain} />
          </Route>
          <Route path="*">
            <Redirect to="/" />
          </Route>
        </Switch>
      </div>
    </>
  );
};

export default App;
