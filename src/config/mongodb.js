import { MongoClient } from "mongodb";



let client;

export const mongodbconnection = () => {
  MongoClient.connect(process.env.DB_URL).then((clientInstance) => {
    client = clientInstance
    console.log("Database Connected");

  }).catch(err => {
    console.log(err);

  })
}

export const getDB = () => {
  return client.db();
}


