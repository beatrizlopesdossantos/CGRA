import { CGFobject, CGFshader } from '../lib/CGF.js';
import { MySphere } from "./MySphere.js";
import { MyTriangle } from './MyTriangle.js';

/**
 * MyFish
 * @constructor
 * @param {CGFscene} scene - Reference to MyScene object
 * @param {CGFtexture} eyeTexture - Texture to be applied on the eye
 * @param {CGFtexture} bodyTexture - Texture to be applied on the body
 */
export class MyFish extends CGFobject {
    
    constructor(scene, eyeTexture, bodyTexture) {
        super(scene);

        this.animation = 0;
        this.speed = 0.5;
        this.body = new MySphere(scene, 16, 8, bodyTexture);
        this.tail = new MyTriangle(scene);
        this.eye = new MySphere(scene, 18, 8, eyeTexture);

        this.initShaders(scene);
	}

    /**
     * @method initShaders
     * Initializes the fish shaders
     * @param {CGFshader} scene - Reference to scene shader
     */    
    initShaders(scene) {
        this.shaderBody = new CGFshader(scene.gl, "shaders/body.vert", "shaders/body.frag");
        this.shaderTail = new CGFshader(scene.gl, "shaders/tail.vert", "shaders/tail.frag");
    }

    /**
     * @method display
     * Displays the fish
     * @param {integer} speed - Speed of the fish tails
     * @param {boolean} left - Check if turning left to stop the corresponding fish tail
     * @param {boolean} right - Check if turning right to stop the corresponding fish tail
     */    
    display(speed, left, right) {

        //Body transformations
        var bodyRotate = [
            1, 0, 0, 0,
            0, Math.cos(90 * Math.PI / 180), -Math.sin(90 * Math.PI / 180), 0,
            0, Math.sin(90 * Math.PI / 180), Math.cos(90 * Math.PI / 180), 0,
            0, 0, 0, 1
        ];

        var bodyScale= [
            0.15,0,0,0,
            0,0.20,0,0,
            0,0,0.25,0,           
            0,0,0,1            
        ];

        //Tails transformations
        var tailScale= [
            0.07,0,0,0,
            0,0.07,0,0,
            0,0,0.07,0,           
            0,0,0,1            
        ];

        var tailRotate = [
            Math.cos(270* Math.PI / 180), 0, Math.sin(270* Math.PI / 180), 0,
            0, 1, 0, 0,
            -Math.sin(270* Math.PI / 180), 0, Math.cos(270 * Math.PI / 180), 0,
            0, 0, 0, 1
        ];

        var rightTailTranslate = [
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            0.145, -0.03, 0.03, 1
        ];

        var leftTailTranslate = [
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            -0.145, -0.03, 0.03, 1
        ];

        var rightTailRotate = [
            Math.cos(335 * Math.PI / 180), -Math.sin(335 * Math.PI / 180), 0, 0,
            Math.sin(335 * Math.PI / 180), Math.cos(335 * Math.PI / 180), 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1
        ];

        var leftTailRotate = [
            Math.cos(25 * Math.PI / 180), -Math.sin(25 * Math.PI / 180), 0, 0,
            Math.sin(25 * Math.PI / 180), Math.cos(25 * Math.PI / 180), 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1
        ];

        var upperTailRotate = [
            Math.cos(90* Math.PI / 180), 0, Math.sin(90* Math.PI / 180), 0,
            0, 1, 0, 0,
            -Math.sin(90* Math.PI / 180), 0, Math.cos(90 * Math.PI / 180), 0,
            0, 0, 0, 1
        ];

        var upperTailTranslate = [
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            0, 0.26, -0.01, 1
        ];

        var backTailRotate = [
            1, 0, 0, 0,
            0, Math.cos(45 * Math.PI / 180), -Math.sin(45 * Math.PI / 180), 0,
            0, Math.sin(45 * Math.PI / 180), Math.cos(45 * Math.PI / 180), 0,
            0, 0, 0, 1
        ];

        var backTailScale= [
            0.13,0,0,0,
            0,0.13,0,0,
            0,0,0.13,0,           
            0,0,0,1            
        ];

        var backTailTranslate = [
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            0, 0, -0.25, 1
        ];

        //Eyes transformations
        var eyeScale= [
            0.03,0,0,0,
            0,0.03,0,0,
            0,0,0.03,0,           
            0,0,0,1            
        ];

        var eyeRotate = [
            Math.cos(90 * Math.PI / 180), -Math.sin(90 * Math.PI / 180), 0, 0,
            Math.sin(90 * Math.PI / 180), Math.cos(90 * Math.PI / 180), 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1
        ];

        var rightEyeTranslate = [
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            0.115, 0.025, 0.125, 1
        ];

        var rightEyeRotate = [
            Math.cos(15* Math.PI / 180), 0, Math.sin(15* Math.PI / 180), 0,
            0, 1, 0, 0,
            -Math.sin(15* Math.PI / 180), 0, Math.cos(15 * Math.PI / 180), 0,
            0, 0, 0, 1
        ];

        var leftEyeRotate = [
            Math.cos(350* Math.PI / 180), 0, Math.sin(350* Math.PI / 180), 0,
            0, 1, 0, 0,
            -Math.sin(350* Math.PI / 180), 0, Math.cos(350 * Math.PI / 180), 0,
            0, 0, 0, 1
        ];

        var leftEyeTranslate = [
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            -0.115, 0.025, 0.125, 1
        ];


        this.scene.pushMatrix();

            //Body
            this.scene.pushMatrix();
                this.scene.multMatrix(bodyScale);
                this.scene.multMatrix(bodyRotate);
                this.scene.setActiveShader(this.shaderBody);
                this.body.display();
            this.scene.popMatrix();
        
            this.scene.setActiveShader(this.scene.defaultShader);

            //Right tail
            this.scene.pushMatrix();
                this.scene.multMatrix(rightTailTranslate);
                this.scene.multMatrix(tailScale);
                if (right) this.scene.rotate(Math.sin(this.animation * (speed + 0.5) / 3) / 4, 0, 0, 1);
                this.scene.multMatrix(rightTailRotate);
                this.scene.multMatrix(tailRotate);            
                this.scene.translate(1, -1, 0); 
                this.scene.setActiveShader(this.shaderTail);
                this.tail.display();
            this.scene.popMatrix();

            //Left tail
            this.scene.pushMatrix();
                this.scene.multMatrix(leftTailTranslate);
                this.scene.multMatrix(tailScale);
                if (left) this.scene.rotate(-Math.sin(this.animation * (speed + 0.5) / 3) / 4, 0, 0, 1);
                this.scene.multMatrix(leftTailRotate);
                this.scene.multMatrix(tailRotate);
                this.scene.translate(1, -1, 0); 
                this.tail.display();
            this.scene.popMatrix();

            //Upper tail
            this.scene.pushMatrix();
                this.scene.multMatrix(upperTailTranslate);
                this.scene.multMatrix(tailScale);
                this.scene.multMatrix(upperTailRotate);
                this.tail.display();
            this.scene.popMatrix();

            //Back tail
            this.scene.pushMatrix();
                this.scene.multMatrix(backTailTranslate);            
                this.scene.rotate(Math.sin(this.animation * (speed + 5) / 8) / 2, 0, 1, 0); 
                this.scene.multMatrix(backTailScale);
                this.scene.translate(0,0,-Math.sqrt(2));           
                this.scene.multMatrix(backTailRotate);
                this.scene.multMatrix(tailRotate);
                this.tail.display();
            this.scene.popMatrix();

            this.scene.setActiveShader(this.scene.defaultShader);

            //Right eye
            this.scene.pushMatrix();
                this.scene.multMatrix(rightEyeTranslate);
                this.scene.multMatrix(rightEyeRotate);
                this.scene.multMatrix(eyeScale);
                this.scene.multMatrix(eyeRotate);
                this.eye.display();
            this.scene.popMatrix();

            //Left eye
            this.scene.pushMatrix();
                this.scene.multMatrix(leftEyeTranslate);
                this.scene.multMatrix(leftEyeRotate);
                this.scene.multMatrix(eyeScale);
                this.scene.multMatrix(eyeRotate);
                this.eye.display();
            this.scene.popMatrix();

        this.scene.popMatrix();

        this.animation += this.speed;
    }
}