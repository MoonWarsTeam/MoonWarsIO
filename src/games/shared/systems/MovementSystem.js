import { defineSystem, defineQuery } from 'bitecs';

import { Position, Velocity } from '../components/Movement';

export const createMovementSystem = () => {
    const query = defineQuery([Position, Velocity]);
    return defineSystem(world => {
        const entities = query(world);
        for(var i = 0; i < entities.length; i++) {
            const id = entities[i];
            Position.x[id] += Velocity.x[id];
            Position.y[id] += Velocity.y[id];
        }

        return world
    });
}