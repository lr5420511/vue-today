import { WEATHERS } from '../config';

// Datetime translater.
export const dateTranslater = function(times, callback) {
    const date = new Date(times);
    return callback(
        date.getFullYear(),
        date.getMonth() + 1,
        date.getDate(),
        date.getDay(),
        date.getHours(),
        date.getMinutes(),
        date.getSeconds(),
        date.getMilliseconds()
    );
};

// Translate weather to iconclasses.
export const weatherToIcons = function(weather) {
    return (weather.match(
        new RegExp(`(${Object.keys(WEATHERS).join('|')})`, 'ig')
    ) || []).map(cur => WEATHERS[cur]);
};