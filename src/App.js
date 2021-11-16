import Canvas from "./Components/Canvas/Canvas";
import RangeBar from "./Components/RangeBar/RangeBar";
import styles from "./App.module.scss";
import Paragraph from "./Components/Paragraph/Paragraph";
import HoveredSeat from "./Components/HoveredSeat/HoveredSeat";
import { useState } from "react";
import Spinner2 from "./Components/Spinner/Spinner2";
function App() {
  const [isLoading, setIsLoading] = useState(true);
  return (
    <>
      <div className={styles.controls}>
        <RangeBar type="rows" />
        <RangeBar type="seats in a row" />
        <RangeBar type="occupied seats" />
      </div>
      {isLoading && <Spinner2 />}
      <Canvas onLoad={setIsLoading} />
      <Paragraph />
      <HoveredSeat />
    </>
  );
}

export default App;
