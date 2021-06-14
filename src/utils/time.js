function getTimeInfo(timeInMilis) {
    const totalMinutes = Math.ceil(timeInMilis / (1000 * 60));
    const minutes = totalMinutes % 60;
    const hours =  Math.floor(totalMinutes / 60);

    const minutesInfo = addUnits(minutes, "minute", "minutes");
    if (hours < 1) {
        return minutesInfo;
    }
    const hoursInfo = addUnits(hours, "hour", "hours");
    return `${hoursInfo} and ${minutesInfo}`;
}


function addUnits(quantity, unit, plural) {
    return `${quantity} ${quantity !== 1 ? plural : unit}`;
}

module.exports = {
    getTimeInfo,
};
