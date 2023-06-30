import { useFrame } from '@react-three/fiber'
import { useControls } from 'leva'
import { BackSide, ShaderMaterial } from 'three'

export default function Screen() {
	const { uvOffseta, uvOffsetb, iterations, fractMul, fractRes, ia, ib, a, b, c, da, f } = useControls({
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
	})

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
		vertexShader: `

        varying vec2 vUv;
        varying vec4 vPos;
        void main()
        {
            vUv = uv;
              //gl_Position =  vec4(position, 1.0);

            vPos = projectionMatrix * modelViewMatrix * vec4(position, 1.);
            gl_Position = vPos;

        }
    `,
		fragmentShader: `
        varying vec2 vUv;
        varying vec4 vPos;
        uniform float iTime;
        uniform vec2 resolution;
        uniform float uvOffseta;
        uniform float uvOffsetb;
        uniform float iterations;
        uniform float fractMul;
        uniform float fractRes;
        uniform float ia;
        uniform float ib;
        uniform float a; 
        uniform float b;
        uniform float c;
        uniform float da;
        uniform float f;

        vec3 palette(float t) {

            vec3 a = vec3(0.938, 0.678, 1.188);
            vec3 b = vec3(1.648, 0.538, 1.718);
            vec3 c = vec3(0.619, 0.607, 0.555);
            vec3 d = vec3(0.598, 2.518, 1.248);
            return a + b*cos(6.28318*(c*t*d));
        }
        
        void main()
        {
            vec2 uv = vUv;
            uv = uv - uvOffseta;
            uv = uv * uvOffsetb; 
            
            vec2 uv0 = uv;

    
            vec3 finalColor = vec3(0.0);

            for(float i = 0.0; i< iterations; i++){

                uv = fract(uv * fractMul) - fractRes;
        
                float d = length(uv) * exp(-length(uv0)) ;
            
                vec3 col = palette(length(uv0) + i* ia + iTime * ib);
                    
        d = sin(d * a + iTime * c)/ b;
                    d  = abs(d);
        
        d = pow(da/d, f);
                 
                    finalColor += col * d;

            }
           
         gl_FragColor = vec4(finalColor, 1.);
        }
    `,
	})

	shaderMaterial.side = BackSide
	useFrame((state) => {
		let elapsedTime = state.clock.elapsedTime

		shaderMaterial.uniforms.iTime.value = elapsedTime
	})

	return (
		<>
			<mesh material={shaderMaterial}>
				<planeGeometry args={[4, 4, 1, 1]} />
				<boxGeometry args={[2, 2, 2]} />
				{/* <boxGeometry></boxGeometry> */}
				{/* <sphereGeometry></sphereGeometry> */}
			</mesh>
		</>
	)
}
