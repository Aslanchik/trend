module.exports.validateRegisterInput = (
  username,
  email,
  password,
  confirmPassword
) => {
  // Initialize errors object
  const errors = {};
  //   Check if username is empty
  if (username.trim() === "") errors.username = "Username must not be empty";
  //   Check if Email is empty
  if (email.trim() === "") errors.email = "Email must not be empty";
  else {
    //   Also Check if email is valid
    const regEx = /^(?!.*\.\.)[\w.\-#!$%&'*+\/=?^_`{}|~]{1,35}@[\w.\-]+\.[a-zA-Z]{2,15}$/;
    if (!email.match(regEx))
      errors.email = "Email must be a valid email address";
  }
  //   Check if password is empty
  if (password === "") errors.password = "Password must not be empty";
  //   Also check if passwords match
  else if (password !== confirmPassword)
    errors.confirmPassword = "Passwords must match";

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};

module.exports.validateLoginInput = (email, password) => {
  // Initialize errors object
  const errors = {};
  //   Check if Email is empty
  if (email.trim() === "") errors.email = "Email must not be empty";
  else {
    //   Also Check if email is valid
    const regEx = /^(?!.*\.\.)[\w.\-#!$%&'*+\/=?^_`{}|~]{1,35}@[\w.\-]+\.[a-zA-Z]{2,15}$/;
    if (!email.match(regEx))
      errors.email = "Email must be a valid email address";
  }
  //   Check if password is empty
  if (password === "") errors.password = "Password must not be empty";

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};
