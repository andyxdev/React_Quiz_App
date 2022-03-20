import React from "react";
import Start from "./Start";
import Questions from "./Questions";
import { nanoid } from "nanoid";
import "./App.css";

function App() {
  const [questions, setQuestions] = React.useState([]);
  const [quizStarted, setQuizStarted] = React.useState(false);
  const [allAnswered, setAllAnswered] = React.useState(false);
  const [score, setScore] = React.useState({
    points: 0,
    showResults: false,
  });

  const test = questions.map((ques) => (
    <Questions
      question={ques.question}
      correct={ques.correct}
      incorrect={ques.incorrect}
      //options={[...ques.incorrect_answers, ques.correct_answer]}
      selectAnswer={selectAnswer}
      answered={ques.answered}
      allAnswered={allAnswered}
    />
  ));

  function startQuiz() {
    setQuizStarted(true);
  }

  function reset() {
    setScore((score) => {
      return { ...score, points: 0, showResults: false };
    });
    setAllAnswered(false);
    setQuizStarted(false);
  }

  function selectAnswer(id) {
    setQuestions((oldque) =>
      oldque.map((que) => {
        if (que.incorrect.some((obj) => obj.id === id)) {
          return {
            ...que,
            incorrect: que.incorrect.map((inc) => {
              return inc.id === id ? { ...inc, selected: !inc.selected } : inc;
            }),
            answered: !que.answered,
          };
        } else if (que.correct.id === id) {
          setScore((score) => {
            return { ...score, points: score.points + 1 };
          });
          return {
            ...que,
            correct: { ...que.correct, selected: !que.correct.selected },
            answered: !que.answered,
          };
        } else {
          return que;
        }
      })
    );
  }

  console.log(questions);
  console.log(allAnswered);
  console.log(score.points);

  function checkScore() {
    setScore((score) => {
      return { ...score, showResults: true };
    });
    setAllAnswered(false);
  }

  React.useEffect(() => {
    setAllAnswered(
      (oldanswered) => (oldanswered = questions.every((que) => que.answered))
    );
  }, [questions]);

  React.useEffect(() => {
    async function getQuize() {
      const res = await fetch(
        "https://opentdb.com/api.php?amount=10&category=27&difficulty=easy"
      );
      const data = await res.json();
      const options = data.results.map((opt) => ({
        question: opt.question,
        id: nanoid(),
        incorrect: opt.incorrect_answers.map((inc) => {
          return { answer: inc, id: nanoid(), selected: false };
        }),
        correct: { answer: opt.correct_answer, id: nanoid(), selected: false },
        answered: false,
      }));
      setQuestions(options);
    }
    getQuize();
  }, [quizStarted]);

  return (
    <main>
      <div className="quiz-container">
        {!quizStarted && <Start startQuiz={startQuiz} />}
        {quizStarted && test}
        {quizStarted && allAnswered && (
          <button className="check-btn" onClick={checkScore}>
            Check answers
          </button>
        )}
        {score.showResults && quizStarted && (
          <div className="results">
            <h2 className="results-text">
              {" "}
              You scored {score.points} / {questions.length} correct answers
            </h2>
            <button className="play-btn" onClick={reset}>
              Play Again
            </button>
          </div>
        )}
      </div>
    </main>
  );
}

export default App;
