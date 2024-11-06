import ProductModel from "../product/product.model.js";
import UserModel from "../user/user.model.js";

export default class CartItemModel {
  constructor(productID, userID, quantity, id) {
    this.productID = productID;
    this.userID = userID;
    this.quantity = quantity;
    this.id = id
  }

  add(productID, userID, quantity) {
    const cartItem = new CartItemModel(productID, userID, quantity)

    //Product validation
    const product = ProductModel.GetAll().find((p) => p.id == productID);
    if (!product) {
      return "product not found"
    }

    //User validation
    const user = UserModel.getAll().find((u) => u.id == userID);
    if (!user) {
      return "User not found"
    }

    cartItem.id = cartItems.length + 1;
    cartItems.push(cartItem);
    return cartItem;
  }
};

var cartItems = [new CartItemModel(1, 2, 1, 1)];