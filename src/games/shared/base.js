import { Scene3D } from "@enable3d/phaser-extension";
import { addComponent, addEntity, createWorld } from "bitecs";
import { ObjectSpaceNormalMap } from "three";

// TODO: look into object recycling for optimization purposes later: https://enable3d.io/examples/objects-recycling.html


export default class BaseGame extends Scene3D {
    constructor() {
        super({ key: 'BaseGame' })
        // create the ECS world (inits the ECS infrastructure)
        this.world = createWorld();
        this.world.time = { delta: 0, elapsed: 0, then: performance.now() }
        this.geometryMap = {}; // {meshID: threejsMesh}
        this.materialMap = {}; // {materialID: threejsMaterial}
        //this.animMap = {}; // {animID: threejsAnimation}
    }

    addGeometry(threeGeometry) {
        this.geometryMap[Object.keys(this.geometryMap).length] = threeGeometry;
    }

    addMaterial(threejsMaterial) {
        this.materialMap[Object.keys(this.materialMap).length] = threejsMaterial;
    }

    // addAnim(threejsAnimation) {
    //     this.animMap[Object.keys(this.animMap).length] = threejsAnimation;
    // }


    makeEntity(entityName, componentMapper) {
        this[entityName] = addEntity(this.world);

        for(let i = 0; i < componentMapper.length; i++) {
            let component = componentMapper[i];
            let componentName = component[0];
            let componentMap = component[1];
            let componentKeys = Object.keys(componentMap);

            addComponent(this.world, componentName, this[entityName]);
            for(let j = 0; j < componentKeys.length; j++) {
                let componentKey = componentKeys[j];
                let componentValue = componentMap[componentKey];
                componentName[componentKey][this[entityName]] = componentValue;
            } 
        }
    }

    init() {
        this.accessThirdDimension({softBodies: true});
        this.third.physics.debug.enable();
    }

    create() {      
        this.third.warpSpeed('-orbitControls')

    }

    update() {
    }
}