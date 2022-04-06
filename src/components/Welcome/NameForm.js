import "./NameForm.scss";
import { useRef } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

const NameForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const usernameRef = useRef();

  const onSubmitHandler = () => {
    const username = usernameRef.current.value;
    dispatch({ type: "CHANGE_USERNAME", username });
    history.replace("/quiz");
  };

  return (
    <form className="name-form" onSubmit={onSubmitHandler}>
      <input
        className="name-form-input"
        type="text"
        placeholder="What's your name?"
        ref={usernameRef}
      />
      <button className="name-form-btn">I'm ready to rumble!</button>
    </form>
  );
};

export default NameForm;
