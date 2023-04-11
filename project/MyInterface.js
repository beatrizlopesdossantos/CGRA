import { CGFinterface, dat } from '../lib/CGF.js';

/**
* MyInterface
* @constructor
*/
export class MyInterface extends CGFinterface {
    constructor() {
        super();
    }

    init(application) {
        // call CGFinterface init
        super.init(application);
        // init GUI. For more information on the methods, check:
        // http://workshop.chromeexperiments.com/examples/gui
        this.gui = new dat.GUI();
        
        var obj = this;

        //Checkbox element in GUI
        this.gui.add(this.scene, 'displayAxis').name('Display Axis');
        this.gui.add(this.scene, 'displayMovingObject').name('Moving Object');
        this.gui.add(this.scene, 'displayCubeMap').name('Cube Map');
        this.gui.add(this.scene, 'displayCylinder').name('Cylinder');
        this.gui.add(this.scene, 'displaySphere').name('Sphere');
        this.gui.add(this.scene, 'displayFish').name('Fish');
        this.gui.add(this.scene, 'displaySeaFloor').name('Sea');
        this.gui.add(this.scene, 'displayWaterSurface').name('Water');
        this.gui.add(this.scene, 'displayRocks').name('Rocks');
        this.gui.add(this.scene, 'displayPillar').name('Pillars');
        this.gui.add(this.scene, 'displaySeaCubeMap').name('Sea ocean');
        this.gui.add(this.scene, 'displayWeeds').name('Weeds');
        this.gui.add(this.scene, 'displayAnimatedFish').name('Animated Fishes');


        this.gui.add(this.scene, 'scaleFactor', 0.5, 3.0).name('Scale Factor');
        this.gui.add(this.scene, 'speedFactor', 0.1, 3.0).name('Speed Factor').onChange(this.scene.update.bind(this.scene));
        this.gui.add(this.scene, 'selectedTexture', this.scene.textureIds).name('Cube Texture').onChange(this.scene.updateAppliedTexture.bind(this.scene));
       
        this.initKeys();
        
        return true;
    }

    initKeys() {
        // create reference from the scene to the GUI
        this.scene.gui=this;

        // disable the processKeyboard function
        this.processKeyboard=function(){};

        // create a named array to store which keys are being pressed
        this.activeKeys={};
    
    }

    processKeyDown(event) {
            // called when a key is pressed down
            // mark it as active in the array
            this.activeKeys[event.code]=true;
    };


    processKeyUp(event) {
            // called when a key is released, mark it as inactive in the array
            this.activeKeys[event.code]=false;
    };

    isKeyPressed(keyCode) {

        if( this.activeKeys[keyCode] === true && (keyCode == "keyL" || keyCode == "keyP")) {
            this.activeKeys[keyCode] = false;
            return true;
        }

        return this.activeKeys[keyCode] || false;
    }
}
