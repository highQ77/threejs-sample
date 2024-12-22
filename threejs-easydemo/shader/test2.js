/**
 * Waves Remix
 * https://www.shadertoy.com/view/4ljGD1
 */

const TestShader2 = {

    name: 'TestShader2',

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

        float squared(float value) { return value * value; }

        float getAmp(float frequency) { return texture2D(tDiffuse, vec2(frequency / 512.0, 0)).x; }

        float getWeight(float f) {
            return (+ getAmp(f - 2.0) + getAmp(f - 1.0) + getAmp(f + 2.0) + getAmp(f + 1.0) + getAmp(f)) / 5.0;
        }

		void main() {
            vec2 iResolution = vec2(width, height);
            vec2 uvTrue = gl_FragCoord.xy / iResolution.xy;
            vec2 uv = -1.0 + 2.0 * uvTrue;
            float lineIntensity;
            float glowWidth;
            vec3 color = vec3(0.0);
            vec4 texel = texture2D( tDiffuse, vUv );

			for (float i = 0.0; i < 5.0; i++) {
                uv.y += (0.2 * sin(uv.x + i / 7.0 - iTime * 0.6));
                float Y = uv.y + getWeight(squared(i) * 20.0) *
                    (texture2D(tDiffuse, vec2(uvTrue.x, 1)).x - 0.5);
                lineIntensity = 0.4 + squared(1.6 * abs(mod(uvTrue.x + i / 1.3 + iTime, 2.0) - 1.0));
                glowWidth = abs(lineIntensity / (150.0 * Y));
                color += vec3(glowWidth * (2.0 + sin(iTime * 0.13)),
                    glowWidth * (2.0 - sin(iTime * 0.23)),
                    glowWidth * (2.0 - cos(iTime * 0.19)));
            }
            gl_FragColor = texel * vec4(color, .8);
		}`

};

export { TestShader2 };