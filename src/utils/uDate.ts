const getUNow = () => {
    const uNow = new Date().getTime() / 1000;
    return parseInt(uNow.toFixed(0), 10);
};

export const getUMonthM = () => 30 * 86400 * 1000;

export const getUDayM = () => 86400 * 1000;

export const getUDay = () => 86400;

export default {
    getUNow,
    getUMonthM,
    getUDay,
    getUDayM,
};
