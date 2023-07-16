const currentTime = () => {
    let now = new Date();
    let result = {};
    result.year = now.getFullYear();
    result.month = now.getMonth() + 1;
    result.day = now.getDate();
    result.hours = now.getHours();
    result.minutes = now.getMinutes();
    result.seconds = now.getSeconds();
    for (const key in result) {
        result[key] = result[key].toString().padStart(2, "0");
    }
    return result;
};

module.exports = currentTime;