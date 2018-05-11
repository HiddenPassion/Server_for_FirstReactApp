const mongoose = require('mongoose');

const { mongooseAllProducts, mongooseCart } = require('../db/mongoose');

const allProductsSchema = new mongoose.Schema({
	ID: {
		type: String,
		required: true,
		trim: true, 
		minlength: 1,
		uniquie: true,
	},
	name: {
		type: String,
		required: true,
		trim: true,
		minlenngth: 1,
	},
	description: {
		type: String,
		required: true,
		trim: false,
		minlenngth: 1,
	},
	URL: {
		type: String,
		required: true,
		trim: true,
		minlenngth: 1,
	}
});

const AllProducts = mongooseAllProducts.model('AllProducts', allProductsSchema);

const cartProductsSchema = new mongoose.Schema({
	ID: {
		type: String,
		required: true,
		trim: true, 
		minlength: 1,
		uniquie: true
	},
	name: {
		type: String,
		required: true,
		trim: true,
		minlenngth: 1,
	},
	description: {
		type: String,
		required: true,
		trim: false,
		minlenngth: 1,
	},
	URL: {
		type: String,
		required: true,
		trim: true,
		minlenngth: 1,
	}, 
	count: {
		type: Number,
		required: true,
		min: 1,
	}
});

const CartProducts = mongooseCart.model('CartProduct', cartProductsSchema);

module.exports = {
	AllProducts,
	CartProducts
}