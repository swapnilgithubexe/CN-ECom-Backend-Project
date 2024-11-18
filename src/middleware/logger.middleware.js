import fs from "fs";
import winston from "winston";

const fsPromise = fs.promises;

// const log = (logData) => {
//   try {
//     logData = `\n ${new Date().toString()} - ${logData}`
//     fsPromise.appendFile("log.txt", logData);
//   } catch (error) {
//     console.log(error);

//   }
// }

const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  transports: [new winston.transports.File({ filename: 'logs.txt' })]
})



const loggerMiddleware = async (req, res, next) => {
  //log request body
  if (!req.url.includes("signin")) {
    const logData = `${req.url} - ${JSON.stringify(req.body)}`;
    await log(logData);
  }
  next();
}

export default loggerMiddleware;