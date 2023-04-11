import { CGFobject } from '../lib/CGF.js';

/**
 * MyPyramid
 * @constructor
 * @param {CGFscene} scene - Reference to MyScene object
 * @param {integer} slices - Number of divisions around the Y axis
 * @param {integer} stacks - Number of divisions along the Y axis
*/
export class MyPyramid extends CGFobject {

    constructor(scene, slices, stacks) {
        super(scene);

        this.slices = slices;
        this.stacks = stacks;

        this.initBuffers();
    }

    /**
     * @method initBuffers
     * Initializes the pyramid buffers
     */
    initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];

        var ang = 0;
        var alphaAng = 2*Math.PI/this.slices;

        for(var i = 0; i < this.slices; i++){
            // All vertices have to be declared for a given face
            // even if they are shared with others, as the normals 
            // in each face will be different

            var sa=Math.sin(ang);
            var saa=Math.sin(ang+alphaAng);
            var ca=Math.cos(ang);
            var caa=Math.cos(ang+alphaAng);
            
            this.vertices.push(0,1,0);
            this.vertices.push(ca, 0, -sa);
            this.vertices.push(caa, 0, -saa);

            // triangle normal computed by cross product of two edges
            var normal= [
                saa-sa,
                ca*saa-sa*caa,
                caa-ca
            ];

            // normalization
            var nsize=Math.sqrt(
                normal[0]*normal[0]+
                normal[1]*normal[1]+
                normal[2]*normal[2]
                );
            normal[0]/=nsize;
            normal[1]/=nsize;
            normal[2]/=nsize;

            // push normal once for each vertex of this triangle
            this.normals.push(...normal);
            this.normals.push(...normal);
            this.normals.push(...normal);

            this.indices.push(3*i, (3*i+1) , (3*i+2) );
            ang+=alphaAng;
        }

        //base
        ang = 0;
        
        for(var i = 0; i < this.slices*2; i++) {

            var saa=Math.sin(ang+alphaAng);
            var caa=Math.cos(ang+alphaAng);
            var saaa=Math.sin(ang+alphaAng*2);
            var caaa=Math.cos(ang+alphaAng*2);

            this.vertices.push(0, 0, 0);
            this.vertices.push(caa, 0, -saa);
            this.vertices.push(caaa, 0, -saaa);

            this.normals.push(0,-1,0);
            this.normals.push(0,-1,0);
            this.normals.push(0,-1,0);

            this.indices.push(3 * i + 12, (3 * i + 2) + 12 , (3 * i + 1) + 12);
            
            ang+=alphaAng;
        }

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }

    /**
     * @method updateBuffers
     * Called when user interacts with GUI to change object's complexity.
     * @param {integer} complexity - changes number of slices
     */
    updateBuffers(complexity){
        this.slices = 3 + Math.round(9 * complexity); //complexity varies 0-1, so slices varies 3-12

        // reinitialize buffers
        this.initBuffers();
        this.initNormalVizBuffers();
    }

    /**
     * @method display
     * Displays the pyramid
     */    
    display() {
        var objectRotate = [
            1, 0, 0, 0,
            0, Math.cos(270 * Math.PI / 180), -Math.sin(270 * Math.PI / 180), 0,
            0, Math.sin(270 * Math.PI / 180), Math.cos(270 * Math.PI / 180), 0,
            0, 0, 0, 1
        ];

        var objectTranslate = [
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            0, 0, -0.5, 1
        ];
        
        this.scene.multMatrix(objectTranslate);
        this.scene.multMatrix(objectRotate);
        super.display();
    }
}


