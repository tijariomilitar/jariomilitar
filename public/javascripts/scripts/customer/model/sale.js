const Sale = {};

Sale.filter = async (sale) => {
	let response = await fetch("/lojista/sale/filter", {
		method: "POST",
		credentials: "same-origin",
		headers: {'Content-Type': 'application/json'},
	    body: JSON.stringify(sale)
	});
	response = await response.json();

	if(API.verifyResponse(response)){ return false };

	return response;
};

Sale.findById = async (sale_id) => {
	let response = await fetch("/lojista/sale/findById/"+sale_id, {
		credentials: "same-origin"
	});
	response = await response.json();
	
	if(API.verifyResponse(response)){ return false };

	return response;
};