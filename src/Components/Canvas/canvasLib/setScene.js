import { Color, CubeTextureLoader, Scene } from "three";
import { changed, OCCUPIED, setChanged } from "../../../CONFIG/config";
import prepareExits from "../planeLib/prepareExits";

import prepareSeats from "../planeLib/prepareSeats";
import prepareWalls from "../planeLib/prepareWalls";
import prepareWings from "../planeLib/prepareWings";
import occupateSeats from "../planeLib/seatOccupation";
import createArray from "../mathLib/shuffle";

import myCam, { updateCamPos } from "./camera";
import gltfLoader from "./gltfLoader";
import createLights from "./lights";
import createR from "./renderer";
import setOrbitControls from "./setOrbitControls";
import wingGltfLoader from "./wingGltfLoader";
import checkIntersectingSeat from "../mathLib/seatPicker";

const setScene = () => {
  //instancedMeshes of seat parts
  let instancedMeshes, walls, exits, wings, seats, hoveredSeat;
  //renderer
  const renderer = createR();
  //camera, inital position is (50/2)*25, maze's inital size is 50
  const camera = myCam(1250);
  //scene
  const scene = new Scene();
  // scene.background = new Color("black");

  scene.background = new CubeTextureLoader().load([
    "skybox/right3.png",
    "skybox/left3.png",

    "skybox/top3.png",
    "skybox/bottom3.png",

    "skybox/front3.png",
    "skybox/back3.png",
  ]);
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

  let numOFLoadedGltfs = 0,
    numberOfOccupiedSeats;

  const arrangeSeats = () => {
    seats = createArray();
    numberOfOccupiedSeats = Math.floor((seats.length * OCCUPIED) / 100);
    occupateSeats(instancedMeshes, seats, numberOfOccupiedSeats);
    render();
  };

  const onGLTFReady = () => {
    numOFLoadedGltfs++;
    if (numOFLoadedGltfs < 2) return;
    instancedMeshes = prepareSeats();
    walls = prepareWalls();
    exits = prepareExits();
    wings = prepareWings();
    scene.add(...Object.values(instancedMeshes), ...walls, exits, wings);
    arrangeSeats();
  };
  //seats
  gltfLoader(onGLTFReady);
  wingGltfLoader(onGLTFReady);

  //recreatePlane
  const recreateAirplane = type => {
    if (!changed) return;
    setChanged(false);
    if (type === "occupied seats") {
      arrangeSeats();
      return;
    }
    scene.remove(...Object.values(instancedMeshes), ...walls, exits, wings);
    updateCamPos();
    onGLTFReady();
  };
  //onResize
  const onResize = () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    requestRenderIfNotRequested();
  };
  let mouse = { x: 0, y: 0 };
  const white = new Color("white"),
    green = new Color("#9df781");

  const changeColor = color => {
    [instancedMeshes.head, instancedMeshes.seat, instancedMeshes.back].forEach(
      m => {
        m.setColorAt(hoveredSeat, color);
        m.instanceColor.needsUpdate = true;
      }
    );
  };
  function onMouseMove(event) {
    event.preventDefault();
    if (!instancedMeshes) return;
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    let newSelect = checkIntersectingSeat(mouse, camera, instancedMeshes);
    if (seats.slice(0, numberOfOccupiedSeats).includes(newSelect))
      newSelect = null;
    if (newSelect !== hoveredSeat) {
      if (hoveredSeat !== null) changeColor(white);
      hoveredSeat = newSelect;
      if (hoveredSeat !== null) changeColor(green);
      requestRenderIfNotRequested();
    }
  }
  domElement.addEventListener("mousemove", onMouseMove);

  return {
    domElement,
    onResize,
    recreateAirplane,
  };
};

export default setScene;
