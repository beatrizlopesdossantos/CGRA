import { CGFobject } from '../lib/CGF.js';
import { MyWeed } from './MyWeed.js';

/**
 * MyWeedSet
 * @constructor
 * @param {CGFscene} scene - Reference to MyScene object
 */
export class MyWeedSet extends CGFobject {

	constructor(scene) {
		super(scene);
        
        this.weeds = [];  

		this.initBuffers();
	}

    /**
     * @method initBuffers
     * Creates a random number of weed objects (between 40 to 45) and saves them in an array
     */
    initBuffers() {
        this.num = Math.random() * (45 - 40) + 40;

        for (var i = 0; i < this.num; i++) {
            this.weed = new MyWeed(this.scene);
            this.weeds.push(this.weed);
        } 
    }

    /**
     * @method display
     * Displays the weeed with a random position, angle and scale, generated on MyWeed
     */
    display() {
        this.scene.pushMatrix();
        for (var i = 0; i < this.num; i++) {
            this.scene.pushMatrix();
                this.scene.translate(this.weeds[i].x, this.weeds[i].y, this.weeds[i].z); 
                this.scene.scale(1, this.weeds[i].scale, 1);
                this.scene.rotate(this.weeds[i].angle, 0, 1, 0);
                this.weeds[i].display();
            this.scene.popMatrix();
        } 
        this.scene.popMatrix();
    }
}