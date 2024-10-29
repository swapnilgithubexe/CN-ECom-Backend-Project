import UserModel from "../features/user/user.model";


const basicAuthorizer = (req, res, next) => {
  const authHeader = req.headers["authorization"]

  if (!authHeader) {
    return res.status(401).send("No authorization details found!");
  }

  const base64Credentials = authHeader.replace('Basic ', '');

  const decodedCreds = Buffer.from(base64Credentials, 'base64').toString('utf-8');

  const creds = decodedCreds.split(':');

  const user = UserModel.getAll().find(u => u.email == creds[0] && u.password == creds[1]);

  if (user) {
    next()
  }
  else {
    return res.status(401).send("Incorrect Credentials");
  }
}