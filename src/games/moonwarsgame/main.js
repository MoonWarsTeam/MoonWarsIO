import BaseGame from "../shared/base";
import { THREE } from "@enable3d/phaser-extension"; 
import { Position, Mesh } from "../ecs/components";

export default class MoonWarsGame extends BaseGame {
    constructor() {
        super({ key: 'MoonWarsGame' })
    }
    
    preload() {       
       let geometry = new THREE.BoxGeometry( 1, 1, 1 );
       this.addGeometry( geometry );

       let material = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
       this.addMaterial( material );
    }


    init() {
    }

    create() {
        super.create();

        this.makeEntity('player', [
            [Position, { x: 0, y: 0, z: 0 }],
            [Mesh, { geometry_id: 0, material_id: 0 }]
        ]);
    }
}
