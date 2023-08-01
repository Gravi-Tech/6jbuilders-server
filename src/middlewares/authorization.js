/** authorization.js */
//axios.defaults.headers.common['Authorization'] = acc_token

const jwt = require("jsonwebtoken");
const tokenkey = "tokensercret123456";
class Authorization {
  constructor() {}
  /*
   *parameter data is an object that hold any data
   * you want to embed in your token
   */
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

  /*
   * to be authorized create an api ang get an access token
   * add the access token to the client header
   * axios.defaults.headers.common['Authorization'] = acc_token => sample using axios
   * getAccessToken is the function to generate token.
   */
  static authorized(req, res, next) {
    const token = req.headers.authorization;
    if (token) {
      jwt.verify(token, tokenkey, (err, user) => {
        if (err) {
          return res.json({
            error: true,
            message: "You are forbidden.",
          });
        }
        req.user = user;
        next();
      });
    } else {
      return res.json({
        error: true,
        message: "You are not authenticated.",
      });
    }
  }
}

module.exports = Authorization;
