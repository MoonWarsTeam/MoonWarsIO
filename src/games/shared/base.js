import { ExtendedObject3D, Scene3D } from "@enable3d/phaser-extension";
import Phaser from "phaser";
import { clamp } from "./utils";

export default class BaseGame extends Scene3D {
    constructor() {
        super({ key: 'BaseGame' })
        this.inputAxis = {x:0, y:0, z:0}; // y is the vertical axis
        this.keys = {
            W: Phaser.Input.Keyboard.KeyCodes.W,
            A: Phaser.Input.Keyboard.KeyCodes.A,
            S: Phaser.Input.Keyboard.KeyCodes.S,
            D: Phaser.Input.Keyboard.KeyCodes.D,
        };
        this.zoom = {x:0, y:5, z:10};
    }

    init() {
        this.accessThirdDimension();
        // this.third.physics.debug.enable()
        console.log('base scene init done')

        this.input.keyboard.on('keydown', this.handleKeyDown, this);
        this.input.keyboard.on('keyup', this.handleKeyUp, this);
        this.input.on('wheel', this.handleMouseWheel, this)
        this.characterSetup()
    }

    characterSetup() {
        this.player = this.third.physics.add.box()

        // create shadows
        this.player.traverse(child => {
            if (child.isMesh) {
              child.castShadow = child.receiveShadow = true
            }
          })
    }

    handleKeyDown(event) {
        switch(event.keyCode) {
            case this.keys.W:
                this.inputAxis.z = -1;
                break;
            case this.keys.S:
                this.inputAxis.z = 1;
                break;
            case this.keys.A:
                this.inputAxis.x = -1;
                break;
            case this.keys.D:
                this.inputAxis.x = 1;
                break;
            default:
                break;
        }
    }

    handleKeyUp(event) {
        switch(event.keyCode) {
            case this.keys.W:
                this.inputAxis.z = 0;
                break;
            case this.keys.S:
                this.inputAxis.z = 0;
                break;
            case this.keys.A:
                this.inputAxis.x = 0;
                break;
            case this.keys.D:
                this.inputAxis.x = 0;
                break;
            default:
                break;
        }
    }

    handleMouseWheel(pointer, gameObjects, deltaX, deltaY, deltaZ) {
        //let mouseWheelDirection = (deltaY < 0) ? 'up' : 'down';
        let deltaYAmount = deltaY / 963;
        let zoomAmount = this.zoom.y + (deltaYAmount * this.zoom.y);

        this.zoom.y = clamp(1.5, 22, zoomAmount);
        this.zoom.z = 4.8407 * Math.log(1.239 * this.zoom.y);
    }

    create() {      
        this.third.warpSpeed('-orbitControls')
    }

    update() {
        // update movement
        if (this.player && this.player.body) {
            const speed = 4
            const rotation = this.player.getWorldDirection(this.player.rotation.toVector3())
            const theta = Math.atan2(rotation.x, rotation.z)

            const x = Math.cos(theta) * (speed * this.inputAxis.x),
              y = this.player.body.velocity.y,
              z = Math.cos(theta) * (speed * this.inputAxis.z)

            this.player.body.setVelocity(x, y, z)
        }

        // update camera
        const pos = this.player.position.clone()
        this.third.camera.position.set(pos.x, pos.y + this.zoom.y, pos.z + this.zoom.z)
        this.third.camera.lookAt(pos.x, pos.y, pos.z)

    }
}

// y = -0.08034x^2 + 2.522x - 0.6026

//close
//this.third.camera.position.set(pos.x, pos.y + 1.5, pos.z + 3)

// middle
// this.third.camera.position.set(pos.x, pos.y + 5, pos.z + 10)

// far
//this.third.camera.position.set(pos.x, pos.y + 22, pos.z + 16)