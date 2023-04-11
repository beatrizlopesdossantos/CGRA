import { MyMovingObject } from "./MyMovingObject.js";

/**
 * MyMovingFish
 * @constructor
 * @param {CGFscene} scene - Reference to MyScene object
 * @param {MyFish} fish - Reference to MyFish object 
 */
export class MyMovingFish extends MyMovingObject {

	constructor(scene, fish) {
		super(scene, fish);
   
        this.speed;
        this.fish = fish;
        this.rock = null;
        this.movingFish = new MyMovingObject(scene, this.fish, [0, 5, 0]);
        this.position = this.movingFish.position;
	}
    

    /**
     * @method getPosition
     * Returns the current position
     */
    getPosition() {
        return this.movingFish.position;
    }

    /**
     * @method update
     * Updates the velocity of the fish
     * @param {integer} speedFactor - Value of the speed
     */
    update(speedFactor) {
        this.movingFish.update(speedFactor);
    }

    /**
     * @method turn
     * Receives a value that the fish should turn
     * @param {integer} val - Value to be turned
     */
    turn(val) {
        this.movingFish.turn(val);
    }

    /**
     * @method accelerate
     * Receives a value to accelerate the fish
     * @param {integer} val - Value to accelerate
     */    
    accelerate(val) {
        this.movingFish.accelerate(val);
    }

    /**
     * @method level
     * Changes the yVelocity in order to raise or lower the fish y position
     * @param {integer} val - Value to increment or decrement the position
     */    
    level(val) {
        this.movingFish.yVelocity = val;
    }

    /**
     * @method pickRock
     * Receives the rock that the fish has
     * @param {MyRock} rock - Reference to MyRock object 
     */
    pickRock(rock) {
        this.rock = rock;
    }

    /**
     * @method hasRock
     * Checks if the fish has a rock
     */    
    hasRock() {
        if (this.rock == null) return false;
        return true;
    }

    /**
     * @method Rock
     * Returns the rock that the fish has
     */    
    Rock() {
        return this.rock;
    }

    /**
     * @method nullRock
     * Sets the rocl object null when the fish drops it
     */
    nullRock() {
        this.rock = null;
    }

    /**
     * @method display
     * Displays the moving fish
     */
    display() {
        this.movingFish.display();  
    }

    /**
     * @method reset
     * Resets the everything about the fish
     */    
    reset() {
        this.rock = null;
        this.movingFish.reset([0, 5, 0]);
    }
}
