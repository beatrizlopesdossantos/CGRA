#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord;

uniform float waterTimeFactor;

uniform sampler2D uSampler;
uniform sampler2D waterMap;

void main() { 
	vec2 velocity = vTextureCoord + waterTimeFactor * 0.002;

	vec2 offset = vec2(texture2D(waterMap, velocity).r-0.5 ,texture2D(waterMap, velocity).g-0.5);	

	vec4 color = texture2D(uSampler, vTextureCoord + 0.6 * offset);

	gl_FragColor = color;
}