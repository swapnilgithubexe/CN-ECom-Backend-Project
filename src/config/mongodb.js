import { MongoClient } from "mongodb";

const url = "mongodb://localhost:27017/CN_EcomDB"

const mongodbconnection = () => {
  MongoClient.connect(url).then(client => {
    console.log("Database Connected");

  }).catch(err => {
    console.log(err);

  })
}

export default mongodbconnection;

