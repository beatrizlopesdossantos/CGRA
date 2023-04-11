import {CGFappearance, CGFobject, CGFtexture} from '../lib/CGF.js';
import { MyQuad } from './MyQuad.js';
/**
 * MyUnitCubeQuad
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyUnitCubeQuad extends CGFobject {
	constructor(scene, textureTop, textureFront, textureRight, textureBack, textureLeft, textureDown) {
		super(scene);
		this.initBuffers();
        this.quad = new MyQuad(scene);
        if (textureTop != undefined) 
            this.textureTop = new CGFtexture(scene, textureTop);
        if (textureFront != undefined) 
            this.textureFront = new CGFtexture(scene, textureFront);
        if (textureRight != undefined) 
            this.textureRight = new CGFtexture(scene, textureRight);
        if (textureBack != undefined) 
            this.textureBack = new CGFtexture(scene, textureBack);
        if (textureLeft != undefined) 
            this.textureLeft = new CGFtexture(scene, textureLeft);
        if (textureDown != undefined) 
            this.textureDown = new CGFtexture(scene, textureDown);
        
        this.material = new CGFappearance(scene);
        this.material.setAmbient(0.1, 0.1, 0.1, 1);
        this.material.setDiffuse(0.9, 0.9, 0.9, 1);
        this.material.setSpecular(0.1, 0.1, 0.1, 1);
        this.material.setShininess(10.0);
        this.material.setTextureWrap('REPEAT', 'REPEAT');
	}
	
	initBuffers() {
		this.vertices = [
			-0.5, 0.5, 0,	    //0
			-0.5, -0.5, 0,	    //1
			0.5, -0.5, 0,		//2
			0.5, 0.5, 0,		//3
		];

		//Counter-clockwise reference of vertices
		this.indices = [
			0, 1, 2,
			2, 3, 0,
		];

		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}

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
        
        // Face frontal
        this.scene.pushMatrix();
        this.scene.multMatrix(quad1Translate);
        this.material.setTexture(this.textureFront);
        this.material.apply();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.quad.display();
        this.scene.popMatrix();
        
        // Face topo
        this.scene.pushMatrix();
        this.scene.multMatrix(quad2Translate);
        this.scene.multMatrix(quad2Rotate);
        this.material.setTexture(this.textureTop);
        this.material.apply();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.quad.display();
        this.scene.popMatrix();

        // Face trás
        this.scene.pushMatrix();
        this.scene.multMatrix(quad3Translate);
        this.scene.multMatrix(quad3Rotate);
        this.material.setTexture(this.textureBack);
        this.material.apply();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.quad.display();
        this.scene.popMatrix();

        // Face baixo
        this.scene.pushMatrix();
        this.scene.multMatrix(quad4Translate);
        this.scene.multMatrix(quad4Rotate);
        this.material.setTexture(this.textureDown);
        this.material.apply();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.quad.display();
        this.scene.popMatrix();

        // Face direita
        this.scene.pushMatrix();
        this.scene.multMatrix(quad5Translate);
        this.scene.multMatrix(quad5Rotate);
        this.material.setTexture(this.textureRight);
        this.material.apply();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.quad.display();
        this.scene.popMatrix();
        
        // Face esquerda
        this.scene.pushMatrix();
        this.scene.multMatrix(quad6Translate);
        this.scene.multMatrix(quad6Rotate);
        this.material.setTexture(this.textureLeft);
        this.material.apply();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.quad.display();
        this.scene.popMatrix();        
    }
}
