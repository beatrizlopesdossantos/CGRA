import { CGFappearance, CGFobject } from '../lib/CGF.js';
import { MyPyramid } from './MyPyramid.js';

/**
 * MyWeed
 * @constructor
 * @param {CGFscene} scene - Reference to MyScene object
 */
export class MyWeed extends CGFobject {

    constructor(scene) {
        super(scene);

        this.x;
        this.y;
        this.z;
        this.angle;
        this.scale;

        this.pyramid = new MyPyramid(scene, 4, 2);

        this.material = new CGFappearance(scene);
        this.material.setShininess(10.0);

        this.generateRandPos();
    }

    /**
     * @method generateRandPos
     * Generates random positions, rotation angle and scale factor
     */
    generateRandPos() {
        this.x = Math.floor(Math.random() * (19 + 19 + 1) - 19);
        this.y = 0.2;
        this.z = Math.floor(Math.random() * (19 + 19 + 1) - 19);

        //make sure they arent on the nest
        if (this.x < -3.50 && this.x > -10.5 && this.z < 0.5 && this.z > -3.5) {
            this.x = Math.floor(Math.random() * (19 + 2 + 1) - 2);
            this.z = Math.floor(Math.random() * (19) + 1);
        }

        this.angle = (Math.random() * (360) + 1) * Math.PI / 180;
        this.scale =  Math.random() * (1.8 - 0.4) + 0.4;
    }

    /**
     * @method display
     * Displays the group of weeds that sticks together
     */
    display() {
        var pyramidRotate = [
            1, 0, 0, 0,
            0, Math.cos(90 * Math.PI / 180), -Math.sin(90 * Math.PI / 180), 0,
            0, Math.sin(90 * Math.PI / 180), Math.cos(90 * Math.PI / 180), 0,
            0, 0, 0, 1
        ];

        var pyramidScale = [
            0.15,0,0,0,
            0,1.4,0,0,
            0,0,0.15,0,           
            0,0,0,1            
        ];

        var pyramidScale1 = [
            0.15,0,0,0,
            0,0.8,0,0,
            0,0,0.15,0,           
            0,0,0,1            
        ];

        var pyramidScale2 = [
            0.15,0,0,0,
            0,0.7,0,0,
            0,0,0.15,0,           
            0,0,0,1            
        ];

        var pyramidScale3 = [
            0.15,0,0,0,
            0,1.1,0,0,
            0,0,0.15,0,           
            0,0,0,1            
        ];

        var pyramidTranslate = [
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            0.2, 0.4, 0, 1
        ];

        var pyramidTranslate1 = [
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            -0.1, 0.35, 0.2, 1
        ];

        var pyramidTranslate2 = [
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            -0.05, 0.55, -0.2, 1
        ];

        var pyramidTranslate3 = [
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            0, 0.7, 0, 1
        ];

        //biggest
        this.scene.pushMatrix();
            this.scene.multMatrix(pyramidTranslate3);
            this.scene.multMatrix(pyramidScale);
            this.scene.multMatrix(pyramidRotate); 
            this.material.setAmbient(0.5, 0.65, 0.15, 1);
            this.material.setDiffuse(0.5, 0.65, 0.15, 1);
            this.material.setSpecular(0.5, 0.65, 0.15, 1);
            this.material.apply();
            this.pyramid.display();
        this.scene.popMatrix();

        //middle smallest
        this.scene.pushMatrix();
            this.scene.multMatrix(pyramidTranslate);      
            this.scene.multMatrix(pyramidScale1);
            this.scene.multMatrix(pyramidRotate); 
            this.material.setAmbient(0, 0.95, 0.1, 1);
            this.material.setDiffuse(0.5, 0.85, 0.15, 1);
            this.material.setSpecular(0.5, 0.65, 0.15, 1);
            this.material.apply();
            this.pyramid.display();
        this.scene.popMatrix();

        //smallest
        this.scene.pushMatrix();
            this.scene.multMatrix(pyramidTranslate1);      
            this.scene.multMatrix(pyramidScale2);
            this.scene.multMatrix(pyramidRotate); 
            this.material.setAmbient(0, 0.35, 0.1, 1);
            this.material.setDiffuse(0.5, 0.35, 0.15, 1);
            this.material.setSpecular(0.5, 0.65, 0.15, 1);
            this.material.apply();
            this.pyramid.display();
        this.scene.popMatrix();

        //middle biggest
        this.scene.pushMatrix();
            this.scene.multMatrix(pyramidTranslate2);      
            this.scene.multMatrix(pyramidScale3);
            this.scene.multMatrix(pyramidRotate); 
            this.material.setAmbient(0.05, 1, 0.3, 1);
            this.material.setDiffuse(0.5, 1, 0.3, 1);
            this.material.setSpecular(0.5, 1, 0.35, 1);
            this.material.apply();
            this.pyramid.display();
        this.scene.popMatrix();
    }
}
