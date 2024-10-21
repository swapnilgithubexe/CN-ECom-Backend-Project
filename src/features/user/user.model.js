export class UserModel {
  constructor(name, email, password, type) {
    this.name = name;
    this.email = email,
      this.password = password;
    this.type = type;
  }
}

var users = [{
  name: "SellerUser",
  email: "Seller@gmail.com",
  password: "PasswordForSelling",
  type: "seller"
}]
