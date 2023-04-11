import { CGFscene, CGFcamera, CGFaxis, CGFappearance, CGFtexture} from "../lib/CGF.js";
import { MySphere } from "./MySphere.js";
import { MyPyramid } from "./MyPyramid.js";
import { MyMovingObject } from "./MyMovingObject.js";
import { MyCubeMap } from "./MyCubeMap.js";
import { MyCylinder } from "./MyCylinder.js";
import { MyFish } from "./MyFish.js";
import { MySeaFloor } from "./MySeaFloor.js";
import { MyWaterSurface } from "./MyWaterSurface.js";
import { MyPillar } from "./MyPillar.js";
import { MyMovingFish } from "./MyMovingFish.js";
import { MyRockSet } from "./MyRockSet.js";
import { MyWeedSet } from "./MyWeedSet.js";
import { MyAnimatedFishSet } from "./MyAnimatedFishSet.js";
import { CGFcamera2 } from "./CGFcamera2.js";

/**
* MyScene
* @constructor
*/
export class MyScene extends CGFscene {

    constructor() {
        super();
    }
    
    init(application) {
        super.init(application);
        this.initCameras();
        this.initLights();

        //Background color
        this.gl.clearColor(0.0, 0.0, 0.0, 1.0);

        this.gl.clearDepth(100.0);
        this.gl.enable(this.gl.DEPTH_TEST);
        this.gl.enable(this.gl.CULL_FACE);
        this.gl.depthFunc(this.gl.LEQUAL);

        this.setUpdatePeriod(50);
        
        this.enableTextures(true);

        //textures
        this.earthTexture = new CGFtexture(this, 'images/earth.jpg');
        this.eyeTexture = new CGFtexture(this, 'images/fishEye.jpg');
        this.bodyTexture = new CGFtexture(this, 'images/fishScales.jpg');

        //demo
        this.textureDemoTop = new CGFtexture(this, 'images/demo_cubemap/top.png');
        this.textureDemoFront = new CGFtexture(this, 'images/demo_cubemap/front.png');
        this.textureDemoRight = new CGFtexture(this, 'images/demo_cubemap/right.png');
        this.textureDemoBack = new CGFtexture(this, 'images/demo_cubemap/back.png');
        this.textureDemoLeft = new CGFtexture(this, 'images/demo_cubemap/left.png');
        this.textureDemoDown = new CGFtexture(this, 'images/demo_cubemap/bottom.png');

        //coords
        this.textureCoordsTop = new CGFtexture(this, 'images/test_cubemap/py.png');
        this.textureCoordsFront = new CGFtexture(this, 'images/test_cubemap/pz.png');
        this.textureCoordsRight = new CGFtexture(this, 'images/test_cubemap/px.png');
        this.textureCoordsBack = new CGFtexture(this, 'images/test_cubemap/nz.png');
        this.textureCoordsLeft = new CGFtexture(this, 'images/test_cubemap/nx.png');
        this.textureCoordsDown = new CGFtexture(this, 'images/test_cubemap/ny.png');

        //desert
        this.textureDesertTop = new CGFtexture(this, 'images/our_cubemap/py.png');
        this.textureDesertFront = new CGFtexture(this, 'images/our_cubemap/pz.png');
        this.textureDesertRight = new CGFtexture(this, 'images/our_cubemap/px.png');
        this.textureDesertBack = new CGFtexture(this, 'images/our_cubemap/nz.png');
        this.textureDesertLeft = new CGFtexture(this, 'images/our_cubemap/nx.png');
        this.textureDesertDown = new CGFtexture(this, 'images/our_cubemap/ny.png');

        //ocean
        this.textureOceanTop = new CGFtexture(this, 'images/underwaterMine_cubemap/py.png');
        this.textureOceanFront = new CGFtexture(this, 'images/underwaterMine_cubemap/pz.png');
        this.textureOceanRight = new CGFtexture(this, 'images/underwaterMine_cubemap/px.png');
        this.textureOceanBack = new CGFtexture(this, 'images/underwaterMine_cubemap/nz.png');
        this.textureOceanLeft = new CGFtexture(this, 'images/underwaterMine_cubemap/nx.png');
        this.textureOceanDown = new CGFtexture(this, 'images/underwaterMine_cubemap/ny.png');

        this.textures = [
            [this.textureDemoTop, this.textureDemoFront, this.textureDemoRight, this.textureDemoBack, this.textureDemoLeft, this.textureDemoDown],
            [this.textureCoordsTop, this.textureCoordsFront, this.textureCoordsRight, this.textureCoordsBack, this.textureCoordsLeft, this.textureCoordsDown],
            [this.textureDesertTop, this.textureDesertFront, this.textureDesertRight, this.textureDesertBack, this.textureDesertLeft, this.textureDesertDown]
        ];

        //Initialize scene objects
        this.axis = new CGFaxis(this);

        //Parte A
        this.pyramid = new MyPyramid(this, 3, 2);
        this.movingObject = new MyMovingObject(this, this.pyramid, [0, 0, 0]);
        this.cubeMap = new MyCubeMap(this, this.textureDesertTop, this.textureDesertFront, this.textureDesertRight, this.textureDesertBack, this.textureDesertLeft, this.textureDesertDown);
        this.cylinder = new MyCylinder(this, 6, 2, 'images/earth.jpg');
        this.sphere = new MySphere(this, 16, 8, this.earthTexture);

        //Part B
        this.fish = new MyFish(this, this.eyeTexture, this.bodyTexture);
        this.seaFloor = new MySeaFloor(this,'images/sandNest.png', 'images/sandMap.png');
        this.ocean = new MyCubeMap(this, this.textureOceanTop, this.textureOceanFront, this.textureOceanRight, this.textureOceanBack, this.textureOceanLeft, this.textureOceanDown);
        this.waterSurface = new MyWaterSurface(this);
        this.rocks = new MyRockSet(this);
        this.pillar = new MyPillar(this, 40, 2, 6, 'images/pillar.jpg');
        this.movingFish = new MyMovingFish(this, this.fish);
        this.weeds = new MyWeedSet(this);
        this.animatedFish = new MyAnimatedFishSet(this, this.eyeTexture);

        this.scaleFactor = 1;
        this.speedFactor = 1;
        this.selectedTexture = 2; 

        this.defaultAppearance = new CGFappearance(this);
		this.defaultAppearance.setAmbient(0.2, 0.4, 0.8, 1.0);
        this.defaultAppearance.setDiffuse(0.2, 0.4, 0.8, 1.0);
        this.defaultAppearance.setSpecular(0.2, 0.4, 0.8, 1.0);
        this.defaultAppearance.setEmission(0,0,0,1);
		this.defaultAppearance.setShininess(120);

		this.sphereAppearance = new CGFappearance(this);
		this.sphereAppearance.setAmbient(0.3, 0.3, 0.3, 1);
		this.sphereAppearance.setDiffuse(0.7, 0.7, 0.7, 1);
		this.sphereAppearance.setSpecular(0.0, 0.0, 0.0, 1);
		this.sphereAppearance.setShininess(120);

        //Objects connected to MyInterface
        this.displayAxis = false;

        this.displayMovingObject = false;
        this.displayCubeMap = false;
        this.displayCylinder = false;
        this.displaySphere = false;

        this.displayFish = true;
        this.displaySeaFloor = true;
        this.displayWaterSurface = true;
        this.displayRocks = true;
        this.displayPillar = true;
        this.displaySeaCubeMap = true;
        this.displayWeeds = true;
        this.displayAnimatedFish = true;

        this.textureIds = { 'Landscape': 0, 'Coordinates': 1, 'Desert': 2 };
    }

