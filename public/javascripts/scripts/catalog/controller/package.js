Catalog.package.controller = {};

Catalog.package.controller.show = async (package_id, catalog_id) => {
	window.location.href = `/catalogo/pacote/${package_id}/${catalog_id || 0}`;
};