const jwt = require("jsonwebtoken");
const JWT_SECRET = "hellofuncti@n";

const fetchuser = (req, res, next) => {
  //   get the token from the jwt token and add id to req obj

  // this is what i m about to send from the api call by setting header as auth-token as jwt token
  const token = req.header("auth-token");
  if (!token) {
    res.status(401).send({ error: "Please authenticate using a valid token" });
  }
  try {
    const data = jwt.verify(token, JWT_SECRET);
    req.user = data.user;
    next();
  } catch (error) {
    res.status(401).send({ error: "Please authenticate using a valid token" });
  }
};

module.exports = fetchuser;