    initLights() {
        this.lights[0].setPosition(15, 2, 5, 1);
        this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
        this.lights[0].enable();
        this.lights[0].update();
    }

    initCameras() {
        this.camera = new CGFcamera2(1.8, 0.1, 500, vec3.fromValues(2, 2, 2), vec3.fromValues(0, 2, 0));
    }

    setDefaultAppearance() {
        this.setAmbient(0.2, 0.4, 0.8, 1.0);
        this.setDiffuse(0.2, 0.4, 0.8, 1.0);
        this.setSpecular(0.2, 0.4, 0.8, 1.0);
        this.setEmission(0,0,0,1);
        this.setShininess(10.0);
    }

    updateAppliedTexture() {
        this.cubeMap.updateTexture(this.textures[this.selectedTexture]);
    }

    // called periodically (as per setUpdatePeriod() in init())
    update(t){
        this.checkKeys();
        this.movingObject.update(this.speedFactor);
        this.movingFish.update(this.speedFactor);
        //console.log(this.movingFish.Rock().getPos());
        this.waterSurface.update(t);
        if (this.movingFish.rock != null) {
            if (this.movingFish.rock.isFalling) {
                this.movingFish.rock.update(this.movingFish);
            }
            else {
                this.movingFish.Rock().setPosition([this.movingFish.getPosition()[0], this.movingFish.getPosition()[1] + 0.5, this.movingFish.getPosition()[2]]);
            }
        }
    }

