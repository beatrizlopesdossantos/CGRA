import { CGFappearance, CGFobject, CGFtexture } from '../lib/CGF.js';

/**
 * MyCylinder
 * @constructor
 * @param {CGFscene} scene - Reference to MyScene object
 * @param {integer} slices - Number of divisions around the Y axis
 * @param {integer} stacks - Number of divisions along the Y axis
 * @param {string} texture - Path for the texture
*/
export class MyCylinder extends CGFobject {

    constructor(scene, slices, stacks, texture) {
        super(scene);

        this.slices = slices;
        this.stacks = stacks;

        this.texture = new CGFtexture(scene, texture);

        this.material = new CGFappearance(scene);
        this.material.setAmbient(0.0, 0.0, 0.0, 0.0);
        this.material.setDiffuse(0.0, 0.0, 0.0, 0.0);
        this.material.setSpecular(0.0, 0.0, 0.0, 0.0);
        this.material.setEmission(1.0, 1.0, 1.0, 1.0);
        this.material.setTextureWrap('REPEAT', 'REPEAT');

        this.initBuffers();
    }

    /**
     * @method initBuffers
     * Initializes the cylinder buffers
     */
    initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords = [];

        var ang = 0;
        var alphaAng = 2*Math.PI/this.slices;

        for(var i = 0; i < this.slices; i++){

            this.vertices.push(Math.cos(ang), 0, -Math.sin(ang));
            this.indices.push(i, i+1, this.slices + i + 1);
            this.normals.push(Math.cos(ang), 0, -Math.sin(ang));
            this.texCoords.push(i/this.slices, 1);
            ang+=alphaAng;
        }

        this.vertices.push(Math.cos(ang), 0, -Math.sin(ang));
        this.indices.push(Math.cos(ang), 0, -Math.sin(ang));
        this.texCoords.push(1, 1);

        for(var i = this.slices + 1; i < this.slices*2 + 1; i++){

            this.vertices.push(Math.cos(ang), 1, -Math.sin(ang));
            this.indices.push(i, (i+1) % (this.slices + 1), i + 1);
            this.normals.push(Math.cos(ang), 0, -Math.sin(ang));
            this.texCoords.push(((i-1) % this.slices) / (this.slices + 1), 0);
            ang+=alphaAng;
        }

        
        this.vertices.push(Math.cos(ang), 1, -Math.sin(ang));
        this.indices.push(Math.cos(ang), 0, -Math.sin(ang));
        this.texCoords.push(1, 0);


        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
    
    /**
     * @method updateBuffers 
     * Called when user interacts with GUI to change object's complexity.
     * @param {integer} complexity - Changes number of slices
     */
    updateBuffers(complexity){
        this.slices = 3 + Math.round(9 * complexity); //complexity varies 0-1, so slices varies 3-12

        // reinitialize buffers
        this.initBuffers();
        this.initNormalVizBuffers();
    }

    /**
     * @method display
     * Displays the cylinder
     */
    display() {
        this.material.setTexture(this.texture);
        this.material.apply();
        super.display();
    }
}