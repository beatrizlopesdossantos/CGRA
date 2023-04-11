import {CGFobject} from '../lib/CGF.js';
import { MyDiamond } from "./MyDiamond.js";
import { MyParallelogram } from "./MyParallelogram.js";
import { MyTriangle } from "./MyTriangle.js";
import { MyTriangleSmall } from "./MyTriangleSmall.js";
import { MyTriangleBig } from "./MyTriangleBig.js";
import { CGFscene, CGFappearance } from "../lib/CGF.js";

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
        this.material1 = new CGFappearance(this.scene);
        this.material1.setAmbient(0, 1, 0, 1.0);
        this.material1.setDiffuse(0, 0, 0, 1.0);
        this.material1.setSpecular(1, 1, 1, 1.0);
        this.material1.setShininess(10.0);
        this.material1.apply();

        if (this.scene.selectedMaterial === '3') {
            this.scene.customMaterial.apply();
        }
        else {
            this.material1.apply();
        }
        this.scene.pushMatrix();
        this.scene.multMatrix(diamondTranslate);
        this.diamond.display();
        this.scene.popMatrix();
    
        this.material2 = new CGFappearance(this.scene);
        this.material2.setAmbient(0, 0.61, 1, 1.0);
        this.material2.setDiffuse(0, 0, 0, 1.0);
        this.material2.setSpecular(1, 1, 1, 1.0);
        this.material2.setShininess(10.0);
        this.material2.apply();
        this.scene.pushMatrix();
        this.scene.multMatrix(triangleBigRotate);
        this.scene.multMatrix(triangleBigTranslate);
        this.trianglebig.display();
        this.scene.popMatrix();
    
        this.material3 = new CGFappearance(this.scene);
        this.material3.setAmbient(1, 1, 0, 1.0);
        this.material3.setDiffuse(0, 0, 0, 1.0);
        this.material3.setSpecular(1, 1, 1, 1.0);
        this.material3.setShininess(10.0);
        this.material3.apply();
        this.scene.pushMatrix();
        this.scene.multMatrix(parallelogramRotate);
        this.parallelogram.display();
        this.scene.popMatrix();
    
        this.material4 = new CGFappearance(this.scene);
        this.material4.setAmbient(1, 0.61, 0.81, 1.0);
        this.material4.setDiffuse(0, 0, 0, 1.0);
        this.material4.setSpecular(1, 1, 1, 1.0);
        this.material4.setShininess(10.0);
        this.material4.apply();
        this.scene.pushMatrix();
        this.scene.multMatrix(triangleTranslate);
        this.scene.multMatrix(triangleRotate);
        this.triangle.display();
        this.scene.popMatrix();
    
        this.material5 = new CGFappearance(this.scene);
        this.material5.setAmbient(1, 0.61, 0, 1.0);
        this.material5.setDiffuse(0, 0, 0, 1.0);
        this.material5.setSpecular(1, 1, 1, 1.0);
        this.material5.setShininess(10.0);
        this.material5.apply();
        this.scene.pushMatrix();
        this.scene.multMatrix(triangleBig2Translate);
        this.scene.multMatrix(triangleBig2Rotate);
        this.trianglebig2.display();
        this.scene.popMatrix();
        
        this.material6 = new CGFappearance(this.scene);
        this.material6.setAmbient(1, 0.11, 0.11, 1.0);
        this.material6.setDiffuse(0, 0, 0, 1.0);
        this.material6.setSpecular(1, 1, 1, 1.0);
        this.material6.setShininess(10.0);
        this.material6.apply();
        this.scene.pushMatrix();
        this.scene.multMatrix(triangleSmallTranslate);
        this.scene.multMatrix(triangleSmallRotate);
        this.trianglesmall.display();
        this.scene.popMatrix();
    
        this.material7 = new CGFappearance(this.scene);
        this.material7.setAmbient(0.59, 0.31, 0.75, 1.0);
        this.material7.setDiffuse(0, 0, 0, 1.0);
        this.material7.setSpecular(1, 1, 1, 1.0);
        this.material7.setShininess(10.0);
        this.material7.apply();
        this.scene.pushMatrix();
        this.scene.multMatrix(triangleSmall2Translate);
        this.scene.multMatrix(triangleSmall2Rotate);
        this.trianglesmall2.display();
        this.scene.popMatrix();
        // ---- END Primitive drawing section
    }

    enableNormalViz() {
        this.diamond.enableNormalViz();
        this.triangle.enableNormalViz();
        this.parallelogram.enableNormalViz(); 
        this.trianglesmall.enableNormalViz();
        this.trianglesmall2.enableNormalViz();
        this.trianglebig.enableNormalViz(); 
        this.trianglebig2.enableNormalViz(); 
    }

    disableNormalViz() {
        this.diamond.disableNormalViz();
        this.triangle.disableNormalViz();
        this.parallelogram.disableNormalViz(); 
        this.trianglesmall.disableNormalViz();
        this.trianglesmall2.disableNormalViz();
        this.trianglebig.disableNormalViz(); 
        this.trianglebig2.disableNormalViz(); 
    }

}