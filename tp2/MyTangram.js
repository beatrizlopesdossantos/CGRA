import {CGFobject} from '../lib/CGF.js';
import { MyDiamond } from "./MyDiamond.js";
import { MyParallelogram } from "./MyParallelogram.js";
import { MyTriangle } from "./MyTriangle.js";
import { MyTriangleSmall } from "./MyTriangleSmall.js";
import { MyTriangleBig } from "./MyTriangleBig.js";
import { CGFscene } from "../lib/CGF.js";

/**
 * MyTangram
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyTangram extends CGFobject {
	constructor(scene) {
		super(scene);
		this.initBuffers();
        this.diamond = new MyDiamond(scene);
        this.triangle = new MyTriangle(scene);
        this.parallelogram = new MyParallelogram(scene);
        this.trianglesmall = new MyTriangleSmall(scene);
        this.trianglesmall2 = new MyTriangleSmall(scene);
        this.trianglebig = new MyTriangleBig(scene);
        this.trianglebig2 = new MyTriangleBig(scene);
	}
	
	initBuffers() {
		this.vertices = [
			-1, 0, 0,	//0
			1, 0, 0,	//1
			0, 1, 0,	//2
		];

		//Counter-clockwise reference of vertices
		this.indices = [
			0, 1, 2,
		];

		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}

    display() {
        var diamondTranslate = [
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            -1.5, -1, 0, 1
        ];
    
        var triangleBigTranslate = [
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            -2, 0, 0, 1
        ];
    
        var triangleBigRotate = [
            Math.cos(135 * Math.PI / 180), -Math.sin(135 * Math.PI / 180), 0, 0,
            Math.sin(135 * Math.PI / 180), Math.cos(135 * Math.PI / 180), 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1
        ];
    
        var parallelogramRotate = [
            Math.cos(180 * Math.PI / 180), 0, Math.sin(180 * Math.PI / 180), 0,
            0, 1, 0, 0,
            -Math.sin(180 * Math.PI / 180), 0, Math.cos(180 * Math.PI / 180), 0,
            0, 0, 0, 1
        ];
    
        var triangleRotate = [
            Math.cos(-90 * Math.PI / 180), -Math.sin(-90 * Math.PI / 180), 0, 0,
            Math.sin(-90 * Math.PI / 180), Math.cos(-90 * Math.PI / 180), 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1
        ]
    
        var triangleTranslate = [
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            -2, 2, 0, 1
        ]
    
        var triangleBig2Rotate = [
            Math.cos(-45 * Math.PI / 180), -Math.sin(-45 * Math.PI / 180), 0, 0,
            Math.sin(-45 * Math.PI / 180), Math.cos(-45 * Math.PI / 180), 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1
        ];
    
        var triangleBig2Translate = [
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            -1.6, 2.4, 0, 1
        ]
    
        var triangleSmallRotate = [
            Math.cos(90 * Math.PI / 180), -Math.sin(90 * Math.PI / 180), 0, 0,
            Math.sin(90 * Math.PI / 180), Math.cos(90 * Math.PI / 180), 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1
        ];
    
        var triangleSmallTranslate = [
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            2, -1, 0, 1
        ];
    
        var triangleSmall2Rotate = [
            Math.cos(-90 * Math.PI / 180), -Math.sin(-90 * Math.PI / 180), 0, 0,
            Math.sin(-90 * Math.PI / 180), Math.cos(-90 * Math.PI / 180), 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1
        ];
    
        var triangleSmall2Translate = [
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            2, -1, 0, 1
        ];
        
        // ---- BEGIN Primitive drawing section
        this.scene.pushMatrix();
        this.scene.multMatrix(diamondTranslate);
        this.diamond.display();
        this.scene.popMatrix();
    
        this.scene.pushMatrix();
        this.scene.multMatrix(triangleBigRotate);
        this.scene.multMatrix(triangleBigTranslate);
        this.trianglebig.display();
        this.scene.popMatrix();
    
        this.scene.pushMatrix();
        this.scene.multMatrix(parallelogramRotate);
        this.parallelogram.display();
        this.scene.popMatrix();
    
        this.scene.pushMatrix();
        this.scene.multMatrix(triangleTranslate);
        this.scene.multMatrix(triangleRotate);
        this.triangle.display();
        this.scene.popMatrix();
    
        this.scene.pushMatrix();
        this.scene.multMatrix(triangleBig2Translate);
        this.scene.multMatrix(triangleBig2Rotate);
        this.trianglebig2.display();
        this.scene.popMatrix();
        
        this.scene.pushMatrix();
        this.scene.multMatrix(triangleSmallTranslate);
        this.scene.multMatrix(triangleSmallRotate);
        this.trianglesmall.display();
        this.scene.popMatrix();
    
        this.scene.pushMatrix();
        this.scene.multMatrix(triangleSmall2Translate);
        this.scene.multMatrix(triangleSmall2Rotate);
        this.trianglesmall2.display();
        this.scene.popMatrix();
        // ---- END Primitive drawing section
    }
}