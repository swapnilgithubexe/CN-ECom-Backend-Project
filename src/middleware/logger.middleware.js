import fs from "fs";

const fsPromise = fs.promises;

const log = (logData) => {
  try {
    logData = `\n ${new Date().toString()} - ${logData}`
    fsPromise.appendFile("log.txt", logData);
  } catch (error) {
    console.log(error);

  }
}

const loggerMiddleware = async (req, res, next) => {
  //log request body
  const logData = `${req.url} - ${JSON.stringify(req.body)}`;
  log(logData);
}

export default loggerMiddleware;