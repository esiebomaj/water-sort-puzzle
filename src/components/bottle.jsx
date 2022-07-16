import { BottleConfetti } from "./Confetti";
import proptypes from "proptypes";

const colorMap = {
  a: "blue",
  b: "green",
  c: "yellow",
  d: "red"
};

const Bottle = ({ bottle, raisedBottleId, onRaise }) => {
  return (
    <div
      onClick={() => onRaise(bottle.id)}
      style={{
        transform: bottle.id === raisedBottleId ? "translate(0px, -30px)" : "translate(0px, 0px)"
      }}
      className={bottle.complete ? "bottle-body complete" : "bottle-body"}>
      {bottle.complete && <BottleConfetti />}
      <div className="bottle">
        <div className="bottle-content">
          {bottle.bottle_array.map((col, idx) => (
            <div
              key={idx}
              className="water"
              style={{
                background: colorMap[col]
              }}></div>
          ))}
        </div>
      </div>
    </div>
  );
};

Bottle.propTypes = {
  bottle: proptypes.any.isRequired,
  raisedBottleId: proptypes.string.isRequired,
  onRaise: proptypes.func.isRequired
};

export default Bottle;
