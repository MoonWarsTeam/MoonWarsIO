import { Scene3D } from "@enable3d/phaser-extension";
// import logoImg from "../assets/safemoon-logo.png";

export default class MoonWarsGame extends Scene3D {
    constructor() {
        super({ key: 'MoonWarsGame' })
    }
    
    preload() {
        // this.load.image("logo", logoImg);
      }

    init() {
        this.accessThirdDimension();
        console.log('init done')
    }

    create() {
        this.third.warpSpeed()
        this.third.physics.add.box()
    }
}
