import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { setWing } from "../../../CONFIG/config";

const wingGltfLoader = onLoad => {
  new GLTFLoader().load("wing/scene.gltf", gltf => {
    gltf.scene.traverse(g => {
      if (g.isMesh) {
        g.rotation.set(0, 0, 0);
        setWing(g);
      }
    });
    onLoad();
  });
};

export default wingGltfLoader;
