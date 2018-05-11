const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const mongooseAllProducts = mongoose.createConnection('mongodb://localhost:27017/AllProducts');
const mongooseCart = mongoose.createConnection('mongodb://localhost:27017/CartProducts');

module.exports = {
	mongooseAllProducts,
	mongooseCart,
};