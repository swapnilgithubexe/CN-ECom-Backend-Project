import jwt from 'jsonwebtoken';

const jwtAuth = (req, res, next) => {
  //Read the token
  console.log(req.headers);

  const token = req.headers['authorization']

  //if no token return error
  console.log(token);


  if (!token) {
    return res.status(401).send('Unauthorized')
  }

  //check token validity
  try {
    const payload = jwt.verify(token, "TELLMEDOYOUBLEED?");
    console.log(payload);

  } catch (error) {
    console.log(error);

    return res.status(401).send("Unauthorized")
  }


  //call next middleware
  next();

};

export default jwtAuth;