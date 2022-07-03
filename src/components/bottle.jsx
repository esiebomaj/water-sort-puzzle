import { BottleConfetti } from "./Confetti";

const colorMap = {
  a: "blue",
  b: "green",
  c: "yellow",
  d: "red",
};

const Bottle = ({ bottle, raisedBottleId, onRaise }) => {
  return (
    <div
      onClick={() => onRaise(bottle.id)}
      style={{
        transform:
          bottle.id === raisedBottleId
            ? "translate(0px, -30px)"
            : "translate(0px, 0px)",
      }}
      className={bottle.complete ? "bottle-body complete" : "bottle-body"}
    >
      {bottle.complete && <BottleConfetti />}
      <div className="bottle">
        <div className="bottle-content">
          {bottle.bottle_array.map((col) => (
            <div
              className="water"
              style={{
                background: colorMap[col],
              }}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Bottle;
