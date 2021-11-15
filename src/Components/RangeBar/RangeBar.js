import { useEffect, useState } from "react";
import {
  sceneController,
  setChanged,
  setOccupied,
  setRows,
  setSeats,
} from "../../CONFIG/config";

import styles from "./RangeBar.module.scss";

const RangeBar = ({ type }) => {
  const [val, setVal] = useState(
    type === "seats in a row" ? 3 : type === "rows" ? 27 : 40
  );

  useEffect(() => {
    const inputTimer = setTimeout(() => {
      sceneController(type);
    }, 500);
    return () => clearTimeout(inputTimer);
  }, [val, type]);

  const changeParameter = newVal => {
    setChanged(true);
    switch (type) {
      case "seats in a row":
        setSeats(newVal * 2);
        //init plane
        break;
      case "rows":
        setRows(newVal);
        //init plane
        break;
      default:
        setOccupied(newVal);
        //change occupied seats
        break;
    }
  };
  return (
    <div className={styles.c}>
      <input
        type={"range"}
        min={type === "occupied seats" ? 0 : type === "rows" ? 4 : 1}
        max={type === "seats in a row" ? 4 : 100}
        value={val}
        onChange={e => {
          if (!sceneController) return;
          const newVal = e.currentTarget.value;
          setVal(newVal);
          changeParameter(newVal);
        }}
      />
      <p>
        {type +
          " : " +
          (type === "seats in a row" ? 2 : 1) * val +
          (type === "occupied seats" ? "%" : "")}
      </p>
    </div>
  );
};
export default RangeBar;
