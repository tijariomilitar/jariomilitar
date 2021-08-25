Catalog.product = {};

Catalog.product.find = async (product) => {
	let response = await fetch("/catalogo/product/find", {
		method: "POST",
		headers: {'Content-Type': 'application/json'},
	    body: JSON.stringify({ product })
	});
	response = await response.json();

	if(API.verifyResponse(response)){ return false };

	return response.product;
};