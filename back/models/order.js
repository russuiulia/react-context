
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user: {
    name: String,
    street: String,
    postalCode: String,
    city: String
  },
  orderedItems: [{
    id: String,
    name: String,
    amount: Number,
    price: String
  }]
});

module.exports = mongoose.model("Order", orderSchema);