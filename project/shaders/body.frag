#ifdef GL_ES
precision highp float;
#endif

varying vec4 coords;
varying vec2 vTextureCoord;

uniform sampler2D uSampler;

void main() {

    if (coords.y <= -0.25) {
        gl_FragColor = vec4(0.49, 0.76, 0.79, 1.0); 
    }
    else {
        gl_FragColor = texture2D(uSampler, vTextureCoord);
    }
}