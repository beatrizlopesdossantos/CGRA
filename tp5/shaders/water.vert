attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;

uniform float waterTimeFactor;

varying vec2 vTextureCoord;

uniform sampler2D waterMap;

void main() {
    vec4 color = texture2D(waterMap, aTextureCoord);

    vec3 position = vec3(aVertexPosition.x, aVertexPosition.y, aVertexPosition.z + 0.05 * color.r * sin(waterTimeFactor));

	gl_Position = uPMatrix * uMVMatrix * (vec4(position, 1.0));

	vTextureCoord = aTextureCoord;
}

