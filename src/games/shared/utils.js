// clamps a value between a low and a high number.
export function clamp(lowerValue, upperValue, currentValue) {
    return currentValue < lowerValue ? lowerValue : currentValue > upperValue ? upperValue : currentValue;
}