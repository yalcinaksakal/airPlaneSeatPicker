import { DirectionalLight, AmbientLight, PointLight } from "three";

const createLights = () => {
  //lights
  const light = new DirectionalLight("white", 0.8);
  light.position.set(-500, 500, -500);
  light.target.position.set(0, 0, 0);

  return {
    d: light,
    a: new AmbientLight("white", 0.2),
  };
};

export default createLights;
