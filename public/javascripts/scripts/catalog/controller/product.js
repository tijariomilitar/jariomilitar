Catalog.product.controller = {};

Catalog.product.controller.show = async (product_id, catalog_id) => {
	window.location.href = `/catalogo/produto/${product_id}/${catalog_id || 0}`;
};