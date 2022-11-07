const customersService = require("../service/customerService");

const getAllCustomers = async () => {
  return await customersService.loadCustomers();
};

const getCustomerByUserAndCustomer = async (userId, customerId) => {
  return await customersService.getCustomerByUserAndCustomer(
    userId,
    customerId
  );
};

const editCoustomer = async (customer) => {
  return await customersService.editCoustomer(customer);
};

const getCustomersByUser = async (userId) => {
  return await customersService.getCustomersByUser(userId);
};
module.exports = {
  getAllCustomers,
  getCustomerByUserAndCustomer,
  getCustomersByUser,
  editCoustomer,
};
