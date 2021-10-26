const User = require('../model/user');
const userController = require('./user');
const lib = require('jarmlib');

const Product = require('../model/product');

const productController = {
	index: async (req, res) => {
		if(!await userController.verifyAccess(req, res, ['adm', 'man'])){
			return res.redirect("/");
		};

		try {
			const feedstockColors = await Feedstock.colorList();
			const productColors = await Product.colorList();
			res.render('product/index', { productColors, feedstockColors, user: req.user });
		} catch (err) {
			console.log(err);
			res.send({ msg: "Ocorreu um erro ao realizar requisição." });
		};
	},
	show: async (req, res) => {
		// if(!await userController.verifyAccess(req, res, ['adm', 'man'])){
		// 	return res.redirect("/");
		// };

		let product = await Product.findById(req.params.id);
		product = { ...product[0] };
		product.images = await Product.image.list(product.id);
		let price = await Product.price.find({ category_id: 3, product_id: req.params.id });
		product.price = price[0].price;
		
		try{
			res.render('catalog/show', { product });
		} catch (err) {
			console.log(err);
			res.send({ msg: "Ocorreu um erro ao realizar requisição." });
		};
	},
	filter: async (req, res) => {
		// if(!await userController.verifyAccess(req, res, ['adm', 'n/a'])){
			// return res.send({ unauthorized: "Você não tem permissão para realizar esta ação!" });
		// };


		var params = [];
		var values = [];

		if(isNaN(req.query.code) || req.query.code < 0 || req.query.code > 9999){
			req.query.code = "";
		};

		if(req.query.code){
			params.push("code");
			values.push(req.query.code);
		};

		if(req.query.color){
			params.push("color");
			values.push(req.query.color);
		};

		if(req.query.brand){
			params.push("brand");
			values.push(req.query.brand);
		};

		try {
			if(req.query.name){
				const products = await Product.filter(req.query.name, params, values);
				res.send({ products });
			} else {
				const products = await Product.filter(false, params, values);
				res.send({ products });
			};
		} catch (err) {
			console.log(err);
			res.send({ msg: "Ocorreu um erro ao filtrar os produtos." });
		};
	},
	image: {
		add: async (req, res) => {
			if(!await userController.verifyAccess(req, res, ['adm','man','n/a'])){
				return res.send({ unauthorized: "Você não tem permissão para realizar esta ação!" });
			};

			const image = {
				product_id: req.body.product_id,
				url: req.body.image_url
			};

			try {
				await Product.image.add(image);
				res.send({ done: 'Imagem adicionada com sucesso!' });
			} catch (err) {
				console.log(err);
				res.send({ msg: "Ocorreu um erro ao incluir a imagem, favor contatar o suporte." });
			};
		},
		remove: async (req, res) => {
			if(!await userController.verifyAccess(req, res, ['adm','man'])){
				return res.send({ unauthorized: "Você não tem permissão para realizar esta ação!" });
			};

			try {
				await Product.image.remove(req.query.image_id);
				res.send({ done: 'Imagem excluída!' });
			} catch (err) {
				console.log(err);
				res.send({ msg: "Ocorreu um erro ao remover a imagem do produto, favor contatar o suporte." });
			};
		}
	},
	package: {
		show: async (req, res) => {
			// if(!await userController.verifyAccess(req, res, ['adm', 'man'])){
			// 	return res.redirect("/");
			// };

			let package = await Product.package.findById(req.params.id);
			package = { ...package[0] };
			package.images = await Product.package.image.list(package.id);
			let price = await Product.package.price.find({ category_id: 3, package_id: req.params.id });
			package.price = price[0].price;

			package.products = await Product.package.product.list(req.params.id);
			for(let i in package.products){
				package.products[i].product_info = lib.string.splitBy(package.products[i].product_info, " | ");
				package.products[i].code = package.products[i].product_info[0];
				package.products[i].name = package.products[i].product_info[1];
				package.products[i].color = package.products[i].product_info[2];
				package.products[i].size = package.products[i].product_info[3];
			};

			package.products = lib.sort(package.products, "code");
			
			try{
				res.render('catalog/show', { product: package });
			} catch (err) {
				console.log(err);
				res.send({ msg: "Ocorreu um erro ao realizar requisição." });
			};
		}
	},
	catalog: {
		filter: async (req, res) => {
			// if(!await userController.verifyAccess(req, res, ['adm', 'n/a'])){
				// return res.send({ unauthorized: "Você não tem permissão para realizar esta ação!" });
			// };

			var params = [];
			var values = [];

			if(isNaN(req.query.code) || req.query.code < 0 || req.query.code > 9999){
				req.query.code = "";
			};

			if(req.query.code){
				params.push("code");
				values.push(req.query.code);
			};

			if(req.query.name){
				params.push("name");
				values.push(req.query.name);
			};

			if(req.query.color){
				params.push("color");
				values.push(req.query.color);
			};

			if(req.query.brand){
				params.push("brand");
				values.push(req.query.brand);
			};

			let status = "Disponível";

			let product_inners = [
				["cms_wt_erp.product.id","cms_wt_erp.product_price.product_id"],
				["cms_wt_erp.product_price.category_id", req.query.price_category_id]
			];

			let package_inners = [
				["cms_wt_erp.product_package.id","cms_wt_erp.product_package_price.package_id"],
				["cms_wt_erp.product_package_price.category_id", req.query.price_category_id]
			];

			try {
				let products = await Product.catalog.filter(params, values, product_inners, status);
				let packages = await Product.package.catalog.filter(params, values, package_inners, status);
				res.send({ products: products, packages: packages });
			} catch (err) {
				console.log(err);
				res.send({ msg: "Ocorreu um erro ao filtrar os produtos." });
			};
		}
	},
	colorList: async (req, res) => {
		try {
			const colors = await Product.colorList();
			res.send({colors});
		} catch (err) {
			console.log(err);
			res.send({ msg: "Ocorreu um erro ao listar as cores, favor contatar o suporte." });
		};
	}
};

module.exports = productController;