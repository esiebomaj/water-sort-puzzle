import "./App.css";
import { useState } from "react";
import useSound from "use-sound";
import PuzzleBottle from "./components/PuzzleBottle";
import celebrateSound from "./sounds/celebrate.mp3";
import pouringSound from "./sounds/pouring.wav";
import popupSound from "./sounds/popDown.mp3";
import popdownSound from "./sounds/popUp.wav";
import fireworksSound from "./sounds/fireworks.mp3";
import Bottle from "./components/bottle";
import NextRoundBtn from "./components/NextRoundBtn";
import { AppWideConfetti } from "./components/Confetti";

function App() {
  const [playCelebrate, { stop: stopCelebrate }] = useSound(celebrateSound, {
    volume: 0.5
  });
  const [playPouring] = useSound(pouringSound, {
    volume: 0.5
  });

  const [playPopup] = useSound(popupSound, {
    volume: 0.5
  });
  const [playPopdown] = useSound(popdownSound, {
    volume: 0.5
  });
  const [playFireworks] = useSound(fireworksSound, {
    volume: 0.05
  });

  const [bottles, setBottles] = useState([
    new PuzzleBottle(["d", "d", "d", "d", "d", "d", "d", "d", "c", "c"]),
    new PuzzleBottle(["b", "b", "b", "b", "b", "b", "b", "b", "d", "d"]),
    new PuzzleBottle(["c", "c", "c", "c", "c", "c", "c", "c", "a", "a"]),
    new PuzzleBottle(["a", "a", "a", "a", "a", "a", "a", "a", "b", "b"]),
    new PuzzleBottle([], false, true)
  ]);
  const [raisedBottleId, setRaisedBottleId] = useState("");
  const [gameComplelte, setGameComplelte] = useState(false);

  const initializeBottles = () => {
    setGameComplelte(false);
    stopCelebrate();
    setBottles([
      new PuzzleBottle(["d", "d", "d", "a", "a", "a", "b", "b", "b", "c"]),
      new PuzzleBottle(["b", "b", "b", "d", "d", "a", "b", "c", "d", "a"]),
      new PuzzleBottle(["c", "c", "c", "c", "a", "b", "a", "b", "d", "d"]),
      new PuzzleBottle(["a", "c", "c", "a", "d", "d", "a", "b", "c", "c"]),
      new PuzzleBottle([], false, true)
    ]);
  };

  const checkWinHelper = () => {
    for (let bottle of bottles) {
      if (!bottle.complete && !bottle.empty) {
        return false;
      }
    }
    return true;
  };

  const checkWin = () => {
    if (checkWinHelper()) {
      for (let bottle of bottles) {
        bottle.complete = false;
      }
      setGameComplelte(true);
      playCelebrate();
    }
  };

  const handleBottleRaise = (bottleId) => {
    if (raisedBottleId && raisedBottleId !== bottleId) {
      const fromBottle = bottles.find((b) => {
        return b.id === raisedBottleId;
      });
      const toBottle = bottles.find((b) => {
        return b.id == bottleId;
      });

      let no_to_pour = 0;

      if (fromBottle.getTopSize() >= toBottle.getEmptyTopSize()) {
        no_to_pour = toBottle.getEmptyTopSize();
      } else {
        no_to_pour = fromBottle.getTopSize();
      }
      const removed = fromBottle.remove_from_top(no_to_pour);
      toBottle.add_to_top(removed);
      setRaisedBottleId("");
      playPouring();
      checkWin();
      if (toBottle.complete) {
        playFireworks();
      }
      return;
    }

    if (raisedBottleId == bottleId) {
      setRaisedBottleId("");
      playPopdown();
      return;
    }

    playPopup();
    setRaisedBottleId(bottleId);
  };

  return (
    <div className="App">
      {gameComplelte && (
        <>
          <AppWideConfetti />
          <NextRoundBtn initializeBottles={initializeBottles} />
        </>
      )}
      <div className="App-body">
        <span>Are you up to the task? 🤷‍♂️</span>
        <br />
        <div className="puzzle-wrapper">
          {bottles.map((bottle) => (
            <Bottle
              key={bottle.id}
              bottle={bottle}
              raisedBottleId={raisedBottleId}
              onRaise={handleBottleRaise}
            />
          ))}
        </div>
        <a>Watter Sort Puzzle 🧩</a>
        <a className="App-link" href="https://github.com/esiebomaj/">
          @Esiebomaj
        </a>
      </div>
    </div>
  );
}

export default App;
