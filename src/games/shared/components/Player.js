import {defineComponent, Types} from 'bitecs';


export const Player = defineComponent({
    id: Types.ui32,
})

export const Controller = defineComponent({
    timeBetweenActions: Types.ui32,
    accumulatedTime: Types.ui32,
})
