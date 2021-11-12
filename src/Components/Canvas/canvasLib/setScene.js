import { Color, Scene } from "three";

import prepareSeats from "../planeLib/prepareSeats";

import myCam from "./camera";
import gltfLoader from "./gltfLoader";
import createLights from "./lights";
import createR from "./renderer";
import setOrbitControls from "./setOrbitControls";

const setScene = () => {
  //instancedMeshes of seat parts
  let instancedMeshes;
  //renderer
  const renderer = createR();
  //camera, inital position is (50/2)*25, maze's inital size is 50
  const camera = myCam(1250);
  //scene
  const scene = new Scene();
  scene.background = new Color("#748B97");
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

  const onSeatGLTFReady = () => {
    instancedMeshes = prepareSeats();
    // console.log(instancedMeshes);
    scene.add(...Object.values(instancedMeshes));
    //init
    render();
  };
  //seats
  gltfLoader(onSeatGLTFReady);

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
  };
};

export default setScene;
