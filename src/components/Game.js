import Phaser from "phaser";
import MoonWarsGame from "../games/moonwarsgame/main";
import * as React from "react";
import { enable3d, Canvas } from '@enable3d/phaser-extension';
import { GAME_HEIGHT, GAME_WIDTH } from "../config";

export default class Game extends React.Component {
  componentDidMount() {
    this.config = {
      type: Phaser.WEBGL,
      transparent: true,
      scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: GAME_WIDTH,
        height: GAME_HEIGHT
      },
      width: GAME_WIDTH,
        height: GAME_HEIGHT,
      parent: "phaser-game",
      scene: [MoonWarsGame],
      ...Canvas()
    };
  }

  shouldComponentUpdate() {
    return false;
  }

  render() {
    console.log('loaded window')
    enable3d(() => new Phaser.Game(this.config)).withPhysics('../assets/ammo')
    return <div id="phaser-game" />;
  }
}
