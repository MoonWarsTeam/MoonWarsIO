import { defineSystem, defineQuery } from "bitecs";
import { Velocity, Rotation } from "../components/Movement";
import { Controller } from "../components/Player";
import { clamp } from "../utils";

export const createControllerSystem = (scene) => {
    const query = defineQuery([Controller, Velocity, Rotation]);
    return defineSystem(world => {
        const dt = scene.game.loop.delta;
        const entities = query(world)
        for (let i = 0; i < entities.length; i++) {
            const id = entities[i];
            Controller.accumulatedTime[id] += dt;
            if(Controller.accumulatedTime[id] >= Controller.timeBetweenActions[id]){
                Controller.accumulatedTime[id] = 0;
                const rand = parseInt(clamp(0, 20, Math.random() * 21))

                Velocity.x[id] = rand === 0 ? -1 : rand === 1 ? 1 : 0;
                Velocity.y[id] = rand === 2 ? -1 : rand === 3 ? 1 : 0;
            }
        }
        return world;
    })
}