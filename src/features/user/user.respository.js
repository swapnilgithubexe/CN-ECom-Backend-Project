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
      throw new ApplicationError("Something went wrong", 500);
    }
  }
}

export default UserRepository;
