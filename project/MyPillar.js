import { CGFobject } from '../lib/CGF.js';
import { MyCylinder } from './MyCylinder.js';

/**
 * MyPillar
 * @constructor
 * @param {CGFscene} scene - Reference to MyScene object
 * @param {integer} slices - Number of divisions around the Y axis
 * @param {integer} stacks - Number of divisions along the Y axis
 * @param {integer} numPillars - Number of pillars
 * @param {string} texture - Path for the texture
 */
export class MyPillar extends CGFobject {

	constructor(scene, slices, stacks, numPillars, texture) {
        super(scene);

        this.pillars = [];
        this.slices = slices;
        this.stacks = stacks;
        this.texture = texture;
        this.numPillars = numPillars;
        this.cylinder = new MyCylinder(this.scene, this.slices, this.stacks, this.texture);
    }
    
    /**
     * @method display
     * Displays the pillar
     */
    display() {
        var xpos = 3;
        var sum = 4;

        for(var i = 0; i < this.numPillars; i++){
            
            this.scene.pushMatrix();
                //put the pillars in an alternate position
                if ((i % 2) == 0) this.scene.translate(xpos, 0, -4); 
                else this.scene.translate(xpos, 0, 0); 
                this.scene.scale(0.5, 10, 0.5);
                this.cylinder.display();
            this.scene.popMatrix();

            xpos += sum;
        }
    }
}