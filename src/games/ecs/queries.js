/*
Queries are used to filter a list of entities based on the Components they contain.
 - defineQuery() takes a list of Components and returns a list of Entity IDs
*/

import { defineQuery } from "bitecs";
import { Position, Scale, Velocity, Mesh } from "./components";

export const movementQuery = defineQuery([Position, Velocity]);
export const resizeQuery = defineQuery([Scale]);
export const meshQuery = defineQuery([Mesh]);