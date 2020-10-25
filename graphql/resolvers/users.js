const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { UserInputError } = require("apollo-server");

const {
  validateRegisterInput,
  validateLoginInput,
} = require("../../util/validators");
const { SECRET_KEY } = require("../../config");
const User = require("../../models/User");

function generateJwt(user) {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      username: user.username,
    },
    SECRET_KEY,
    { expiresIn: "12h" }
  );
}

module.exports = {
  Mutation: {
    async login(_, { email, password }, context, info) {
      //   Validate user data
      const { errors, valid } = validateLoginInput(email, password);
      if (!valid) throw new UserInputError("Errors", { errors });
      // Check if user email exists
      const user = await User.findOne({ email });
      if (!user) {
        errors.general = "User not found";
        throw new UserInputError("User not found", { errors });
      }
      //   Check if input password matches db password
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        errors.general = "Wrong credentials";
        throw new UserInputError("Wrong credentials", { errors });
      }
      //   Create and assign JWT
      const token = generateJwt(user);
      //   Return user data and token
      return {
        ...user._doc,
        id: user._id,
        token,
      };
    },
    async register(
      _,
      { registerInput: { username, email, password, confirmPassword } },
      context,
      info
    ) {
      // 1. Validate user data
      const { valid, errors } = validateRegisterInput(
        username,
        email,
        password,
        confirmPassword
      );
      if (!valid) throw new UserInputError("Errors", { errors });
      // 2. Make sure email doesnt already exist
      const emailExists = await User.findOne({ email });
      const usernameExists = await User.findOne({ username });

      if (emailExists) {
        throw new UserInputError("Email is taken", {
          errors: { email: "This email is taken." },
        });
      } else if (usernameExists) {
        throw new UserInputError("Username is taken", {
          errors: { email: "This username is taken." },
        });
      }
      // 3. Create new user
      // 3.1 Hash password
      password = await bcrypt.hash(password, 12);
      // 3.2 Create new user from Model
      const newUser = new User({
        email,
        username,
        password,
        createdAt: new Date().toISOString(),
      });
      //  3.3 Save new user to DB
      const res = await newUser.save();
      //   3.4 Create JWT
      const token = generateJwt(res);
      // 3.5 Return created user with Id and JWT
      return {
        ...res._doc,
        id: res._id,
        token,
      };
    },
  },
};
