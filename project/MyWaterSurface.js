import { CGFobject, CGFappearance, CGFtexture, CGFshader } from '../lib/CGF.js';
import { MyPlane } from './MyPlane.js';

/**
 * MyWaterSurface
 * @constructor
 * @param {CGFscene} scene - Reference to MyScene object
 */
export class MyWaterSurface extends CGFobject {

    constructor(scene) {
        super(scene);

        this.surface = new MyPlane(scene, 20);
     
        this.texture1 = new CGFtexture(scene, 'images/distortionmap.png');

        this.material = new CGFappearance(scene);
        this.material.loadTexture('images/pier.jpg');
        this.material.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');

        this.initShaders(scene);
	}

    /**
     * @method initShaders
     * Initializes the water surface shaders
     * @param {CGFshader} scene - Reference to scene shader
     */      
    initShaders(scene) {
        this.waterShader = new CGFshader(scene.gl, "shaders/water.vert", "shaders/water.frag");
		this.waterShader.setUniformsValues({ waterMap: 1 });
		this.waterShader.setUniformsValues({ waterTimeFactor: 2 });
    }

    /**
     * @method update
     * Called periodically (as per setUpdatePeriod() in init() in MyScene)
     * @param {integer} t - Time
     */    
    update(t) {
        this.waterShader.setUniformsValues({ waterTimeFactor: t / 100 % 100 });
    }

    /**
     * @method display
     * Displays the water surface
     */        
    display() {

        var waterRotate = [
            1, 0, 0, 0,
            0, Math.cos(-90 * Math.PI / 180), -Math.sin(-90 * Math.PI / 180), 0,
            0, Math.sin(-90 * Math.PI / 180), Math.cos(-90 * Math.PI / 180), 0,
            0, 0, 0, 1
        ];

        var waterTranslate = [
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            0, 10, 0, 1
        ];

        var waterScale= [
            50,0,0,0,
            0,50,0,0,
            0,0,50,0,           
            0,0,0,1            
        ];
    
        this.scene.setActiveShader(this.waterShader);
        this.texture1.bind(1);

        this.scene.pushMatrix();
            this.scene.multMatrix(waterTranslate); 
            this.scene.multMatrix(waterRotate);        
            this.scene.multMatrix(waterScale);
            this.material.apply();
            this.surface.display();
        this.scene.popMatrix();

        this.scene.setActiveShader(this.scene.defaultShader);
    }
}