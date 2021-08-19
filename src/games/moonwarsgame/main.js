import BaseGame from "../shared/base";
import { Scene3D, THREE } from "@enable3d/phaser-extension";
import { createSoftVolume } from "../shared/utils";
import { Position, Velocity, Rotation } from "../shared/components/Movement";
import { Controller, Player } from "../shared/components/Player";
import { Sprite } from "../shared/components/Graphics";
import { createSpriteSystem } from "../shared/systems/MeshSystem";
import { createMovementSystem } from "../shared/systems/MovementSystem";
import {createWorld, addEntity, addComponent } from 'bitecs';
import { createInputSystem } from "../shared/systems/InputSystem";
import { createControllerSystem } from "../shared/systems/ControllerSystem";
import { clamp } from '../shared/utils';





export default class MoonWarsGame extends Scene3D {
    constructor() {
        super({ key: 'MoonWarsGame' })
        this.spriteSystem = null;
        this.movementSystem = null;
        this.inputSystem = null;
        this.controllerSystem = null;
        this.cursors = null;
        this.world = null;
        
    }
    
    preload() {       
        this.load.image('safemoonlogo', 'assets/dogecoin-logo.png');
    }


    init() {
        this.accessThirdDimension({softBodies: true});
        this.third.physics.debug.enable();
        this.cursors = this.input.keyboard.createCursorKeys();
    }

    create() {
        this.third.warpSpeed('-orbitControls')
        // initialize the world
        this.world = createWorld();

        // create the tank entity
        const tank = addEntity(this.world)

        // make component and set default values
        addComponent(this.world, Position, tank);
        Position.x[tank] = 300;
        Position.y[tank] = 300;

        addComponent(this.world, Velocity, tank);
        addComponent(this.world, Rotation, tank);
        addComponent(this.world, Sprite, tank);
        Sprite.texture[tank] = 0;

        addComponent(this.world, Player, tank);
        Player.id[tank] = 0;

        const { width, height } = this.scale;
        console.log(width, height);
        for(let i = 0; i < 10; i++) {
            const enemy = addEntity(this.world);
            addComponent(this.world, Position, enemy);
            Position.x[enemy] = clamp(0, width, Math.random() * width);
            Position.y[enemy] = clamp(0, height, Math.random() * height);
            
            addComponent(this.world, Velocity, enemy);
            addComponent(this.world, Rotation, enemy);
            addComponent(this.world, Sprite, enemy);
            Sprite.texture[enemy] = 0;
            addComponent(this.world, Controller, enemy);
            Controller.timeBetweenActions[enemy] = 300;
            Controller.accumulatedTime[enemy] = 0;
        }

        this.spriteSystem = createSpriteSystem(this, ['safemoonlogo'])
        this.movementSystem = createMovementSystem();
        this.inputSystem = createInputSystem(this.cursors)
        this.controllerSystem = createControllerSystem(this)

    }

    update() {
        if(!this.world || !this.spriteSystem) {
            return;
        }
        this.inputSystem(this.world);
        this.controllerSystem(this.world);
        this.movementSystem(this.world);
        this.spriteSystem(this.world);
    }
}
