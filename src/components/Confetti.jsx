import useWindowSize from "react-use/lib/useWindowSize";
import Confetti from "react-confetti";

export const AppWideConfetti = () => {
  const { width: windowWidth, height: windowHeight } = useWindowSize();

  return (
    <Confetti
      width={windowWidth}
      height={windowHeight}
      run={true}
      recycle={true}
      numberOfPieces={1000}
      wind={0.03}
      tweenDuration={10000}
      initialVelocityX={8}
      initialVelocityY={8}
      gravity={0.2}
    />
  );
};

export const BottleConfetti = () => {
  return (
    <Confetti
      width={150}
      height={250}
      run={true}
      recycle={false}
      numberOfPieces={1000}
      wind={0.03}
    />
  );
};
