import { Color, CubeTextureLoader, Scene } from "three";
import { changed, setChanged } from "../../../CONFIG/config";
import prepareExits from "../planeLib/prepareExits";

import prepareSeats from "../planeLib/prepareSeats";
import prepareWalls from "../planeLib/prepareWalls";
import prepareWings from "../planeLib/prepareWings";

import myCam from "./camera";
import gltfLoader from "./gltfLoader";
import createLights from "./lights";
import createR from "./renderer";
import setOrbitControls from "./setOrbitControls";
import wingGltfLoader from "./wingGltfLoader";

const setScene = () => {
  //instancedMeshes of seat parts
  let instancedMeshes, walls, exits, wings;
  //renderer
  const renderer = createR();
  //camera, inital position is (50/2)*25, maze's inital size is 50
  const camera = myCam(1250);
  //scene
  const scene = new Scene();
  scene.background = new Color("black");

  // scene.background = new CubeTextureLoader().load([
  //   "skybox/right.png",
  //   "skybox/left.png",

  //   "skybox/top.png",
  //   "skybox/bottom.png",

  //   "skybox/front.png",
  //   "skybox/back.png",
  // ]);
  //lights
  const lights = createLights();
  Object.values(lights).forEach(light => scene.add(light));

  //domEL
  const { domElement } = renderer;

  //add controls
  const controls = setOrbitControls(camera, domElement);

  //render--------------------
  let renderRequested = false;

  const render = () => {
    if (renderRequested) renderRequested = undefined;
    controls.update();
    renderer.render(scene, camera);
  };

  // request animation when user interacts, orbitcontrols change
  function requestRenderIfNotRequested() {
    // animate on changes in orbits
    if (!renderRequested) {
      renderRequested = true;
      requestAnimationFrame(render);
    }
  }
  controls.addEventListener("change", requestRenderIfNotRequested);

  let numOFLoadedGltfs = 0;
  const onGLTFReady = () => {
    numOFLoadedGltfs++;
    if (numOFLoadedGltfs < 2) return;
    instancedMeshes = prepareSeats();
    walls = prepareWalls();
    exits = prepareExits();
    wings = prepareWings();
    scene.add(...Object.values(instancedMeshes), ...walls, exits, wings);

    // addWings(scene);
    //init
    render();
  };
  //seats
  gltfLoader(onGLTFReady);
  wingGltfLoader(onGLTFReady);

  //recreatePlane
  const recreateAirplane = () => {
    if (!changed) return;
    setChanged(false);
    console.log("change");
  };
  //onResize
  const onResize = () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    requestRenderIfNotRequested();
  };

  return {
    domElement,
    onResize,
    recreateAirplane,
  };
};

export default setScene;
