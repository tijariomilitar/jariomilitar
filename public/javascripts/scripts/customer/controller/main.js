Customer.controller = {};

Customer.controller.recover = document.getElementById("customer-recover-form");
if(Customer.controller.recover) {
	Customer.controller.recover.addEventListener("submit", async e => {
		e.preventDefault();

		const customer = {
			access: e.target.elements.namedItem("access").value
		};

		let response = await API.response(Customer.findByAccess, customer.access);
		if(!response) { return false };

		lib.display("customer-recover-response", "");

		Customer.view.recover(response.done);
	});
};

Customer.controller.password = document.getElementById("customer-password-form");
if(Customer.controller.password) {
	Customer.controller.password.addEventListener("submit", async e => {
		e.preventDefault();

		const customer = {
			token: e.target.elements.namedItem("token").value,
			password: e.target.elements.namedItem("password").value,
			password_confirm: e.target.elements.namedItem("password-confirm").value
		};

		let response = await API.response(Customer.updatePassword, customer);
		if(!response) { return false };

		document.getElementById("customer-password-form").remove();
		lib.display("customer-recover-response", "");

		Customer.view.updatedPassword(response.done);
	});
};