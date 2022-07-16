import proptypes from "proptypes";

const NextRoundBtn = ({ initializeBottles }) => {
  return (
    <div className="replay-btn-wrapper">
      <button onClick={initializeBottles} className="replay-btn">
        Next Round
      </button>
    </div>
  );
};

NextRoundBtn.propTypes = {
  initializeBottles: proptypes.func.isRequired
};

export default NextRoundBtn;
