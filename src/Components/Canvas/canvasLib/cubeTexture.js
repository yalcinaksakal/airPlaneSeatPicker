import { CubeTextureLoader } from "three";

const cubeTexture = () => {
  const loader = new CubeTextureLoader().load([
    "skybox/Spacebox5/right.png",
    "skybox/Spacebox5/left.png",

    "skybox/Spacebox5/top.png",
    "skybox/Spacebox5/bottom.png",

    "skybox/Spacebox5/front.png",
    "skybox/Spacebox5/back.png",
  ]);

  return loader;
};

export default cubeTexture;
