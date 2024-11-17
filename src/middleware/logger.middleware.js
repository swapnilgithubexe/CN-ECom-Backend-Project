import fs from "fs";

const fsPromise = fs.promises;

async function log(logData) {
  try {
    fsPromise.writeFile("log.txt", logData);
  } catch (error) {
    console.log(error);

  }
}