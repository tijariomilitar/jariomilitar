Catalog.controller = {};

Catalog.controller.filter = document.getElementById("catalog-filter-form");
if(Catalog.controller.filter){
	Catalog.controller.filter.addEventListener("submit", async event => {
		event.preventDefault();

		let product = {
			code: event.target.elements.namedItem("code").value,
			name: event.target.elements.namedItem("name").value,
			color: event.target.elements.namedItem("color").value,
			brand: "J.A Rio Militar",
			price_category_id: event.target.elements.namedItem("price-category-id").value
		};

		let response = await API.response(Catalog.filter, product);
		if(!response) { return false; }
		
		let catalog_products = [...response.products];

		for(let i in response.packages){
			response.packages[i].pack = true;
			catalog_products.push(response.packages[i]);
		};

		catalog_products = lib.sort(catalog_products, "code");

		document.getElementById("catalog-product-show-box").style.display = "none";

		const pagination = { pageSize: 30, page: 0};
		(function(){ lib.carousel.execute("catalog-filter-box", Catalog.view.filter, catalog_products, pagination); }());

		closeNav();
	});
}