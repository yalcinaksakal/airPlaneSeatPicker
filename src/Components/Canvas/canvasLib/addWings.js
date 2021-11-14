import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const addWings = scene => {
  new GLTFLoader().load("wing/scene.gltf", gltf => {
    gltf = gltf.scene;
    gltf.name = "wing";
    scene.add(gltf);
  });
};

export default addWings;
