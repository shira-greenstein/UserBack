const fs = require("fs");
const xml2js = require("xml2js");
const User = require("../entity/user");
const parser = new xml2js.Parser({ explicitArray: false });

let users = [];

const loadUsers = () => {
  return new Promise((resolve, reject) => {
    let xml = fs.readFileSync("./files/users.txt", "utf8");
    parser.parseString(xml, (error, data) => {
      if (error === null) {
        let arr = data["users"]["user"];
        let usersInstances = new Array();
        arr.forEach((element) => {
          let user = new User(
            element.id,
            element.email,
            element.firstName,
            element.lastName,
            element.password
          );
          usersInstances.push(user);
        });
        users = usersInstances;
        resolve(users);
      } else {
        reject(error);
      }
    });
  });
};

const getUser = (email) => {
  const user = users.find((user) => user.email === email);
  return user;
};

loadUsers();

module.exports = {
  getUser,
};
