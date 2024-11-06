import jwt from 'jsonwebtoken';

const jwtAuth = (req, res, next) => {
  //Read the token

  const token = req.headers['authorization']

  //if no token return error

  if (!token) {
    return res.status(401).send('Unauthorized')
  }

  //check token validity
  try {
    const payload = jwt.verify(token, "TELLMEDOYOUBLEED?");
    req.userID = payload.userID;

  } catch (error) {

    return res.status(401).send("Unauthorized")
  }


  //call next middleware
  next();

};

export default jwtAuth;