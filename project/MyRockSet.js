import { CGFobject } from '../lib/CGF.js';
import { MyRock } from './MyRock.js';

/**
 * MyRockSet
 * @constructor
 * @param {CGFscene} scene - Reference to MyScene object
 */
export class MyRockSet extends CGFobject {

	constructor(scene) {
		super(scene);
        
        this.rocks = []; 
        this.rockAngle = 0;

		this.initBuffers();
	}
	
    /**
     * @method initBuffers
     * Creates a random number of rock objects (between 40 to 45) and saves them in an array
     */
    initBuffers() {
        this.num = Math.random() * (45 - 40) + 40;
        this.angle = Math.PI * 2 / this.num;
        for (var i = 0; i < this.num; i++) {
            this.rockAngle += this.angle;
            this.rock = new MyRock(this.scene, 32, 32);
            this.xNest = Math.random() * (-6 + 9) - 9;
            this.zNest = Math.random() * 3 - 3;
            this.rock.nestPos = [this.xNest, 0.25, this.zNest];
            this.rocks.push(this.rock);
        } 
    }

    /**
     * @method nearRock
     * Checks if an object is near the rock
     * @param {Array} position - Array of position of the object
     */
    nearRock(fishPos) {
        this.minDist = 3;
        this.index = -1;

        for (var i = 0; i < this.rocks.length; i++) {
            this.dist = Math.sqrt(Math.pow(this.rocks[i].getPos()[0] - fishPos[0], 2) + Math.pow(this.rocks[i].getPos()[1] - fishPos[1], 2) + Math.pow(this.rocks[i].getPos()[2] - fishPos[2], 2));
            if ((this.dist <= 1.5) && (this.dist < this.minDist) && (!this.rocks[i].rockOnNest)) {
                this.minDist = this.dist;
                this.index = i;
            }
        }

        if (this.index != -1) {
            return this.rocks[this.index];
        }

        return null;
    }

    /**
     * @method nearNest
     * Checks if an object is near the nest
     * @param {Array} position - Array of position of the object
     */
    nearNest(fishPos) {
        this.dist = Math.sqrt(Math.pow(-6.99 - fishPos[0], 2) + Math.pow(0.90 - fishPos[1], 2) + Math.pow(-1.32 - fishPos[2], 2));
        if (this.dist <= 2) {
            return true;
        }
        return false;
    }

    /**
     * @method nearNest
     * Checks if the fish can throw the rock to the nest
     * @param {Array} fishPos - Array of position of the fish
     */
    canThrow(fishPos) {
        this.dist = Math.sqrt(Math.pow(-6.99 - fishPos[0], 2) + Math.pow(-1.32 - fishPos[2], 2));
        if ((this.dist <= 5)) {
            return true;
        }
        return false;
    }

    /**
     * @method display
     * Displays the rock with a random position and scale, generated on MyRock
     * @param {Array} position - Array of position
     */
    display() {
        for (var i = 0; i < this.num; i++) {

            if(this.rocks[i].isFalling) {
                this.rocks[i].throw();
            }

            this.scene.pushMatrix();
                this.scale = this.rocks[i].scaleFactor;
                this.scene.translate(this.rocks[i].x, this.rocks[i].y, this.rocks[i].z); 
                this.scene.scale(this.scale, this.scale, this.scale);
                this.rocks[i].display();
            this.scene.popMatrix();
        } 
    }

    /**
     * @method reset
     * Resets the rocks positions
     */
    reset() {
        for (var i = 0; i < this.num; i++) {
            this.rocks[i].reset();
        }
    }

}