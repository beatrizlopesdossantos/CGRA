#ifdef GL_ES
precision highp float;
#endif

varying vec4 coords;
varying vec2 vTextureCoord;

uniform sampler2D uSampler;

void main() {

    gl_FragColor = vec4(0.49, 0.76, 0.79, 1.0); 
}