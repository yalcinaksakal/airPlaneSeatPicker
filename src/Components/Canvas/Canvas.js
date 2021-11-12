import { useEffect, useRef } from "react";
import setScene from "./canvasLib/setScene";

const Canvas = () => {
  const canvasRef = useRef();

  useEffect(() => {
    // console.log("canvas");

    const { domElement, onResize } = setScene();

    canvasRef.current.appendChild(domElement);
    //resize
    window.addEventListener("resize", onResize);

    //cleanup
    return () => {
      window.removeEventListener("resize", onResize);
      domElement.remove();
    };
  }, []);

  return (
    <div
      ref={canvasRef}
      style={{
        width: "100%",
        height: "100%",
      }}
    ></div>
  );
};

export default Canvas;
