const fs = require("fs");
const xml2js = require("xml2js");
const parser = new xml2js.Parser({ explicitArray: false });
const Customer = require("../entity/customer");
var js2xmlparser = require("js2xmlparser");

let customers = [];

const loadCustomers = () => {
  return new Promise((resolve, reject) => {
    let xml = fs.readFileSync("./files/customers.txt", "utf8");
    parser.parseString(xml, (error, data) => {
      if (error === null) {
        let arr = data["customer"]["customer"];
        let customersInstances = new Array();
        arr.forEach((element) => {
          let customer = new Customer(
            element.id,
            element.userId,
            element.email,
            element.firstName,
            element.lastName,
            element.date,
            element.phone,
            element.bankAccount
          );
          customersInstances.push(customer);
        });
        customers = customersInstances;
        resolve(customersInstances);
      } else {
        console.log(error);
        reject(error);
      }
    });
  });
};

const getCustomerByUserAndCustomer = async (userId, customerId) => {
  return new Promise((resolve, reject) => {
    let filter = customers.filter(
      (x) => x.id === customerId && x.userId === userId
    );
    resolve(filter);
  });
};

const getCustomersByUser = async (userId) => {
  return new Promise((resolve, reject) => {
    let filter = customers.filter((x) => x.userId === userId);
    resolve(filter);
  });
};

const editCoustomer = async (customer) => {
  return new Promise((resolve, reject) => {
    const index = customers.findIndex((object) => {
      return object.id === customer.id;
    });
    if (index === -1) {
      reject("User not found");
    }
    customers[index].email = customer.email;
    customers[index].firstName = customer.firstName;
    customers[index].lastName = customer.lastName;
    customers[index].bankAccount = customer.bankAccount;
    customers[index].date = customer.date;
    customers[index].phone = customer.phone;

    const xml = js2xmlparser.parse("customer", customers);

    fs.writeFile("./files/customers.txt", xml, (err) => {
      if (err) {
        throw err;
      }

      console.log(`Updated XML is written to a new file.`);
    });
    resolve();
  });
};

loadCustomers();
module.exports = {
  loadCustomers,
  getCustomerByUserAndCustomer,
  getCustomersByUser,
  editCoustomer,
};
