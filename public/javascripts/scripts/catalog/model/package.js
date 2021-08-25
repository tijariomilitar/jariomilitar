Catalog.package = {};

Catalog.package.find = async (package) => {
	let response = await fetch("/catalogo/package/find", {
		method: "POST",
		headers: {'Content-Type': 'application/json'},
	    body: JSON.stringify({ package })
	});
	response = await response.json();

	if(API.verifyResponse(response)){ return false };

	return response.package;
};