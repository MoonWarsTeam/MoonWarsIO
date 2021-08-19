import { defineSystem, defineQuery } from "bitecs";
import { Velocity, Rotation } from "../components/Movement";
import { Player } from "../components/Player"

export const createInputSystem = (cursors) => {
    const query = defineQuery([Player, Velocity, Rotation]);
    return defineSystem(world => {
        const entities = query(world)
        for (let i = 0; i < entities.length; i++) {
            const id = entities[i];
            Velocity.x[id] = cursors.left.isDown ? -1 : cursors.right.isDown ? 1 : 0;
            Velocity.y[id] = cursors.up.isDown ? -1 : cursors.down.isDown ? 1 : 0;

            Rotation.angle[id] = cursors.left.isDown ? 180 : cursors.right.isDown ? 0 : 0;
            Rotation.angle[id] = cursors.up.isDown ? 90 : cursors.down.isDown ? 270 : 0;
        }
        return world;
    })
}