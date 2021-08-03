/*
Components are container objects that hold data for entities. These are mutated by the systems to effect the entities.
 - defineComponent() defines the data structure that a system can use and mutate
*/

import { defineComponent, Types } from 'bitecs';

// helper variables
const Vector3 = { x: Types.f32, y: Types.f32, z: Types.f32 }

// Components
export const Position = defineComponent(Vector3);
export const Velocity = defineComponent(Vector3);
export const Rotation = defineComponent(Vector3);
export const Scale = defineComponent(Vector3);
export const Mesh = defineComponent({
    geometry_id: Types.ui32,
    material_id: Types.ui32
});
export const Animation = defineComponent({
    animset_id: Types.ui32
});