    checkKeys()  {
    
        // Check for key codes e.g. in https://keycode.info/
        if (this.gui.isKeyPressed("KeyW")) {
          if (this.displayMovingObject) this.movingObject.accelerate(0.01);
          if (this.displayFish) this.movingFish.accelerate(0.01);
        }
    
        if (this.gui.isKeyPressed("KeyS")) {
          if (this.displayMovingObject) this.movingObject.accelerate(-0.01);
          if (this.displayFish) this.movingFish.accelerate(-0.01);
        }
    
        if (this.gui.isKeyPressed("KeyA")) {
            if (this.displayMovingObject) this.movingObject.turn(10 * Math.PI / 180);
            if (this.displayFish) this.movingFish.turn(10 * Math.PI / 180);
        }

        if (this.gui.isKeyPressed("KeyD")) {
            if (this.displayMovingObject) this.movingObject.turn(-10 * Math.PI / 180);
            if (this.displayFish) this.movingFish.turn(-10 * Math.PI / 180);
        }

        if (this.gui.isKeyPressed("KeyP")) {
            if (this.displayFish) this.movingFish.level(0.05);
        }

        if (this.gui.isKeyPressed("KeyL")) {
            if (this.displayFish) this.movingFish.level(-0.05);
        }

        if (this.gui.isKeyPressed("KeyC")) {
            if (this.displayFish) {
                if (this.movingFish.rock == null) {
                    this.rock = this.rocks.nearRock(this.movingFish.getPosition());
                    if ((this.movingFish.getPosition()[1] == 0.90) && (this.rock != null)) {
                        this.movingFish.pickRock(this.rock);
                    }
                }
                else {
                    if ((this.movingFish.getPosition()[1] == 0.90) && (this.rocks.nearNest(this.movingFish.getPosition()))) {
                        this.movingFish.Rock().OnNest();
                        this.movingFish.Rock().setNestPos([this.movingFish.getPosition()[0], 0.25, this.movingFish.getPosition()[2]]); 
                        this.movingFish.rock = null;
                    }
                }
            }
        }

        if (this.gui.isKeyPressed("KeyT")) {
            if ((this.movingFish.getPosition()[1] == 5) && this.movingFish.rock != null && this.rocks.canThrow(this.movingFish.getPosition())) {
                this.movingFish.Rock().falling();
                this.movingFish.Rock().throw(); 
            }

        }

        if (this.gui.isKeyPressed("KeyR")) {
            if (this.displayMovingObject) this.movingObject.reset([0, 0, 0]);
            if (this.displayFish) {
                this.movingFish.reset();
                this.rocks.reset();
            }
        }
    }

    display() {
        // ---- BEGIN Background, camera and axis setup
        // Clear image and depth buffer everytime we update the scene
        this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
        // Initialize Model-View matrix as identity (no transformation
        this.updateProjectionMatrix();
        this.loadIdentity();
        // Apply transformations corresponding to the camera position relative to the origin
        this.applyViewMatrix();
        this.camera.position[0];
        
        this.defaultAppearance.apply();
        // Draw axis
        if (this.displayAxis)
            this.axis.display();

        this.sphereAppearance.apply();
        // ---- BEGIN Primitive drawing section
        
        //objects
        if (this.displayMovingObject) {
            this.pushMatrix();
            this.scale(this.scaleFactor,this.scaleFactor,this.scaleFactor);
            this.movingObject.display();
            this.popMatrix();
        }

        if (this.displayCylinder) this.cylinder.display();

        if (this.displaySphere) this.sphere.display();

        //backgrounds
        if (this.displayCubeMap)  {
            this.cubeMap.display();
        }

        //fish scene
        if (this.displayFish) {
            this.movingFish.display();
        }

        if (this.displaySeaFloor) {
            this.seaFloor.display();  
        }

        if (this.displayWaterSurface) {
            this.ocean.display();
            this.waterSurface.display();
        }

        if (this.displayRocks) {
            this.rocks.display();
        }

        if (this.displayPillar) {
            this.pillar.display();
        }

        if (this.displayWeeds) {
            this.weeds.display();
        }
        
        if (this.displayAnimatedFish) {
            this.animatedFish.display();
        }
        // ---- END Primitive drawing section
    }

}
