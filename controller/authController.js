const authService = require("../service/authService");

const authenticationUser = async ({ email, password }) => {
  return await authService.authenticationUser({ email, password });
};

module.exports = { authenticationUser };
