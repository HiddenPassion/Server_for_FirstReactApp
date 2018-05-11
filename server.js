const express = require('express');
const bodyParser = require('body-parser');
const { ObjectID } = require('mongodb') ;
const _ = require('lodash');

const { AllProducts, CartProducts} =  require('./models/models');



const port = process.env.PORT || 3001;
const app = express();

var allowCrossDomain = function(req, res, next) {
	res.header('Access-Control-Allow-Origin', "*");
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH');
	res.header('Access-Control-Allow-Headers', 'Content-Type');
	next();
}

app.use(allowCrossDomain);
app.use(bodyParser.json());

app.get('/get-allproducts', function(req, res) {
	let allProducts = [];
	AllProducts.find({}).then( result => {
		for ( let product of result) {
			allProducts.push(_.pick(product, ['ID', 'name', 'description', 'URL']));
		}
		res.status(200).json(allProducts);
	});
});

app.get('/get-selectedProductById/:id', function(req, res) {
	console.log(req.params);
	AllProducts.findOne({'ID': req.params.id})
		.then( result => 
			res.status(200).send(_.pick(result,['ID', 'name', 'description', 'URL'])))
		.catch( err => 
			res.status(400).send(err));
})

app.get('/get-cart', function(req, res) {
	let cartProducts = [];
	CartProducts.find({}).then( result => {
		for ( let product of result) {
			cartProducts.push(_.pick(product, ['ID', 'name', 'description', 'URL', 'count']));			
		}
		res.status(200).json(cartProducts);
	});	
});

app.patch('/add-to-cart', function(req, res) {
	CartProducts.findOne({'ID': req.body.ID}).then( result => {
		if(result) {
			result.count++;
			result.save()
				.then( response => res.status(200).send('Current count: ' + response.count))
				.catch(err => res.status(400).send(err));
		} else {
			AllProducts.findOne({'ID': req.body.ID}).then( product => {
				product = _.pick(product, ['ID', 'name', 'description', 'URL']);
				const newCartProduct = new CartProducts({
					...product,
					count: 1,
				});
				newCartProduct.save()
					.then(response => res.status(200).send('Created new cart product :' + response.count))
					.catch(err => res.status(400).send(err));
			})
		}
	})
})

//CartProducts.findOne({'ID': 1}).then( result => console.log(result));

app.patch('/remove-from-cart', function(req, res) {
	CartProducts.findOne({'ID': req.body.ID}).then( result => {
	
		if(!result) {
			res.status(400).send('Not FOUND');
		} else {			
			if(result.count >=2) {
				result.count--;
				result.save()
					.then( result => res.status(200).send('Count after removing: ' + result.count))
					.catch( err => res.status(400).send(err));
			} else {				
				CartProducts.findOneAndRemove({'ID': req.body.ID})
					.then( response => res.status(200).send('Cart fully deleted'))
					.catch(err => console.log('Error is here ' + err));
			}
		}
	})
})
app.listen(port, () => console.log(`Server is up on port ${port}`));
