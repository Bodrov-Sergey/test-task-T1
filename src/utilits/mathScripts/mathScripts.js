export const getHalfPeriodLowAlpha = (ropeLength, gravity) => {
    // Getting the period using formula from physics
    return Math.round(2 * Math.PI * Math.sqrt(ropeLength / gravity) / 2 * 1000);
}
export const getAlpha = (ropeLength, startHeight) => {
    // Getting alpha angle by acos and converting radians
    return (Math.acos((ropeLength - startHeight) / ropeLength) * 180) / Math.PI
}