import React, { useState } from "react";
import { nanoid } from "nanoid";
import "./App.css";

function Questions(props) {
  const options = [...props.incorrect, props.correct];

  const answers = options.map((ans) => (
    <button
      className="ans-btn"
      style={{
        backgroundColor: ans.selected ? "#59E391" : "white",
      }}
      onClick={() => props.selectAnswer(ans.id)}
    >
      {ans.answer}
    </button>
  ));
  return (
    <div>
      <p>{props.question}</p>
      <div className="ans-container">{answers}</div>
    </div>
  );
}

export default Questions;
