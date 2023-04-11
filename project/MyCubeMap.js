import { CGFappearance, CGFobject, CGFtexture } from '../lib/CGF.js';
import { MyQuad } from './MyQuad.js';

/**
 * MyCubeMap
 * @constructor
 * @param {CGFscene} scene - Reference to MyScene object
 * @param {CGFtexture} textureTop - Texture for the top texture
 * @param {CGFtexture} textureFront - Texture for the front texture
 * @param {CGFtexture} textureRight - Texture for the right texture
 * @param {CGFtexture} textureBack - Texture for the back texture
 * @param {CGFtexture} textureLeft - Texture for the left texture
 * @param {CGFtexture} textureDown - Texture for the down texture
 */
export class MyCubeMap extends CGFobject {
    
	constructor(scene, textureTop, textureFront, textureRight, textureBack, textureLeft, textureDown) {
		super(scene);

        this.quad = new MyQuad(scene);

        this.textureTop = textureTop;
        this.textureFront = textureFront;
        this.textureRight = textureRight;
        this.textureBack = textureBack;
        this.textureLeft = textureLeft;
        this.textureDown =  textureDown;
        
        this.material = new CGFappearance(scene);
        this.material.setAmbient(0.0, 0.0, 0.0, 0.0);
        this.material.setDiffuse(0.0, 0.0, 0.0, 0.0);
        this.material.setSpecular(0.0, 0.0, 0.0, 0.0);
        this.material.setEmission(1.0, 1.0, 1.0, 1.0);
	}
	
    /**
     * @method updateTexture
     * Checks if an object is near the nest
     * @param {Array} textures - Array of paths for the textures
     */
    updateTexture(textures) {
        this.textureTop = textures[0];
        this.textureFront = textures[1];
        this.textureRight = textures[2];
        this.textureBack = textures[3];
        this.textureLeft = textures[4];
        this.textureDown = textures[5];
        this.display();
    }

    /**
     * @method display
     * Displays the cube map
     */
    display() {
        var quad1Translate = [
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            0, 0, 0.5, 1,
        ];

        var quad2Rotate = [
            1, 0, 0, 0,
            0, Math.cos(90 * Math.PI / 180), -Math.sin(90 * Math.PI / 180), 0,
            0, Math.sin(90 * Math.PI / 180), Math.cos(90 * Math.PI / 180), 0,
            0, 0, 0, 1
        ];

        var quad2Translate = [
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            0, 0.5, 0, 1,
        ];

        var quad3Rotate = [
            Math.cos(180 * Math.PI / 180), 0, Math.sin(180 * Math.PI / 180), 0,
            0, 1, 0, 0,
            -Math.sin(180 * Math.PI / 180), 0, Math.cos(180 * Math.PI / 180), 0,
            0, 0, 0, 1
        ];

        var quad3Translate = [
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            0, 0, -0.5, 1,
        ];

        var quad4Rotate = [
            1, 0, 0, 0,
            0, Math.cos(-90 * Math.PI / 180), -Math.sin(-90 * Math.PI / 180), 0,
            0, Math.sin(-90 * Math.PI / 180), Math.cos(-90 * Math.PI / 180), 0,
            0, 0, 0, 1
        ];

        var quad4Translate = [
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            0, -0.5, 0, 1,
        ];

        var quad5Rotate = [
            Math.cos(-90 * Math.PI / 180), 0, Math.sin(-90 * Math.PI / 180), 0,
            0, 1, 0, 0,
            -Math.sin(-90 * Math.PI / 180), 0, Math.cos(-90 * Math.PI / 180), 0,
            0, 0, 0, 1
        ];

        var quad5Translate = [
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            0.5, 0, 0, 1,
        ];

        var quad6Rotate = [
            Math.cos(90 * Math.PI / 180), 0, Math.sin(90 * Math.PI / 180), 0,
            0, 1, 0, 0,
            -Math.sin(90 * Math.PI / 180), 0, Math.cos(90 * Math.PI / 180), 0,
            0, 0, 0, 1
        ];

        var quad6Translate = [
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            -0.5, 0, 0, 1,
        ];

        this.scene.pushMatrix();
        this.scene.translate(this.scene.camera.position[0], this.scene.camera.position[1], this.scene.camera.position[2])
        this.scene.scale(500, 500, 500);

        //Front side
        this.scene.pushMatrix();
            this.scene.multMatrix(quad1Translate);
            this.material.setTexture(this.textureFront);
            this.material.apply();
            this.quad.display();
        this.scene.popMatrix();
        
        //Top side
        this.scene.pushMatrix();
            this.scene.multMatrix(quad2Translate);
            this.scene.multMatrix(quad2Rotate);
            this.material.setTexture(this.textureTop);
            this.material.apply();
            this.quad.display();
        this.scene.popMatrix();

        //Back side
        this.scene.pushMatrix();
            this.scene.multMatrix(quad3Translate);
            this.scene.multMatrix(quad3Rotate);
            this.material.setTexture(this.textureBack);
            this.material.apply();
            this.quad.display();
        this.scene.popMatrix();

        //Down side
        this.scene.pushMatrix();
            this.scene.multMatrix(quad4Translate);
            this.scene.multMatrix(quad4Rotate);
            this.material.setTexture(this.textureDown);
            this.material.apply();
            this.quad.display();
        this.scene.popMatrix();

        //Right side
        this.scene.pushMatrix();
            this.scene.multMatrix(quad5Translate);
            this.scene.multMatrix(quad5Rotate);
            this.material.setTexture(this.textureRight);
            this.material.apply();
            this.quad.display();
        this.scene.popMatrix();
        
        //Left side
        this.scene.pushMatrix();
            this.scene.multMatrix(quad6Translate);
            this.scene.multMatrix(quad6Rotate);
            this.material.setTexture(this.textureLeft);
            this.material.apply();
            this.quad.display();
            this.scene.popMatrix(); 
        this.scene.popMatrix();
    }
}
