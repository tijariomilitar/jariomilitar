Product.controller.catalog = {};

Product.controller.catalog.filter = document.getElementById("product-catalog-filter-form");
if(Product.controller.catalog.filter){
	Product.controller.catalog.filter.addEventListener("submit", async (event) => {
		event.preventDefault();

		let product = {
			name: event.target.elements.namedItem("name").value,
			code: event.target.elements.namedItem("code").value,
			color: event.target.elements.namedItem("color").value,
			brand: "J.A Rio Militar",
			price_category_id: 3
		};

		document.getElementById('ajax-loader').style.visibility = 'visible';
		let response = await Product.catalog.filter(product);
		document.getElementById('ajax-loader').style.visibility = 'hidden';
		if(!response){ return false };

		let catalog_products = [...response.products];

		for(let i in response.packages){
			response.packages[i].pack = true;
			catalog_products.push(response.packages[i]);
		};

		catalog_products = lib.sort(catalog_products, "code");

		const pagination = { pageSize: 21, page: 0};
		(function(){ lib.carousel.execute("product-catalog-filter-box", Product.view.catalog.filter, catalog_products, pagination); }());

		closeNav();
	});
};