const Customer = {};

Customer.findByAccess = async (customer_access) => {
	let response = await fetch("/lojista/recover/"+customer_access);
	response = await response.json();
	
	if(API.verifyResponse(response)){ return false };

	return response;
};

Customer.updatePassword = async (customer) => {
	let response = await fetch("/lojista/recover/update", {
		method: "POST",
		headers: {'Content-Type': 'application/json'},
	    body: JSON.stringify(customer)
	});
	response = await response.json();

	if(API.verifyResponse(response)){ return false };
	alert(response.done);

	return response;
};