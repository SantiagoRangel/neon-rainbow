const fragmentShader = `
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
`;

export default fragmentShader;
