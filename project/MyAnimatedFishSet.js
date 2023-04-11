import { CGFobject, CGFtexture } from '../lib/CGF.js';
import { MyAnimatedFish } from './MyAnimatedFish.js';
import { MyFish } from './MyFish.js';

/**
 * MyAnimatedFishSet
 * @constructor
 * @param {CGFscene} scene - Reference to MyScene object
 * @param {CGFtexture} eyeTexture - Texture to be applied
 */
export class MyAnimatedFishSet extends CGFobject {

    constructor(scene, eyeTexture) {
        super(scene);
        
        this.fishes = [];

        this.eyeTexture = eyeTexture;
        this.bodyTexture2 = new CGFtexture(scene, 'images/fishScales2.jpg');
        this.bodyTexture3 = new CGFtexture(scene, 'images/fishScales3.jpg');
        this.bodyTexture4 = new CGFtexture(scene, 'images/fishScales4.jpg');

        this.textures = [this.bodyTexture2, this.bodyTexture3, this.bodyTexture4];

        this.initBuffers();
    }

    /**
     * @method initBuffers
     * Initializes the animated fishes buffers
     */
    initBuffers() {
        this.num = Math.floor(Math.random() * (8 - 4) + 4);
        for(var i = 0; i < this.num; i++) {
            this.x = Math.random() * (15 + 15) - 15;
            this.y = Math.random() * (5 - 1) + 1;
            this.z = Math.random() * (15 + 15) - 15;
            this.fishAux = new MyFish(this.scene, this.eyeTexture, this.textures[i % 3]);

            this.fish = new MyAnimatedFish(this.scene, this.x, this.y, this.z, this.fishAux);

            this.fishes.push(this.fish);
        }
    }

    /**
     * @method display
     * Displays all of the animated fishes
     */
    display() {
        for(var i = 0; i < this.num; i++) {
            this.fishes[i].display();
        }
    }
}