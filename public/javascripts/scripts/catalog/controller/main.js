Catalog.controller = {};

Catalog.controller.filter = document.getElementById("catalog-filter-form");
if(Catalog.controller.filter){
	Catalog.controller.filter.addEventListener("submit", async event => {
		event.preventDefault();

		let product = {
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

		const pagination = { pageSize: 30, page: 0};
		(function(){ lib.carousel.execute("catalog-filter-box", Catalog.view.filter, catalog_products, pagination); }());

		closeNav();
	});
}

Catalog.controller.category = {};

if(Catalog.controller.filter){
	Catalog.controller.category.select = Catalog.controller.filter.elements.namedItem("category");
	if(Catalog.controller.category.select){
		Catalog.controller.category.select.addEventListener("change", e => {
			document.getElementById("catalog-filter-form").elements.namedItem("name").value = e.target.value;
		});
	}
}

Catalog.controller.nav = {};

Catalog.controller.nav.filter = (option) => {
	document.getElementById("catalog-filter-form").elements.namedItem("name").value = option.value;
	document.getElementById("catalog-filter-form").elements.namedItem("category").value = "";
	Catalog.controller.filter.submit.click();
	option.parentNode.value = "";
};