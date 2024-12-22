/**
 * crumpledWave
 * https://www.shadertoy.com/view/3ttSzr
 */

const TestShader = {

    name: 'TestShader',

    uniforms: {
        'tDiffuse': { value: null },
        'opacity': { value: 1.0 },
        'width': { value: 100.0 },
        'height': { value: 100.0 },
        'iTime': { value: 0.0 },
    },

    vertexShader: /* glsl */`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,

    fragmentShader: /* glsl */`

		uniform float opacity;
        uniform float width;
        uniform float height;
        uniform float iTime;

		uniform sampler2D tDiffuse;

		varying vec2 vUv;

		void main() {
            vec2 iResolution = vec2(width, height);
            vec2 uv = (2.0 * gl_FragCoord.xy - iResolution.xy) / min(iResolution.x, iResolution.y);
            for (float i = 1.0; i < 8.0; i++) {
                uv.y += i * 0.1 / i *
                    sin(uv.x * i * i + iTime * 0.5) * sin(uv.y * i * i + iTime * 0.5);
            }
			vec4 texel = texture2D( tDiffuse, vUv );
            vec3 col;
            col.r = uv.y + 0.77;
            col.g = uv.y + 0.77;
            col.b = uv.y + 0.77;
			gl_FragColor = texel * vec4(col, 1.0);
		}`

};

export { TestShader };