const NextRoundBtn = ({ initializeBottles }) => {
  return (
    <div className="replay-btn-wrapper">
      <button onClick={initializeBottles} className="replay-btn">
        Next Round
      </button>
    </div>
  );
};

export default NextRoundBtn;
