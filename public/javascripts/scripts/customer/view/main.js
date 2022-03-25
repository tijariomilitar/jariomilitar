Customer.view = {};

Customer.view.recover = (message) => {
	let message_box = document.getElementById("customer-recover-response");
	message_box.innerHTML = "";

	let message_div = lib.element.create("div", { class: "box b3 container ground border padding-10" });

	message_div.appendChild(lib.element.create("div", { class: "box b1 em09 container ground border padding-10" }, message));
	message_div.appendChild(lib.element.create("div", {
		class: "right em09 container ground margin-top-10 underline-link pointer",
		onclick: "lib.openExternalLink('https://api.whatsapp.com/send?phone=5521999659635&text=Ol%C3%A1%2C%20preciso%20cadastrar%20meu%20e-mail%20para%20acessar%20meu%20perfil%20de%20lojista.')"
	}, "Contatar consultor"));

	message_box.appendChild(message_div);
}

Customer.view.updatedPassword = (message) => {
	let message_box = document.getElementById("customer-recover-response");
	message_box.innerHTML = "";

	let message_div = lib.element.create("div", { class: "box b3 container ground border padding-10" });

	message_div.appendChild(lib.element.create("div", { class: "box b1 em09 padding-10" }, message));
	message_div.appendChild(lib.element.create("div", { 
		class: "em09 padding-10 underline-link pointer", 
		onclick: "window.location.href='/lojista/login'" 
	}, "Realizar login"));

	message_box.appendChild(message_div);
};