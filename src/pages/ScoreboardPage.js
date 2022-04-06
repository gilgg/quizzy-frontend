import "./ScoreboardPage.scss";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import Table from "../components/ScoreBoard/Table";
import { useSelector } from "react-redux";

const ScoreboardPage = ({ setStartAgain }) => {
  const history = useHistory();
  const users = useSelector(state => state.users);
  const [activeRow, setActiveRow] = useState(0);

  // start the game again
  const onStartGameHandler = (e) => {
    e.preventDefault();
    setStartAgain(true);
    history.replace("/");
  };

  return (
    <div className="scoreboard-page">
      {users && <Table users={users} activeRow={activeRow} setActiveRow={setActiveRow} />}
      <button
        className="scoreboard-btn-start-game"
        onClick={onStartGameHandler}
      >
        Start Again
      </button>
    </div>
  );
};

export default ScoreboardPage;
