export class UserModel {
  constructor(name, email, password, type) {
    this.name = name;
    this.email = email,
      this.password = password;
    this.type = type;
  }

  static SignUp(name, email, password, type) {
    const newUser = new UserModel(name, email, password, type)
    users.push(newUser);
  }

  static SignIn(email, password) {
    const user = users.find((u) => u.email == email && u.password == password)
    return user;
  }
}

var users = [{
  name: "SellerUser",
  email: "Seller@gmail.com",
  password: "PasswordForSelling",
  type: "seller"
}]
