import { getDB } from "../../config/mongodb.js";
import { ApplicationError } from "../../error/applicationError.js";

export default class UserModel {
  constructor(name, email, password, type, id) {
    this.name = name;
    this.email = email,
      this.password = password;
    this.type = type;
    this._id = id;
  }

  static async SignUp(name, email, password, type) {
    try {

      //Get the database
      const db = getDB();

      //get collections
      const collection = db.collection("users");

      const newUser = new UserModel(name, email, password, type)

      //Insert the document
      await collection.insertOne(newUser);

      return newUser;

    } catch (error) {
      throw new ApplicationError("Something went wrong", 500);
    }
  }

  static SignIn(email, password) {
    const user = users.find((u) => u.email == email && u.password == password)
    return user;
  }

  static getAll() {
    return users;
  }
}

var users = [{
  id: 1,
  name: "SellerUser",
  email: "Seller@gmail.com",
  password: "PasswordForSelling",
  type: "seller"
},
{
  id: 2,
  name: "swapnil",
  email: "swapnildutta2002@gmail.com",
  password: "Password1",
  type: "customer"
}]
