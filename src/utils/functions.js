import moment from 'moment';

export const numberWithDecimals = (value, divideDecimals, showDecimals, isNumber) => {
    const _value = value / Math.pow(10, divideDecimals);
    const _decimals = Math.pow(10, showDecimals);
    const _res = Math.floor(_value * _decimals) / _decimals;
    if (!isNumber) return _res.toFixed(0);
    return _res;
}

export const getTimeLeft = (deadline) => {
    const now = moment.utc();
    const deadlineHour = Math.floor(deadline);
    const deadlineMin = Math.floor((deadline - deadlineHour) * 60);

    const _deadline = now.clone().hour(deadlineHour).minute(deadlineMin).second(0);
    if (now.isAfter(_deadline)) {
        const tomorrow = moment.utc(new Date()).add(1, 'days').hour(deadlineHour).minute(deadlineMin).second(0);
        return tomorrow.diff(now, "seconds");
    } else {
        return _deadline.diff(now, "seconds");
    }
}


export const getDateLeft = (date) => {
    const now = moment.utc();
    const deadline = moment.utc(date);
    if (now.isAfter(deadline)) {
        return 0;
    } else {
        return deadline.diff(now, "seconds");
    }
}