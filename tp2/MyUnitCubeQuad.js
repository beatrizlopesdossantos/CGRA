import {CGFobject} from '../lib/CGF.js';
import { MyQuad } from './MyQuad.js';
/**
 * MyUnitCubeQuad
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyUnitCubeQuad extends CGFobject {
	constructor(scene) {
		super(scene);
		this.initBuffers();
        this.quad = new MyQuad(scene);
	}
	
	initBuffers() {
		this.vertices = [
			-0.5, 0.5, 0,	    //0
			-0.5, -0.5, 0,	    //1
			0.5, -0.5, 0,		//2
			0.5, 0.5, 0,		//3
		];

		//Counter-clockwise reference of vertices
		this.indices = [
			0, 1, 2,
			2, 3, 0,
		];

		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}

    display() {
        var quad1Translate = [
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            0, 0, 0.5, 1,
        ];

        var quad2Rotate = [
            1, 0, 0, 0,
            0, Math.cos(90 * Math.PI / 180), -Math.sin(90 * Math.PI / 180), 0,
            0, Math.sin(90 * Math.PI / 180), Math.cos(90 * Math.PI / 180), 0,
            0, 0, 0, 1
        ];

        var quad2Translate = [
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            0, 0.5, 0, 1,
        ];

        var quad3Rotate = [
            1, 0, 0, 0,
            0, Math.cos(180 * Math.PI / 180), -Math.sin(180 * Math.PI / 180), 0,
            0, Math.sin(180 * Math.PI / 180), Math.cos(180 * Math.PI / 180), 0,
            0, 0, 0, 1
        ];

        var quad3Translate = [
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            0, 0, -0.5, 1,
        ];

        var quad4Rotate = [
            1, 0, 0, 0,
            0, Math.cos(-90 * Math.PI / 180), -Math.sin(-90 * Math.PI / 180), 0,
            0, Math.sin(-90 * Math.PI / 180), Math.cos(-90 * Math.PI / 180), 0,
            0, 0, 0, 1
        ];

        var quad4Translate = [
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            0, -0.5, 0, 1,
        ];

        var quad5Rotate = [
            Math.cos(-90 * Math.PI / 180), 0, Math.sin(-90 * Math.PI / 180), 0,
            0, 1, 0, 0,
            -Math.sin(-90 * Math.PI / 180), 0, Math.cos(-90 * Math.PI / 180), 0,
            0, 0, 0, 1
        ];

        var quad5Translate = [
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            0.5, 0, 0, 1,
        ];

        var quad6Rotate = [
            Math.cos(90 * Math.PI / 180), 0, Math.sin(90 * Math.PI / 180), 0,
            0, 1, 0, 0,
            -Math.sin(90 * Math.PI / 180), 0, Math.cos(90 * Math.PI / 180), 0,
            0, 0, 0, 1
        ];

        var quad6Translate = [
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            -0.5, 0, 0, 1,
        ];

        this.scene.pushMatrix();
        this.scene.multMatrix(quad1Translate);
        this.quad.display();
        this.scene.popMatrix();
        
        this.scene.pushMatrix();
        this.scene.multMatrix(quad2Translate);
        this.scene.multMatrix(quad2Rotate);
        this.quad.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.multMatrix(quad3Translate);
        this.scene.multMatrix(quad3Rotate);
        this.quad.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.multMatrix(quad4Translate);
        this.scene.multMatrix(quad4Rotate);
        this.quad.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.multMatrix(quad5Translate);
        this.scene.multMatrix(quad5Rotate);
        this.quad.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.multMatrix(quad6Translate);
        this.scene.multMatrix(quad6Rotate);
        this.quad.display();
        this.scene.popMatrix();
    }
}
