import "./OtherInfo.scss";
import { useSelector } from "react-redux";
import Timer from "./Timer";

const OtherInfo = () => {
  const username = useSelector((state) => state.username);
  const score = useSelector((state) => state.score);
  const lives = useSelector((state) => state.lives);

  return (
    <div className="other-info">
      <h1 className="other-info-username">{username}</h1>
      <h1 className="other-info-lives">Lives Left: {lives}</h1>
      <h1 className="other-info-score">Score: {score}</h1>
      <Timer />
    </div>
  );
};

export default OtherInfo;
