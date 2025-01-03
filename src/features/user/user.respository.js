import { getDB } from "../../config/mongodb.js";
import { ApplicationError } from "../../error/applicationError.js";

class UserRepository {
  async SignUp(newUser) {
    try {
      //Get the database
      const db = getDB();

      //get collections
      const collection = db.collection("users");

      //Insert the document
      await collection.insertOne(newUser);

      return newUser;
    } catch (error) {
      throw new ApplicationError("Something went wrong with the database.", 500);
    }
  }


  //signIn
  async SignIn(email, password) {
    try {
      //Get the database
      const db = getDB();

      //get collections
      const collection = db.collection("users");

      //Insert the document
      return await collection.findOne({ email, password });

    } catch (error) {
      throw new ApplicationError("Something went wrong with the database.", 500);
    }
  }


  async findByEmail(email) {
    try {
      //Get the database
      const db = getDB();

      //get collections
      const collection = db.collection("users");

      //Insert the document
      return await collection.findOne({ email });

    } catch (error) {
      throw new ApplicationError("Something went wrong with the database.", 500);
    }
  }
}

export default UserRepository;
