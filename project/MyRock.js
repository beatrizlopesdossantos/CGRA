import { CGFappearance, CGFobject } from '../lib/CGF.js';

/**
 * MyRock
 * @constructor
 * @param {CGFscene} scene - Reference to MyScene object
 * @param {integer} slices - Number of slices around Y axis
 * @param {integer} stacks - Number of stacks along Y axis, from the center to the poles (half of sphere)
 */
export class MyRock extends CGFobject {

    constructor(scene, slices, stacks) {
        super(scene);
        this.latDivs = stacks * 2;
        this.longDivs = slices;

        this.x;
        this.y;
        this.z;
        this.nestPos;
        this.P1;
        this.R1;
        this.R4;
        this.t = 0;
        this.rockOnNest = false;
        this.isFalling = false;
        this.scaleFactor = Math.random() * (0.2 - 0.1) + 0.1;
        this.position;

        this.material = new CGFappearance(scene);
        this.material.setAmbient(0.76, 0.76, 0.76, 1);
        this.material.setDiffuse(0.76, 0.76, 0.76, 1);
        this.material.setSpecular(0.76, 0.76, 0.76, 1);
        this.material.setShininess(10.0);

        this.initBuffers();
        this.generateRandPos();
    }

    /**
     * @method initBuffers
     * Initializes the sphere buffers
     */
    initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords = [];

        var phi = 0;
        var theta = 0;
        var phiInc = Math.PI / this.latDivs;
        var thetaInc = (2 * Math.PI) / this.longDivs;
        var latVertices = this.longDivs + 1;

        // build an all-around stack at a time, starting on "north pole" and proceeding "south"
        for (let latitude = 0; latitude <= this.latDivs; latitude++) {
        var sinPhi = Math.sin(phi);
        var cosPhi = Math.cos(phi);

        // in each stack, build all the slices around, starting on longitude 0
        theta = 0;
        for (let longitude = 0; longitude <= this.longDivs; longitude++) {
            //--- Vertices coordinates
            var x = Math.cos(theta) * sinPhi;
            var y = cosPhi;
            var z = Math.sin(-theta) * sinPhi;
            this.vertices.push(x + Math.random() * (0.2 - 0.07) + 0.07,
                            y + Math.random() * (0.1 - 0.07) + 0.07,
                            z + Math.random() * (0.2 - 0.07) + 0.07);

               //--- Indices
                if (latitude < this.latDivs && longitude < this.longDivs) {
                    var current = latitude * latVertices + longitude;
                    var next = current + latVertices;
                    // pushing two triangles using indices from this round (current, current+1)
                    // and the ones directly south (next, next+1)
                    // (i.e. one full round of slices ahead)

                    this.indices.push(current + 1, current, next);
                    this.indices.push(current + 1, next, next + 1);
                }

                //--- Normals
                // at each vertex, the direction of the normal is equal to 
                // the vector from the center of the sphere to the vertex.
                // in a sphere of radius equal to one, the vector length is one.
                // therefore, the value of the normal is equal to the position vectro
                this.normals.push(x, y, z);
                theta += thetaInc;

                //--- Texture Coordinates

                this.texCoords.push(longitude / this.longDivs, latitude / this.latDivs);
            }

            phi += phiInc;
        }


        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }


    /**
     * @method generateRandPos
     * Generates random positions
     */
    generateRandPos() {
        this.x = Math.floor(Math.random() * (19 + 19 + 1) - 19);
        this.y = 0.45;
        this.z = Math.floor(Math.random() * (19 + 19 + 1) - 19);

        //make sure they arent on the nest
        if (this.x < -3.50 && this.x > -10.5 && this.z < 0.5 && this.z > -3.5) {
            this.x = Math.floor(Math.random() * (19 + 2 + 1) - 2);
            this.z = Math.floor(Math.random() * (19) + 1);
        }

        this.position = [this.x, this.y, this.z];
        this.initialPos = [this.x, this.y, this.z];
    }

    /**
     * @method getPos
     * Returns the current position
     */
    getPos() {
        return this.position;
    }

    /**
     * @method setPosition
     * Sets a position received by parameter
     * @param {Array} position - Array of position
     */
    setPosition(position) {
        this.x = position[0];
        this.y = position[1];
        this.z = position[2];
        this.position = [this.x, this.y, this.z];
    }

    /**
     * @method setNestPos
     * Saves the position when the rock is on the nest so it doesn't change when reseting the scene
     * @param {Array} position - Array of position
     */
    setNestPos(position) {
        this.nestPos = position;
        this.initialPos = this.nestPos;
        this.setPosition(this.nestPos);
    }

    /**
     * @method OnNest
     * Indicates that the rock is on the nest
     */
    OnNest() {
        this.rockOnNest = true;
    }

    /**
     * @method falling
     * Indicates that the rock is falling
     */
    falling() {
        this.isFalling = true;
    }

    /**
     * @method throw
     * Initializes vectors to throw the rock
     */
    throw() {
        this.P1 = this.position;

        this.R1 = [this.nestPos[0] - this.P1[0], 0, this.nestPos[2] - this.P1[2]];

        this.R4 = [0, -1, 0];
    }

    /**
     * @method update
     * Updates the position of the rock using Hermite curves
     */
    update(movingFish) {
        if (this.y <= 0.25) {
            this.isFalling = false;
            this.position = [this.nestPos[0], this.nestPos[1], this.nestPos[2]];
            movingFish.rock = null;
            this.rockOnNest = true;
            return;
        }

        this.t += 0.02;

        this.x = (2 * Math.pow(this.t, 3) - 3 * Math.pow(this.t, 2) + 1) * this.P1[0] + (-2 * Math.pow(this.t, 3) + 3 * Math.pow(this.t, 2)) * this.nestPos[0] + (Math.pow(this.t, 3) - 2 * Math.pow(this.t, 2) + this.t) * this.R1[0] + (Math.pow(this.t, 3) - Math.pow(this.t, 2)) * this.R4[0];
        this.y = (2 * Math.pow(this.t, 3) - 3 * Math.pow(this.t, 2) + 1) * this.P1[1] + (-2 * Math.pow(this.t, 3) + 3 * Math.pow(this.t, 2)) * this.nestPos[1] + (Math.pow(this.t, 3) - 2 * Math.pow(this.t, 2) + this.t) * this.R1[1] + (Math.pow(this.t, 3) - Math.pow(this.t, 2)) * this.R4[1];
        this.z = (2 * Math.pow(this.t, 3) - 3 * Math.pow(this.t, 2) + 1) * this.P1[2] + (-2 * Math.pow(this.t, 3) + 3 * Math.pow(this.t, 2)) * this.nestPos[2] + (Math.pow(this.t, 3) - 2 * Math.pow(this.t, 2) + this.t) * this.R1[2] + (Math.pow(this.t, 3) - Math.pow(this.t, 2)) * this.R4[2];
    }

    /**
     * @method display
     * Displays the rock
     */
    display() {
        this.material.apply();
        super.display();
    }

    /**
     * @method reset
     * Resets the rock position
     */
    reset() {
        this.isFalling = false;

        if (this.rockOnNest) {
            this.setPosition(this.nestPos);
        }
        
        else this.setPosition(this.initialPos);
    }
}
