Catalog.view = {};

Catalog.view.filter = (products, pagination) => {
	let filter_box = document.getElementById("catalog-filter-box");
	let filter_div = document.getElementById("catalog-filter-div");
	filter_div.innerHTML = "";

	if (products.length) {
		for (let i = pagination.page * pagination.pageSize; i < products.length && i < (pagination.page + 1) * pagination.pageSize; i++) {
			let div_product = lib.element.create("div", { class: "box b3 container ground margin-top-10 padding-10 pointer shadow-st-hover border transition-04-04 radius-5 noselect pointer" });

			!products[i].pack && div_product.addEventListener('click', () => { Catalog.product.controller.show(products[i].id, products[i].category_id) });
			products[i].pack && div_product.addEventListener('click', () => { Catalog.package.controller.show(products[i].id, products[i].category_id || 0) });

			products[i].image && div_product.appendChild(lib.element.create("img", {
				class: "mobile-box b2 image-card height-300 center",
				src: products[i].image
			}));

			!products[i].image && div_product.appendChild(lib.element.create("img", {
				class: "mobile-box b2 image-card height-300 center",
				src: '/images/product/no-product.png'
			}));

			let div_info = lib.element.create("div", { class: "mobile-box b2 container padding-10 opacity-out-07 transition-04-04 center h-center" });
			products[i].name && div_info.appendChild(lib.element.create("div", { class: "box b1 em11 lucida-grande bold underline" }, `${products[i].code} | ${products[i].name}`))
			products[i].color && div_info.appendChild(lib.element.create("div", { class: "mobile-box b1 em09 lucida-grande bold padding-3" }, products[i].color))
			products[i].price && div_info.appendChild(lib.element.create("div", { class: "mobile-box b1 em14 lucida-grande bold padding-3" }, `R$${products[i].price}`));
			div_product.appendChild(div_info);

			filter_div.appendChild(div_product);
		};
		filter_box.style.display = "";
	} else {
		filter_div.innerHTML = "Sem resultados";
		filter_box.style.display = "";
	};
};