import { Color, MeshBasicMaterial } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { setSeatParts } from "../../../CONFIG/config";

const gltfLoader = onLoad => {
  let seatParts = [];

  const addModel = gltf => {
    const model = gltf.scene;
    let b = 0;
    const baseHandler = part => {
      b++;
      part.name = b;
      seatParts.push(part);
    };

    const seatHandler = (part, name) => {
      part.name = name;
      if (["head"].includes(part.name))
        part.material = new MeshBasicMaterial({ color: "whitesmoke" });
      seatParts.push(part);
    };
    model.traverse(m => {
      if (
        m.isMesh &&
        !["Sagak_low_chair_0", "Packet_low_chair_0"].includes(m.name)
      ) {
        switch (m.name) {
          case "Sari_low_chair_0": //headrest
            seatHandler(m, "head");

            break;
          case "Poshti_low_chair_0": //backrest
            seatHandler(m, "back");

            break;
          case "Ziri_low_chair_0": //seat
            seatHandler(m, "seat");

            break;
          case "Belt_low_chair_0": //belt
            seatHandler(m, "belt");
            break;
          default:
            baseHandler(m);
            break;
        }
      }
    });
    //loaded
    setSeatParts(seatParts);
    onLoad();
  };

  new GLTFLoader().load("seat/scene.gltf", gltf => addModel(gltf));
};
export default gltfLoader;
