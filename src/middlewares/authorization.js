const jwt = require("jsonwebtoken");
const tokenkey = "6jbuilders-key";

class Authorization {
  constructor() {}

  static getAccessToken(data) {
    var acc_token = jwt.sign(
      {
        data,
      },
      tokenkey,
      {
        expiresIn: "12h",
      }
    );
    return acc_token;
  }

  static routeEnter(req, res, next) {
    console.log(req);
    next();
  }

  static authorized(req, res, next) {
    const token = req.headers.authorization;
    if (token) {
      const tokenValue = token.split(" ")[1];
      jwt.verify(tokenValue, tokenkey, (err, decoded) => {
        if (err) {
          return res.status(403).json({
            error: true,
            message: "You are forbidden.",
          });
        }
        req.admin = decoded.data;
        next();
      });
    } else {
      return res.status(401).json({
        error: true,
        message: "You are not authenticated.",
      });
    }
  }
}

module.exports = Authorization;
