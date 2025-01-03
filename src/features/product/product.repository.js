import { ObjectId } from "mongodb";
import { getDB } from "../../config/mongodb.js";
import { ApplicationError } from "../../error/applicationError.js";

export default class ProductRepository {
  constructor() {
    this.collection = "products";
  }
  async add(newProduct) {
    try {
      const db = getDB();

      const collection = db.collection(this.collection);

      await collection.insertOne(newProduct);
      return newProduct;
    } catch (error) {
      throw new ApplicationError("Something is wrong with the database", 500);
    }
  }

  async getAll() {
    try {
      const db = getDB();
      const collection = db.collection(this.collection);

      return await collection.find();
    } catch (error) {
      throw new ApplicationError("Something is wrong with the database", 500);
    }
  }
  async get(id) {
    try {
      const db = getDB();
      const collection = db.collection(this.collection);

      return await collection.findOne({ _id: new ObjectId(id) });



    } catch (error) {
      console.error(error.message);
      throw new ApplicationError("Something is wrong with the database", 500);
    }
  }

  async filter(minPrice, maxPrice, category) {
    try {
      const db = getDB();
      const collection = db.collection(this.collection);

      let filterExpression = {};

      if (minPrice) {
        filterExpression.price = { $gte: parseFloat(minPrice) }
      }
      if (maxPrice) {
        filterExpression.price = { $lte: parseFloat(maxPrice) }
      }
      if (category) {
        filterExpression.category = category;
      }

      return collection.find(filterExpression).toArray();
    } catch (error) {
      console.error(error.message);
      throw new ApplicationError("Something is wrong with the database", 500);
    }

  }

  // async rate(userID, productID, rating) {
  //   try {
  //     const db = getDB();
  //     const collection = db.collection(this.collection);

  //     const productObjectID = new ObjectId(productID);
  //     const userObjectID = new ObjectId(userID);
  //     //Finding the product
  //     const product = await collection.findOne({ _id: productObjectID });

  //     //Finding if the same user has any rating beforehand
  //     const userRating = product?.ratings?.find(r => r.userID.equals(userObjectID));
  //     // ?. is null check to eradicate the undefined typeError
  //     //similary we could write if(product && product.ratings)
  //     if (userRating) {
  //       await collection.updateOne({ _id: productObjectID, "ratings.userID": userObjectID }, {
  //         $set: { "ratings.$.rating": rating }
  //       })
  //     } else {
  //       await collection.updateOne({ _id: productObjectID }, {
  //         $push: { ratings: { userID: userObjectID, rating } }
  //       });
  //     }
  //   } catch (error) {
  //     console.error(error.message);
  //     throw new ApplicationError("Something is wrong with the database", 500);
  //   }
  // }

  //Second approach and more optimized
  async rate(userID, productID, rating) {
    try {
      const db = getDB();
      const collection = db.collection(this.collection);

      const productObjectId = new ObjectId(productID);
      const userObjectId = new ObjectId(userID);
      //Below are atomic operations i.e both will either execute side by side or.
      //1.Upadte the existing rating
      await collection.updateOne({
        _id: productObjectId
      }, {
        $pull: { ratings: { userID: userObjectId } }
      })

      //2. Update if found
      await collection.updateOne(
        { _id: productObjectId },
        {
          $push: { ratings: { userID: userObjectId, rating } },
        }
      );
    } catch (error) {
      console.error(error.message);
      throw new ApplicationError("Something is wrong with the database", 500);
    }
  }

}