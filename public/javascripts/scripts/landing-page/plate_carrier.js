const Lead = {};

Lead.save = async lead => {
	let response = await fetch("/lead/save", {
		method: "POST",
		headers: {'Content-Type': 'application/json'},
	    body: JSON.stringify(lead)
	});
	response = await response.json();

	if(API.verifyResponse(response)){ return false };
	alert(response.done);

	return response.lead;
};

lib.getElById = (element) => {
	return document.getElementById(element);
};

if(lib.getElById("lead-save-form")){
	lib.getElById("lead-save-form").addEventListener("submit", async event=> {
		event.preventDefault();

		let lead = {
			name: event.target.elements.namedItem("name").value,
			email: event.target.elements.namedItem("email").value
		};

		let response = await Lead.save(lead);

		console.log(response);
	});
}