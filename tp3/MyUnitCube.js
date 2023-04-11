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
			//right
			0.5, -0.5, 0.5,	    //0, A_right
			0.5, -0.5, -0.5,	//1, B_right
			0.5, 0.5, 0.5,		//2, C_right
			0.5, 0.5, -0.5,	    //3, D_right
			//back
			0.5, -0.5, -0.5,	//4, B_back
			-0.5, -0.5, -0.5,	//5, E_back
			0.5, 0.5, -0.5,	    //6, D_back
			-0.5, 0.5, -0.5,	//7, G_back
			//left
			-0.5, -0.5, -0.5,	//8, E_left
			-0.5, -0.5, 0.5,	//9, F_left
			-0.5, 0.5, -0.5,	//10, G_left			
			-0.5, 0.5, 0.5,	    //11, H_left
			//front
			-0.5, -0.5, 0.5,	//12, F_front
			0.5, -0.5, 0.5,	    //13, A_front
			-0.5, 0.5, 0.5,	    //14, H_front
			0.5, 0.5, 0.5,		//15, C_front
			//down
			0.5, -0.5, 0.5,	    //16, A_down
			0.5, -0.5, -0.5,	//17, B_down
			-0.5, -0.5, 0.5,	//18, F_down
			-0.5, -0.5, -0.5,	//19, E_down
			//up
			0.5, 0.5, 0.5,		//20, C_uo
			0.5, 0.5, -0.5,	    //21, D_up
			-0.5, 0.5, 0.5,	    //22, H_up
			-0.5, 0.5, -0.5,	//23, G_up	
		];

		//Counter-clockwise reference of vertices
		this.indices = [
			//right
			0, 1, 2,
			1, 3, 2,
			//back
			4, 5, 6,
			5, 7, 6,
			//left
			8, 9, 10,
			9, 11, 10,
			//front
			12, 13, 14,
			13, 15, 14,
			//down
			17, 16, 19,
			18, 19, 16,
			//up
			20, 21, 22,
			21, 23, 22,
		];

        this.normals = [
			1, 0, 0,
			1, 0, 0,
			1, 0, 0,
			1, 0, 0,			
			0, 0, -1,
			0, 0, -1,
			0, 0, -1,
			0, 0, -1,
			-1, 0, 0,
			-1, 0, 0,
			-1, 0, 0,
			-1, 0, 0,
			0, 0, 1,
			0, 0, 1,
			0, 0, 1,
			0, 0, 1,
			0, -1, 0,
			0, -1, 0,
			0, -1, 0,
			0, -1, 0,
			0, 1, 0,
			0, 1, 0,
			0, 1, 0,
			0, 1, 0,
		];
		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles


        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
}

