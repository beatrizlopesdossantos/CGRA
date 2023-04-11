#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord;

uniform float sandTimeFactor;

uniform sampler2D sandTex;
uniform sampler2D sandMap;

void main() {
	vec4 color = texture2D(sandTex, vTextureCoord);
	vec4 filter = texture2D(sandMap, vTextureCoord);

	if (filter.r < 0.1 && filter.g < 0.8 && filter.b < 0.5) {
		gl_FragColor = color * 2.0;
	}
	else {
		gl_FragColor = color * filter * 1.8;
	}
}