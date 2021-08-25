Catalog.product.controller = {};

Catalog.product.controller.show = async (product_id, price_category_id) => {
	let product = await API.response(Catalog.product.find, { id: product_id, price_category_id: price_category_id });
	if(!product) { return false; }

	document.getElementById("catalog-filter-box").style.display = "none";

	Catalog.product.view.show(product);

	lib.carousel.render("product-carousel");
};