import { CGFscene, CGFobject } from "../lib/CGF.js";

/**
 * MyAnimatedFish
 * @constructor
 * @param {CGFscene} scene - Reference to MyScene object
 * @param {float} x - Position of the center of the circle
 * @param {float} y - Position of the center of the circle
 * @param {float} z - Position of the center of the circle
 * @param {object} fish - Reference to a fish
 */
export class MyAnimatedFish extends CGFobject {

    constructor(scene, x, y, z, fish) {
        super(scene, fish);

        this.radius = 5;
        this.frame = 90;
        this.orientation = 0;
        this.position = [0, 0, 0];

        this.center = [x, y, z];
        this.duration = Math.random() * (10 - 2) + 2;
        this.perimeter = 2 * Math.PI * this.radius;
        this.angularSpeed = this.perimeter / (this.duration * this.frame);
        this.scale = Math.random() * (4 - 0.5) + 0.5;

        this.fish = fish; 
    }

    /**
     * @method turn
     * Angle for the fish to turn
     */
    turn() {
        this.orientation += this.angularSpeed;
    }

    /**
     * @method update
     * Updates the fish position
     */
    update() {
        this.turn();

        this.position[0] = this.position[0] * Math.cos(this.orientation) - this.position[1] * Math.sin(this.orientation);
        this.position[2] = this.position[0] * Math.sin(this.orientation) - this.position[1] * Math.cos(this.orientation);
    }

    /**
     * @method display
     * Displays the animated fish
     */
    display() {
        this.update();

        this.scene.pushMatrix();
            this.scene.translate(this.center[0], this.center[1], this.center[2]);
            this.scene.rotate(-this.orientation, 0, 1, 0);
            this.scene.translate(5, 0, 0);
            this.scene.scale(this.scale, this.scale, this.scale);
            this.fish.display(1, 1, 1);
        this.scene.popMatrix();
    }

}