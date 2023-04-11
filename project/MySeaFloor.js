import { CGFobject, CGFappearance, CGFtexture,  CGFshader } from '../lib/CGF.js';
import { MyPlane } from './MyPlane.js';

/**
 * MySeaFloor
 * @constructor
 * @param {CGFscene} scene - Reference to MyScene object
 * @param {string} texture - Path for the sea floor (sand)
 * @param {string} texture1 - Path for the map of the sea floor
 */
export class MySeaFloor extends CGFobject {

    constructor(scene, texture, texture1) {
        super(scene);

        this.sand = new MyPlane(scene, 20);
        
        this.texture1 = new CGFtexture(scene, texture1);

        this.material = new CGFappearance(scene);
        this.material.loadTexture(texture);
        this.material.setTextureWrap('REPEAT', 'REPEAT');

        this.initShaders(scene);
	}

    /**
     * @method initShaders
     * Initializes the sea floor shaders
     * @param {CGFshader} scene - Reference to scene shader
     */      
    initShaders(scene) {
        this.shaderSand = new CGFshader(scene.gl, "shaders/sand.vert", "shaders/sand.frag");
		this.shaderSand.setUniformsValues({ sandMap: 1, offset: 1.25, multiplier: 1.5 });
    }

    /**
     * @method display
     * Displays the sea floor
     */    
    display() {

        var sandRotate = [
            1, 0, 0, 0,
            0, Math.cos(90 * Math.PI / 180), -Math.sin(90 * Math.PI / 180), 0,
            0, Math.sin(90 * Math.PI / 180), Math.cos(90 * Math.PI / 180), 0,
            0, 0, 0, 1
        ];

        var sandScale= [
            50,0,0,0,
            0,1,0,0,
            0,0,50,0,           
            0,0,0,1            
        ];

        this.scene.setActiveShader(this.shaderSand);
        this.texture1.bind(1);

        this.scene.pushMatrix();
            this.scene.multMatrix(sandScale);
            this.scene.multMatrix(sandRotate); 
            this.material.apply();       
            this.sand.display();
        this.scene.popMatrix();

        this.scene.setActiveShader(this.scene.defaultShader);
    }
}