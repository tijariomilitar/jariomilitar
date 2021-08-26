const User = require("../model/user");
const userController = require("./user");
const Product = require("../model/product");

const lib = require("jarmlib");

const catalogController = {
	index: async (req, res) => {
		const productColors = await Product.colorList();
		res.render('catalog/index', { productColors: productColors });
	},
	retail: async (req, res) => {
		const productColors = await Product.colorList();
		res.render('catalog/retail', { productColors: productColors });
	},
	wholesale: async (req, res) => {
		const productColors = await Product.colorList();
		res.render('catalog/wholesale', { productColors: productColors });
	},
	agent: async (req, res) => {
		const productColors = await Product.colorList();
		res.render('catalog/agent', { productColors: productColors });
	},
	upsell: async (req, res) => {
		const productColors = await Product.colorList();
		res.render('catalog/upsell', { productColors: productColors });
	},
	filter: async (req, res) => {
		// if(!await userController.verifyAccess(req, res, ['adm','adm-man','adm-ass','adm-aud','pro-man','log-pac','COR-GER'])){
		// 	return res.send({ unauthorized: "Você não tem permissão para acessar!" });
		// };
		
		let product = new Product();
		product.code = req.body.product.code;
		product.name = req.body.product.name;
		product.color = req.body.product.color;
		product.brand = req.body.product.brand;
		product.price_category_id = req.body.product.price_category_id;

		let product_props = ["product.id","product.code","product.name","product.color","product.size","product.image"];
		let product_inners = [];

		let product_params = { keys: [], values: [] };
		let product_strict_params = { keys: [], values: [] };

		lib.Query.fillParam("product.code", product.code, product_params);
		lib.Query.fillParam("product.name", product.name, product_params);
		lib.Query.fillParam("product.color", product.color, product_strict_params);
		lib.Query.fillParam("product.brand", product.brand, product_params);
		lib.Query.fillParam("product.status", "Disponível", product_strict_params);

		let package_props = ["product_package.id","product_package.code","product_package.name","product_package.color","product_package.image"];
		let package_inners = [];

		let package_params = { keys: [], values: [] };
		let package_strict_params = { keys: [], values: [] };
		
		lib.Query.fillParam("product_package.code", product.code, package_params);
		lib.Query.fillParam("product_package.name", product.name, package_params);
		lib.Query.fillParam("product_package.color", product.color, package_strict_params);
		lib.Query.fillParam("product_package.brand", product.brand, package_params);
		lib.Query.fillParam("product_package.status", "Disponível", package_strict_params);
		
		if(product.price_category_id && product.price_category_id > 0){
			product_props.push("product_price.price","product_price.category_id");
			product_inners.push(["cms_wt_erp.product_price product_price","product_price.product_id","product.id"]);
			lib.Query.fillParam("product_price.category_id", product.price_category_id, product_strict_params);
			
			package_props.push("product_package_price.price","product_package_price.category_id");
			package_inners.push(["cms_wt_erp.product_package_price product_package_price","product_package_price.package_id","product_package.id"]);
			lib.Query.fillParam("product_package_price.category_id", product.price_category_id, package_strict_params);
		}

		let order_params = [ ["code","ASC"] ];

		try {
			let products = await Product.filter(product_props, product_inners, product_params, product_strict_params, order_params);
			let packages = await Product.package.filter(package_props, package_inners, package_params, package_strict_params, order_params);
			res.send({ products, packages });
		} catch (err) {
			console.log(err);
			res.send({ msg: "Ocorreu um erro ao filtrar as vendas, favor contatar o suporte" });
		};
	}
};

catalogController.product = {
	find: async (req, res) => {
		let product = new Product();
		product.id = req.body.product.id;
		product.price_category_id = req.body.product.price_category_id;

		let props = ["product.id","product.code","product.name","product.color","product.size","product.image"];
		let inners = [];

		let strict_params = { keys: [], values: [] };
		
		lib.Query.fillParam("product.id", product.id, strict_params);

		if(product.price_category_id && product.price_category_id > 0){
			props.push("product_price.price","product_price.category_id");
			inners.push(["cms_wt_erp.product_price product_price","product_price.product_id","product.id"]);
			lib.Query.fillParam("product_price.category_id", product.price_category_id, strict_params);
		}
		
		try{
			product = await Product.filter(props, inners, [], strict_params, []);
			product = { ...product[0] };
	
			product.images = await Product.image.list(product.id);

			res.send({ product });
		} catch (err) {
			console.log(err);
			res.send({ msg: "Ocorreu um erro ao realizar requisição." });
		};
	}
}

catalogController.package = {
	find: async (req, res) => {
		let package = new Product.package();
		package.id = req.body.package.id;
		package.price_category_id = req.body.package.price_category_id;

		let props = ["product_package.id","product_package.code","product_package.name","product_package.color","product_package.image"];
		let inners = [];

		let strict_params = { keys: [], values: [] };
		
		lib.Query.fillParam("product_package.id", package.id, strict_params);

		if(package.price_category_id && package.price_category_id > 0){
			props.push("product_package_price.price","product_package_price.category_id");
			inners.push(["cms_wt_erp.product_package_price product_package_price","product_package_price.package_id","product_package.id"]);
			lib.Query.fillParam("product_package_price.category_id", package.price_category_id, strict_params);
		}
		
		try{
			package = await Product.package.filter(props, inners, [], strict_params, []);
			package = { ...package[0] };
	
			package.images = await Product.package.image.list(package.id);

			let package_product_props = ["product.id","product.code","product.name","product.color","product.image","product_package_product.amount"];
			let package_product_inners = [ ["cms_wt_erp.product product","product_package_product.product_id","product.id"] ];

			let package_product_params = { keys: [], values: [] };
			let package_product_strict_params = { keys: [], values: [] };

			lib.Query.fillParam("product_package_product.package_id", package.id, package_product_strict_params);

			let order_params = [ ["product.code","ASC"] ];

			package.products = await Product.package.product.filter(package_product_props, package_product_inners, package_product_params, package_product_strict_params, []);

			res.send({ package });
		} catch (err) {
			console.log(err);
			res.send({ msg: "Ocorreu um erro ao realizar requisição." });
		};
	}
}

module.exports = catalogController;