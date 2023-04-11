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

        var triangleSmallCoords = [
            0, 0,
            0.25, 0.25,
            0, 0.5
        ];
        this.trianglesmall = new MyTriangleSmall(scene, triangleSmallCoords);
        
        var triangleSmall2Coords = [
            0.5, 0.5,
            0.25, 0.75,
            0.75, 0.75
        ];
        this.trianglesmall2 = new MyTriangleSmall(scene, triangleSmall2Coords);

        var triangleBigCoords = [
            0, 0,
            0.5, 0.5,
            1, 0
        ];
        this.trianglebig = new MyTriangleBig(scene, triangleBigCoords);

        var triangleBig2Coords = [
            1, 0,
            0.5, 0.5,
            1, 1
        ];
        this.trianglebig2 = new MyTriangleBig(scene, triangleBig2Coords);
        
        //------ Applied Material
        this.material = new CGFappearance(scene);
        this.material.setAmbient(0.1, 0.1, 0.1, 1);
        this.material.setDiffuse(0.9, 0.9, 0.9, 1);
        this.material.setSpecular(0.1, 0.1, 0.1, 1);
        this.material.setShininess(10.0);
        this.material.loadTexture('images/tangram.png');
        this.material.setTextureWrap('REPEAT', 'REPEAT');
        //------
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
            Math.cos(-180 * Math.PI / 180), 0, Math.sin(-180 * Math.PI / 180), 0,
            0, 1,  0, 0,
            -Math.sin(-180 * Math.PI / 180), 0, Math.cos(-180 * Math.PI / 180), 0,
            0, 0, 0, 1
        ];
    
        var triangleRotate = [
            Math.cos(-90 * Math.PI / 180), -Math.sin(-90 * Math.PI / 180), 0, 0,
            Math.sin(-90 * Math.PI / 180), Math.cos(-90 * Math.PI / 180), 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1
        ]
        var sca_1= [

            1,0,0,0,
            
            0,-1,0,0,
            
            0,0,1,0,
            
            0,0,0,1
            
            ];
        var ParTranslate = [
                1, 0, 0, 0,
                0, 1, 0, 0,
                0, 0, 1, 0,
                -3, 1, 0, 1
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
        this.material.apply();
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

    /*initMaterials() {
        // Diamond (no diffuse, no specular)
        this.material1 = new CGFappearance(this);
        this.material1.setAmbient(1, 0, 0, 1.0);
        this.material1.setDiffuse(0, 0, 0, 1.0);
        this.material1.setSpecular(0, 0, 0, 1.0);
        this.material1.setShininess(10.0);

        // Red Diffuse (no ambient, no specular)
        this.material2 = new CGFappearance(this);
        this.material2.setAmbient(0.0, 0.0, 0.0, 1.0);
        this.material2.setDiffuse(1, 0, 0, 1.0);
        this.material2.setSpecular(0, 0, 0, 1.0);
        this.material2.setShininess(10.0);

        // Red Specular (no ambient, no diffuse)
        this.material3 = new CGFappearance(this);
        this.material3.setAmbient(0, 0, 0, 1.0);
        this.material3.setDiffuse(0, 0, 0, 1.0);
        this.material3.setSpecular(1, 0, 0, 1.0);
        this.material3.setShininess(10.0);

        // Wood
        this.material4 = new CGFappearance(this);
        this.material4.setAmbient(0.52, 0.37, 0.26, 1.0);
        this.material4.setDiffuse(0, 0, 0, 1.0);
        this.material4.setSpecular(0, 0, 0, 1.0);
        this.material4.setShininess(10.0);

        this.materials = [this.material1, this.material2, this.material3, this.customMaterial, this.material4];

        // Labels and ID's for object selection on MyInterface
        this.materialIDs = {'Red Ambient': 0, 'Red Diffuse': 1, 'Red Specular': 2, 'Custom': 3, 'Wood': 4 };
    }*/
}