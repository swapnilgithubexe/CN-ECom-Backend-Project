import { MongoClient } from "mongodb";



let client;

export const mongodbconnection = () => {
  MongoClient.connect(process.env.DB_URL).then((clientInstance) => {
    client = clientInstance
    console.log("Database Connected");
    createIndexes(client.db())

  }).catch(err => {
    console.log(err);

  })
}

export const getClient = () => {
  return client;
}

export const getDB = () => {
  return client.db();
}

export const createIndexes = async (db) => {
  await db.collection("products").createIndex({ price: 1 });
  await db.collection("products").createIndex({ price: -1, name: 1 });
  await db.collection("products").createIndex({ desc: "text" });
}


