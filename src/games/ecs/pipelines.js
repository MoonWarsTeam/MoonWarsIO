/*
Pipelines are used to define the order in which sytems are run.
 - pipe() outlines the order of execution for a set of systems.
*/

import { pipe } from "bitecs";
import { movementSystem, timeSystem } from "./systems";

// update the entities position, then update the world clock.
export const movementPipeline = pipe(movementSystem, timeSystem);