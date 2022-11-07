class Customer {
  constructor(
    id,
    userId,
    email,
    firstName,
    lastName,
    date,
    phone,
    bankAccount
  ) {
    this.id = id;
    this.userId = userId;
    this.email = email;
    this.firstName = firstName;
    this.lastName = lastName;
    this.date = date;
    this.phone = phone;
    this.bankAccount = bankAccount;
  }
}

module.exports = Customer;
