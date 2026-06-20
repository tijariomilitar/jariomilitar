const Customer = {};

Customer.findByAccess = async (customer_access) => {
	let response = await fetch("/lojista/recover", {
		method: "POST",
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ access: customer_access })
	});

	let data = null;
	try {
		data = await response.json();
	} catch (err) {
		return false;
	}

	if (API.verifyResponse(data)) { return false; }

	return data;
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