const Catalog = {};

Catalog.filter = async (product) => {
	let response = await fetch("/catalogo/filter", {
		method: "POST",
		headers: {'Content-Type': 'application/json'},
	    body: JSON.stringify({ product })
	});
	response = await response.json();

	if(API.verifyResponse(response)){ return false };

	return response;
};