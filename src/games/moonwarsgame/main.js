import BaseGame from "../shared/base";
import { THREE } from "@enable3d/phaser-extension";
import { createSoftVolume } from "../shared/utils";

export default class MoonWarsGame extends BaseGame {
    constructor() {
        super({ key: 'MoonWarsGame' })
        this.softBodies = [];
    }
    
    preload() {       
        
    }


    init() {
        super.init();

        this.third.load.preload('safemoonlogo', '../assets/safemoon-logo.png');

        const volumeMass = 15;
        const sphereGeometry = new THREE.SphereGeometry( 1, 32, 32 );
        sphereGeometry.translate( 0, 3, 0 );
        let player = createSoftVolume( sphereGeometry, volumeMass, 161, this );
        this.scene.add('player', player);
        
    }

    create() {
        super.create();
    }
}
