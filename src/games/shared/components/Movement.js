import {defineComponent, Types} from 'bitecs';


const Vector2D = {x: Types.f32, y: Types.f32};

export const Position = defineComponent(Vector2D);
export const Velocity = defineComponent(Vector2D);
export const Rotation = defineComponent({
    angle: Types.f32
});