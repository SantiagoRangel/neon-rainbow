import { useFrame } from "@react-three/fiber";
import { useControls } from "leva";
import { BackSide, ShaderMaterial } from "three";
import vertexShader from "./vertex.ts";
import fragmentShader from "./fragment.ts";
export default function Screen() {
  const {
    uvOffseta,
    uvOffsetb,
    iterations,
    fractMul,
    fractRes,
    ia,
    ib,
    a,
    b,
    c,
    da,
    f,
  } = useControls({
    uvOffseta: {
      value: 0.5,
      min: -5,
      max: 5,
      step: 0.1,
    },
    uvOffsetb: {
      value: 2,
      min: -5,
      max: 5,
      step: 0.1,
    },
    iterations: {
      value: 3,
      min: 1,
      max: 10,
      step: 1,
    },
    fractMul: {
      value: 1.5,
      min: -10,
      max: 10,
      step: 0.1,
    },
    fractRes: {
      value: 0.5,
      min: -10,
      max: 10,
      step: 0.1,
    },
    ia: {
      value: 0.4,
      min: -5,
      max: 5,
      step: 0.1,
    },
    ib: {
      value: 0.4,
      min: -5,
      max: 5,
      step: 0.1,
    },
    a: {
      value: 8.0,
      min: -100,
      max: 100,
      step: 1.0,
    },
    b: {
      value: 8.0,
      min: -100,
      max: 100,
      step: 1.0,
    },
    c: {
      value: 1.0,
      min: -10,
      max: 10,
      step: 0.1,
    },
    da: {
      value: 0.01,
      min: 0,
      max: 1,
      step: 0.001,
    },
    f: {
      value: 1.2,
      min: -10,
      max: 10,
      step: 0.1,
    },
  });

  const shaderMaterial = new ShaderMaterial({
    uniforms: {
      iTime: { value: 1.0 },
      uvOffseta: { value: uvOffseta },
      uvOffsetb: { value: uvOffsetb },
      iterations: { value: iterations },
      fractMul: { value: fractMul },
      fractRes: { value: fractRes },
      ia: { value: ia },
      ib: { value: ib },
      a: { value: a },
      b: { value: b },
      c: { value: c },
      da: { value: da },
      f: { value: f },
    },
    // vertexShader: `

    //     varying vec2 vUv;
    //     varying vec4 vPos;
    //     void main()
    //     {
    //         vUv = uv;
    //           //gl_Position =  vec4(position, 1.0);

    //         vPos = projectionMatrix * modelViewMatrix * vec4(position, 1.);
    //         gl_Position = vPos;

    //     }
    // `,
    vertexShader,
    fragmentShader,
  });

  shaderMaterial.side = BackSide;
  useFrame((state) => {
    let elapsedTime = state.clock.elapsedTime;

    shaderMaterial.uniforms.iTime.value = elapsedTime;
  });

  return (
    <>
      <mesh material={shaderMaterial}>
        <planeGeometry args={[4, 4, 1, 1]} />
        <boxGeometry args={[2, 2, 2]} />
        {/* <boxGeometry></boxGeometry> */}
        {/* <sphereGeometry></sphereGeometry> */}
      </mesh>
    </>
  );
}
