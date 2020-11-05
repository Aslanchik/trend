const jwt = require("jsonwebtoken");
const { AuthenticationError } = require("apollo-server");

/* const { SECRET_KEY } = require("../config"); */

module.exports = (context) => {
  // Get auth header from request headers
  const authHeader = context.req.headers.authorization;
  //   Check if there is an auth header at akk
  if (authHeader) {
    //   If there is an auth header, split it and get the token
    const token = authHeader.split("Bearer ")[1];
    if (token) {
      // If there is a token attached to the auth header verify it
      try {
        const user = jwt.verify(token, process.env.SECRET_KEY);
        return user;
      } catch (err) {
        //   If the token is invalid throw error
        throw new AuthenticationError("Invalid/Expired token");
      }
    }
    // If there is no token or it is badly formatted throw error
    throw new Error("Authentication token must be 'Bearer [token]'");
  }
  //   If there is no authentication header throw error
  throw new Error("Authorization header must be provided");
};
