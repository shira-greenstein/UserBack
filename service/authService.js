const { getUser } = require("./userService");
const jwt = require("jsonwebtoken");

const authenticationUser = async ({ email, password }) => {
  return new Promise((resolve, reject) => {
    if (!validateEmail(email) || !validatePassword(password))
      reject("Invalid email or password");
    // בדיקה ששם משתמש וסיסמה נכונים
    const foundUser = getUser(email);
    if (!foundUser) {
      reject("user not found");
      // res.status(403).json({ message: "user not found" });
      return;
    }
    const isAuthenticated = foundUser.password === password;
    if (!isAuthenticated) {
      // res.status(403).json({ message: "password is incorrect" });
      reject("password is incorrect");
      return;
    }

    const accessToken = jwt.sign(
      { id: foundUser.id },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: 60 * 60 * 24,
      }
    );
    resolve({ accessToken });
    //   res.json({ accessToken });
  });
};

module.exports = {
  authenticationUser,
};

const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};
const validatePassword = (password) => {
  const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
  if (
    password &&
    (!/[a-zA-Z]/.test(password) ||
      !/[0-9]/.test(password) ||
      !specialChars.test(password))
  )
    return false;
  return true;
};
