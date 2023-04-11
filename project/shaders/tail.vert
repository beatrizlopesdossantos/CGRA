attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;

uniform float timeFactor;

void main() {

    vec3 offset = vec3(0.0,0.0,0.0);

    ///offset.z = sin (timeFactor)*sqrt(pow(aVertexPosition.x+1));

	gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);

}