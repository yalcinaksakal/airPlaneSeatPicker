import { useSelector } from "react-redux";
import { NUM_SEATS_IN_A_ROW } from "../../CONFIG/config";
import styles from "./HoveredSeat.module.scss";

const HoveredSeat = () => {
  const { hovered, hx, hy } = useSelector(state => state.seat);
  const row = Math.floor(hovered / NUM_SEATS_IN_A_ROW) + 1;
  const column = ["A", "B", "C", "D", "E", "F", "G", "H"][
    hovered % NUM_SEATS_IN_A_ROW
  ];
  const style = { top: `${hy - 120}px`, left: `${hx - 60}px` };
  return (
    <div className={styles.seat} style={style}>
      {hovered === null ? "" : row + column}
    </div>
  );
};
export default HoveredSeat;
