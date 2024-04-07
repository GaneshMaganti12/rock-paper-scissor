import { useState } from "react";
import "./App.css";
import rock from "../src/assets/rock.png";
import paper from "../src/assets/paper.png";
import scissor from "../src/assets/scissor.png";

function App() {
  const [gameItems, setGameItems] = useState([
    { id: 1, name: "rock", imageUrl: rock },
    { id: 2, name: "paper", imageUrl: paper },
    { id: 3, name: "scissor", imageUrl: scissor },
  ]);
  const [isShow, setIsShow] = useState(false);
  const [output, setOuptput] = useState("");
  const [gameScore, setGameScore] = useState(0);
  const [isWin, setIsWin] = useState(false);
  const [selectedItem, setSelectedItem] = useState("");
  const [randomItem, setRandomItem] = useState("");

  const clickItem = (item) => {
    const randomOne =
      gameItems[Math.floor(Math.random() * gameItems.length)].name;

    setSelectedItem(
      gameItems.reduce((res, ele) => {
        if (ele.name === item) {
          res = ele.imageUrl;
        }
        return res;
      }, "")
    );
    setRandomItem(
      gameItems.reduce((res, ele) => {
        if (ele.name === randomOne) {
          res = ele.imageUrl;
        }
        return res;
      }, "")
    );

    let result = "";
    let score = 0;

    switch (randomOne) {
      case "rock":
        switch (item) {
          case "rock":
            result = "It's Draw";
            score = gameScore;
            break;
          case "paper":
            result = "You Win";
            score = gameScore + 1;
            break;
          case "scissor":
            result = "You Lose";
            score = gameScore;
            break;
        }
        break;
      case "paper":
        switch (item) {
          case "rock":
            result = "You Lose";
            score = gameScore;
            break;
          case "paper":
            result = "It's Draw";
            score = gameScore;
            break;
          case "scissor":
            result = "You Win";
            score = gameScore + 1;
            break;
        }
        break;
      case "scissor":
        switch (item) {
          case "rock":
            result = "You Win";
            score = gameScore + 1;
            break;
          case "paper":
            result = "You Lose";
            score = gameScore;
            break;
          case "scissor":
            result = "It's Draw";
            score = gameScore;
            break;
        }
        break;
    }

    if (result !== "You Lose") {
      setIsWin(true);
    }

    setGameScore(score);
    setIsShow(true);
    setOuptput(result);
  };

  const playAgain = () => {
    setIsShow(false);
    setGameScore(gameScore);
    setOuptput("");
    setIsWin(false);
  };

  const resetPlay = () => {
    setIsShow(false);
    setGameScore(0);
    setOuptput("");
  };

  return (
    <div className="app-container">
      <div className="top-header">
        <h1>Rock Paper Scissor</h1>
        <span> Your Score: {gameScore}</span>
      </div>
      <div className="bottom-container">
        <div className="game-container">
          {!output ? (
            <ul className="game-card">
              {gameItems.map((item) => (
                <li
                  className="image-list"
                  key={item.id}
                  onClick={() => clickItem(item.name)}
                >
                  <img alt={item.name} className="image" src={item.imageUrl} />
                </li>
              ))}
            </ul>
          ) : (
            <div className="result-container">
              <div className="result-card">
                <div className="image-card">
                  <img className="result-image" src={selectedItem} />
                  <h1>You</h1>
                </div>
                <div className="image-card">
                  <img className="result-image rotate" src={randomItem} />
                  <h1>Opponent</h1>
                </div>
              </div>
              <div className="result-output-card">
                <h1 className="result">{output}</h1>
                {!isWin && isShow && (
                  <button className="result-button" onClick={resetPlay}>
                    Reset
                  </button>
                )}
                {isWin && isShow && (
                  <button className="result-button" onClick={playAgain}>
                    Play Again
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
