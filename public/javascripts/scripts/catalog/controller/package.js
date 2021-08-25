Catalog.package.controller = {};

Catalog.package.controller.show = async (package_id, price_category_id) => {
	let package = await API.response(Catalog.package.find, { id: package_id, price_category_id: price_category_id });
	if(!package) { return false; }

	document.getElementById("catalog-filter-box").style.display = "none";

	Catalog.package.view.show(package);

	lib.carousel.render("package-carousel");
};