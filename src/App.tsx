import { Canvas } from "@react-three/fiber";
import Scene from "./Scene";
import { VRButton, XR, Controllers, Hands } from "@react-three/xr";

function App() {
  return (
    <>
      <div id="canvas-container">
        <VRButton />
        <Canvas
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "black",
          }}
        >
          <XR>
            <Controllers />
            <Hands />
            <Scene />
          </XR>
        </Canvas>
      </div>
    </>
  );
}

export default App;
