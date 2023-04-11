import { CGFobject } from '../lib/CGF.js';

/**
 * MyMovingObject
 * @constructor
 * @param {CGFscene} scene - Reference to MyScene object
 * @param {CGFobject} object - Reference to CGFobject object
 * @param {Array} position - Array of the initial position
 */
export class MyMovingObject extends CGFobject {

	constructor(scene, object, position) {
		super(scene);

        this.orientation = 0;
        this.velocity = 0;  
        this.yVelocity = 0;              
        this.position = position;
        this.object = object;
	}
	
    /**
     * @method update
     * Updates the velocity of the object
     * @param {integer} speedFactor - Value of the speed
     */
    update(speedFactor) {
        var directionVector = [Math.sin(this.orientation), 0, Math.cos(this.orientation)];
        for (var i = 0; i < 3; i++) {
            this.position[i] = this.position[i] + directionVector[i] * this.velocity * speedFactor;
        }
        if (this.yVelocity != 0) {
            if (this.position[1] + this.yVelocity > 5) {
                this.position[1] = 5;
                this.yVelocity = 0;
            }
            else if (this.position[1] + this.yVelocity < 0.90) {
                this.position[1] = 0.90;
                this.yVelocity = 0;
            }
            this.position[1] += this.yVelocity;            
        }
    }

    /**
     * @method turn
     * Receives a value that the object should turn
     * @param {integer} val - Value to be turned
     */
    turn(val) {
        this.orientation = this.orientation + val;

        if (val > 0) {
            this.right = true;
            this.left = false;
        }

        else if (val < 0) {
            this.left = true;
            this.right = false;
        }
    }

    /**
     * @method accelerate
     * Receives a value to accelerate the object
     * @param {integer} val - Value to accelerate
     */  
    accelerate(val) {
        if (this.velocity + val < 0) {
            this.velocity = 0;
            return;
        }

        this.velocity += val;
    }
    
    /**
     * @method stopTurning
     * Puts false the booleans that checked if the fish was turning
     */
    stopTurning() {
        this.left = false;
        this.right = false;
    }

    /**
     * @method display
     * Displays the moving object
     */
    display() {
        this.scene.pushMatrix();
            this.scene.translate(this.position[0], this.position[1], this.position[2]);
            this.scene.rotate(this.orientation, 0, 1, 0);        
            this.object.display(this.velocity, this.left ? 0 : 1, this.right ? 0 : 1);
        this.scene.popMatrix();

        this.stopTurning();
    }

    /**
     * @method reset
     * Resets everything about the object
     * @param {Array} position - Array of position
     */    
    reset(position) {
        this.orientation = 0;
        this.velocity = 0;
        this.position = position;
        this.yVelocity = 0;
    }    
}
