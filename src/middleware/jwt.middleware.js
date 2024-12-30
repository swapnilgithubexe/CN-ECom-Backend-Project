import jwt from 'jsonwebtoken';

const jwtAuth = (req, res, next) => {
  // Read the token
  const token = req.headers['authorization'];

  // If no token, return error
  if (!token) {
    return res.status(401).send('Unauthorized');
  }

  // Check token validity
  try {
    const payload = jwt.verify(token, "TELLMEDOYOUBLEED?");
    req.userID = payload.userId;
    console.log(payload.userId);


  } catch (error) {
    return res.status(401).send("Unauthorized");
  }

  // Call next middleware
  next();
};

export default jwtAuth;
