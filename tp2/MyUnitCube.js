import {CGFobject} from '../lib/CGF.js';
/**
 * MyUnitCube
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyUnitCube extends CGFobject {
	constructor(scene) {
		super(scene);
		this.initBuffers();
	}
	
	initBuffers() {
		this.vertices = [
            // vértices de cima
			-0.5, 0.5, -0.5,	//0 
			-0.5, 0.5, 0.5,	    //1
			0.5, 0.5, 0.5,		//2
			0.5, 0.5, -0.5,	    //3 
            // vértices de baixo
            -0.5, -0.5, -0.5,	//4
			-0.5, -0.5, 0.5,	//5
			0.5, -0.5, 0.5,		//6
			0.5, -0.5, -0.5,	//7
		];

		//Counter-clockwise reference of vertices
		this.indices = [
            // face superior
			0, 1, 2,
			2, 3, 0,
            // face inferior
            4, 7, 6,
            6, 5, 4,
            // face esquerda
            0, 4, 5,
            5, 1, 0,
            // face frontal
            1, 5, 6,
            6, 2, 1,
            // face direita
            2, 6, 7,
            7, 3, 2,
            // face traseira
            0, 3, 7,
            7, 4, 0,
		];

		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}
}

