/*
Systems are functions that update the component data of entities. They run every frame.
 - defineSystem() Creates the function that will be used to mutate a component.
*/

import { defineSystem } from "bitecs";
import { Position, Velocity } from "./components";
import { movementQuery, resizeQuery, meshQuery } from "./queries";

//boilerplate base query iterator
const iterate = (queryFn, world, callback) => {
    const entities = queryFn(world);
    for (let i = 0; i < entities.length; i++) {
        callback.call(this, entities[i]);
    }
};

// move an entity to a new position based on the velocity
export const movementSystem = defineSystem((world) => {
    iterate(movementQuery, world, (entity) => {
        Position.x[entity] += Velocity.x[entity]
        Position.y[entity] += Velocity.y[entity]
        Position.z[entity] += Velocity.z[entity]
    });
});

// make ExtendedObject3D based on meshQuery component
export const meshSystem = defineSystem((world) => {
    iterate(meshQuery, world, (entity) => {
    });
});


// update the world time
export const timeSystem = defineSystem((world) => {
    const { time } = world
    const now = performance.now()
    const delta = now - time.then
    time.delta = delta
    time.elapsed += delta
    time.then = now
});