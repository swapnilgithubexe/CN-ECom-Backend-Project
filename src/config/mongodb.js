import { MongoClient } from "mongodb";

const url = "mongodb://localhost:27017/CN_EcomDB"

let client;

export const mongodbconnection = () => {
  MongoClient.connect(url).then((clientInstance) => {
    client = clientInstance
    console.log("Database Connected");

  }).catch(err => {
    console.log(err);

  })
}

export const getDB = () => {
  return client.db();
}


