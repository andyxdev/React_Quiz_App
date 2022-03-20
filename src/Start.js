import React from "react";
import "./App.css";

function Start(props) {
  return (
    <div className="start">
      <h1 className="title">Quizzical</h1>
      <p className="description"> Testing your Knowledge </p>

      <button className="btn-start" onClick={props.startQuiz}>
        {" "}
        Start quiz{" "}
      </button>
    </div>
  );
}

export default Start;
