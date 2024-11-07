import CartItemModel from "./cart.model.js";

export class CartItemsController {
  add(req, res) {
    const { productID, quantity } = req.query;
    //took userID from token for security reasons(attackers can't hinder the token which is generated)
    const userID = req.userID;

    CartItemModel.add(productID, userID, quantity)

    res.status(201).send("Cart is updated!")
  }

  get(req, res) {
    const userID = req.userID;

    const items = CartItemModel.get(userID);

    return res.status(200).send(items);
  }

  delete(req, res) {
    const userID = req.userID;
    const cartItemID = req.params.id;
    const result = CartItemModel.delete(cartItemID, userID)
    if (result) {
      return res.status(400).send(result)
    } else {
      return res.status(200).send("Item removed from the cart!")
    }
  }
}