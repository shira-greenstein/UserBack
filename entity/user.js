class User {
  constructor(id, email, firstName, lastName, password) {
    this.id = id;
    this.email = email;
    this.firstName = firstName;
    this.lastName = lastName;
    this.password = password;
  }
}
module.exports = User;
// constructor() {
//   this.users = [];
//   this.loadUsers();
// }

// loadUsers = () => {
//   return new Promise((resolve, reject) => {
//     let xml = fs.readFileSync("./files/users.txt", "utf8");
//     parser.parseString(xml, (error, data) => {
//       if (data) {
//         this.users = data["users"]["user"];
//         resolve(this.users);
//       } else {
//         reject(error);
//       }
//     });
//   });
// };

// getUser(email) {
//   const user = this.users.find((user) => user.email === email);
//   return user;
// }
// }

// const usersService = new UsersService();

// module.exports = { usersService };
