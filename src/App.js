import Canvas from "./Components/Canvas/Canvas";
import RangeBar from "./Components/RangeBar/RangeBar";
import styles from "./App.module.scss";
import Paragraph from "./Components/Paragraph/Paragraph";
import HoveredSeat from "./Components/HoveredSeat/HoveredSeat";
function App() {
  return (
    <>
      <div className={styles.controls}>
        <RangeBar type="rows" />
        <RangeBar type="seats in a row" />
        <RangeBar type="occupied seats" />
      </div>
      <Canvas />
      <Paragraph />
      <HoveredSeat />
    </>
  );
}

export default App;
