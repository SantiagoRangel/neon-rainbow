  const vertexShader = `
 varying vec2 vUv;
 varying vec4 vPos;
        void main()
        {
            vUv = uv;
              //gl_Position =  vec4(position, 1.0);

            vPos = projectionMatrix * modelViewMatrix * vec4(position, 1.);
            gl_Position = vPos;

        }`
export default vertexShader;