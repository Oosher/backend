const morgan = require("morgan");
const currentTime = require("../utils/timeService");
const chalk = require("chalk");

const morganLogger = morgan(function (tokens, req, res) {
    const { year, month, day, hours, minutes, seconds } = currentTime();
    const currentDate = `[${year}/${month}/${day} ${hours}:${minutes}:${seconds}]`;
    const log = [
        currentDate,
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res),
        "-",
        tokens["response-time"](req, res),
        "ms",
    ].join(" ");

    if (res.statusCode >= 400) return chalk.redBright(log);
    else return chalk.cyanBright(log);
});

module.exports = morganLogger;
