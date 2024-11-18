import UserModel from "../user/user.model.js";

export default class ProductModel {
  constructor(id, name, desc, price, imageUrl, category, sizes) {
    this.id = id;
    this.name = name;
    this.desc = desc;
    this.imageUrl = imageUrl;
    this.category = category;
    this.price = price;
    this.sizes = sizes;
  }

  static GetAll() {
    return products
  }

  static addNewProduct(product) {
    product.id = products.length + 1;
    products.push(product);
    return product;
  }

  static getSingleProduct(id) {
    const product = products.find((product) => product.id === Number(id));
    return product;
  }

  static filter(minPrice, maxPrice, category) {
    return products.filter((product) => {
      return (!minPrice || product.price >= minPrice) && (!maxPrice || product.price <= maxPrice) && (!category || product.category === category);
    });
  }

  static rateProduct(userID, productID, rating) {
    //validate user
    const user = UserModel.getAll().find((u) => u.id == userID)

    if (!user) {
      throw new Error("User not found!");
    }
    //validate product
    const product = products.find((p) => p.id == productID);
    if (!product) {
      throw new Error("Product not found!");
    }
    //Check for previous ratings
    if (!product.ratings) {
      product.ratings = [];
      product.ratings.push({ userID: userID, rating: rating });
    }
    else {
      //check if the rating is given by same user.
      const existingRatingIndex = product.ratings.findIndex(r => r.userID = userID);
      if (existingRatingIndex >= 0) {
        product.ratings[existingRatingIndex] = { userID: userID, rating: rating, }
      } else {
        //if no existing rating then add new rating
        product.ratings.push({
          userID: userID, rating: rating
        })
      }
    }


  }
}


var products = [
  new ProductModel(
    1,
    'Product 1',
    'Description for Product 1',
    19.99,
    'https://m.media-amazon.com/images/I/51-nXsSRfZL._SX328_BO1,204,203,200_.jpg',
    "Category1",
    ["S", "M", "L", "XL", "XXL"]
  ),
  new ProductModel(
    2,
    'Product 2',
    'Description for Product 2',
    29.99,
    'https://m.media-amazon.com/images/I/51xwGSNX-EL._SX356_BO1,204,203,200_.jpg',
    "Category2", ["S", "M", "L", "XL", "XXL"]
  ),
  new ProductModel(
    3,
    'Product 3',
    'Description for Product 3',
    39.99,
    'https://m.media-amazon.com/images/I/31PBdo581fL._SX317_BO1,204,203,200_.jpg',
    "Category2", ["S", "M", "L", "XL", "XXL"]
  ),
]