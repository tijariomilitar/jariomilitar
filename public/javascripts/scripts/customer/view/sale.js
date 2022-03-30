Sale.view = {};

Sale.view.filter = (sales, pagination) => {
	let filter_div = document.getElementById("sale-filter-div");
	filter_div.innerHTML = "";

	if(sales.length){
		for (let i = pagination.page * pagination.pageSize; i < sales.length && i < (pagination.page + 1) * pagination.pageSize; i++){
			let sale_div = lib.element.create("div", { 
				class: "box b1 container padding-5 margin-top-5 border-st transition-03-03 box-hover radius-5 pointer noselect",
				onclick: "Sale.controller.show("+sales[i].id+")"
			});

			sale_div.appendChild(lib.element.create("div", { class: "mobile-box b10 lucida-grande bold padding-2 center" }, sales[i].id) );
			sale_div.appendChild(lib.element.createInfo("mobile-box b3-10 em09 lucida-grande padding-5 v-center", "Status", sales[i].status ))
			sale_div.appendChild(lib.element.createInfo("mobile-box b4-10 em09 lucida-grande padding-5 v-center", "Conf. do pagamento", lib.convertDatetime(lib.timestampToDatetime(sales[i].payment_confirmation_date)) || 'Ag. pagamento' ))
			sale_div.appendChild(lib.element.createInfo("mobile-box b5 em09 center", "Valor total", `R$${sales[i].value.toFixed(2)}` ))

			filter_div.appendChild(sale_div);
		};
	} else {
		let sale_div = lib.element.create("div", { class: "box b1 container center noselect" } );
		sale_div.appendChild(lib.element.create("div", { class: "box b1 lucida-grande bold center" }, "Você ainda não realizou nenhuma compra."));
		filter_div.appendChild(sale_div);
	};
};

Sale.view.statistics = (sales) => {
	let statistics_div = document.getElementById("sale-filter-statistics");
	statistics_div.innerHTML = "";

	let statistics = {
		saleValue: 0,
		shipmentValue: 0,
		discountValue: 0,
		totalValue: 0
	};

	for(let i in sales) {
		statistics.saleValue += parseFloat(sales[i].product_value);
		statistics.saleValue += parseFloat(sales[i].package_value);
		statistics.shipmentValue += parseFloat(sales[i].shipment_value);
		statistics.discountValue += parseFloat(sales[i].discount_value);
		statistics.totalValue += parseFloat(sales[i].value);
	};

	let saleValue_div = lib.element.create("div", { class: "mobile-box b2 container height-100 border-lg-st margin-top-5 radius-5" });
	let saleValue_info = lib.element.create("div", { class: "box a1 container height-50 center noselect" });
	saleValue_info.appendChild(lib.element.create("p", { class: "box b1 em07 lucida-grande bold center" }, "Compras"));
	saleValue_info.appendChild(lib.element.create("p", { class: "box b1 lucida-grande bold center" }, `R$${statistics.saleValue.toFixed(2)}` ));
	saleValue_div.appendChild(saleValue_info);
	statistics_div.appendChild(saleValue_div);

	let shipmentValue_div = lib.element.create("div", { class: "mobile-box b2 container height-100 border-lg-st margin-top-5 radius-5" });
	let shipmentValue_info = lib.element.create("div", { class: "box a1 container height-50 center noselect" });
	shipmentValue_info.appendChild(lib.element.create("p", { class: "box b1 em07 lucida-grande bold center" }, "Frete"));
	shipmentValue_info.appendChild(lib.element.create("p", { class: "box b1 lucida-grande bold center" }, `R$${statistics.shipmentValue.toFixed(2)}` ));
	shipmentValue_div.appendChild(shipmentValue_info);
	statistics_div.appendChild(shipmentValue_div);

	let discountValue_div = lib.element.create("div", { class: "mobile-box b2 container height-100 border-lg-st margin-top-5 radius-5" });
	let discountValue_info = lib.element.create("div", { class: "box a1 container height-50 center noselect" });
	discountValue_info.appendChild(lib.element.create("p", { class: "box b1 em07 lucida-grande bold center" }, "Descontos"));
	discountValue_info.appendChild(lib.element.create("p", { class: "box b1 lucida-grande bold center" }, `R$${statistics.discountValue.toFixed(2)}` ));
	discountValue_div.appendChild(discountValue_info);
	statistics_div.appendChild(discountValue_div);

	let totalValue_div = lib.element.create("div", { class: "mobile-box b2 container height-100 border-lg-st margin-top-5 radius-5" });
	let totalValue_info = lib.element.create("div", { class: "box a1 container height-50 center noselect" });
	totalValue_info.appendChild(lib.element.create("p", { class: "box b1 em07 lucida-grande bold center" }, "Valor total"));
	totalValue_info.appendChild(lib.element.create("p", { class: "box b1 lucida-grande bold center" }, `R$${statistics.totalValue.toFixed(2)}` ));
	totalValue_div.appendChild(totalValue_info);
	statistics_div.appendChild(totalValue_div);
};

Sale.view.show = (sale) => {
	let sale_box = document.getElementById("sale-show-div");
	sale_box.innerHTML = "";

	sale_box.appendChild(lib.element.create("div", { class: "box b1 lucida-grande bold underline margin-top-10 center" }, "Pedido: "+sale.id));

	let sale_info_div = lib.element.create("div", { class: "box b2 container padding-5 margin-top-5" });
	sale_info_div.appendChild(lib.element.create("div", { class: "box b1 lucida-grande bold underline center" }, "Informações da venda"));
	sale_info_div.appendChild(lib.element.info("b3-7 lucida-grande em09", "Data da venda", `${lib.timestampToDate(sale.sale_date)}` ));
	sale.nf.length < 20 &&sale_info_div.appendChild(lib.element.info("b4-7 em09", "Status", `${sale.status}` ));
	sale.nf.length > 20 &&sale_info_div.appendChild(lib.element.info("b3-7 em09", "Status", `${sale.status}` ));
	sale.nf.length > 20 && sale_info_div.appendChild(lib.element.icon('b7', 30, "https://spaces.jariomilitar.com/erp-images/icon/nf-e.png", "lib.openExternalLink('"+sale.nf+"')"));
	sale_info_div.appendChild(lib.element.info("b2 em09", "Método de pagamento", `${sale.payment_method || ''}` ));
	sale_info_div.appendChild(lib.element.info("b2 em09", "Prazo de pagamento", `${sale.payment_period || ''}` ));
	sale_info_div.appendChild(lib.element.info("b1 em09", "Vendedor(a)", `${sale.user_name}` ));
	
	sale_info_div.appendChild(lib.element.create("div", { class: "box b1 lucida-grande bold margin-top-10 underline center" }, "Logística de envio"));
	sale_info_div.appendChild(lib.element.info("b1 em09", "Método de envio", `${sale.shipment_method}` ));
	sale.payment_confirmation_date && sale_info_div.appendChild(lib.element.info("b1 em09", "Confirmação do pagamento", `${lib.convertDatetime(lib.timestampToDatetime(sale.payment_confirmation_date)) || ''}` ));
	sale.packment_confirmation_date && sale_info_div.appendChild(lib.element.info("b3-4 em09", "Data do embalo", `${lib.convertDatetime(lib.timestampToDatetime(sale.packment_confirmation_date)) || ''}` ));
	sale.packment_confirmation_date && sale_info_div.appendChild(lib.element.info("b4 em09", "Volumes", `${sale.box_amount || ''}` ));
	sale.shipment_confirmation_date && sale_info_div.appendChild(lib.element.info("b1 em09", "Data do envio", `${lib.convertDatetime(lib.timestampToDatetime(sale.shipment_confirmation_date)) || ''}` ));
	sale_box.appendChild(sale_info_div);

	let financial_info_div = lib.element.create("div", { class: "box b2 container padding-5 margin-top-5" });
	financial_info_div.appendChild(lib.element.create("div", { class: "box b1 lucida-grande bold underline center" }, "Peso dos produtos"));
	financial_info_div.appendChild(lib.element.create("div", { class: "mobile-box b2 em09 margin-top-10" }, "Peso total:"))
	financial_info_div.appendChild(lib.element.create("div", { class: "mobile-box b2 em09 margin-top-10" }, `${(sale.weight/1000).toFixed(1)}kg`))

	financial_info_div.appendChild(lib.element.create("div", { class: "box b1 lucida-grande bold margin-top-10 underline center" }, "Financeiro"));
	financial_info_div.appendChild(lib.element.create("div", { class: "mobile-box b2 em09 margin-top-10" }, "Produtos:"));
	financial_info_div.appendChild(lib.element.create("div", { class: "mobile-box b2 em09 margin-top-10" }, `R$${sale.product_value}`))
	financial_info_div.appendChild(lib.element.create("div", { class: "mobile-box b2 em09 margin-top-10" }, "Pacotes:"));
	financial_info_div.appendChild(lib.element.create("div", { class: "mobile-box b2 em09 margin-top-10" }, `R$${sale.package_value}`))
	financial_info_div.appendChild(lib.element.create("div", { class: "mobile-box b2 em09 margin-top-10" }, "Frete:"));
	financial_info_div.appendChild(lib.element.create("div", { class: "mobile-box b2 em09 margin-top-10" }, `R$${sale.shipment_value}`))
	financial_info_div.appendChild(lib.element.create("div", { class: "mobile-box b2 em09 margin-top-10" }, "Desconto:"));
	financial_info_div.appendChild(lib.element.create("div", { class: "mobile-box b2 em09 margin-top-10" }, `R$${sale.discount_value}`))
	
	financial_info_div.appendChild(lib.element.create("div", { class: "mobile-box b3" }));
	financial_info_div.appendChild(lib.element.create("div", { class: "mobile-box b2-3 underline" }));

	financial_info_div.appendChild(lib.element.create("div", { class: "mobile-box b2 em09" }, "Total:"));
	financial_info_div.appendChild(lib.element.create("div", { class: "mobile-box b2 em09 bold lucida-grande" }, `R$${sale.value}`))
	sale_box.appendChild(financial_info_div);

	let product_section = lib.element.create("div", { class: "box b1 container margin-top-5" });

	let product_box = lib.element.create("div", { class: "box b2 container ground border padding-5 margin-top-5" });
	product_box.appendChild(lib.element.create("div", { class: "box b1 lucida-grande bold underline center" }, "Produtos"));
	for(let i in sale.products){
		let product_div = lib.element.create("div", { class: "box b1 container ground box-hover border-explicit padding-10 margin-top-5" });
		product_div.appendChild(lib.element.create("div", { class: "mobile-box b4-7 em09 v-center" }, sale.products[i].product_info));
		product_div.appendChild(lib.element.create("div", { class: "mobile-box b7 lucida-grande center bold", style: "color:#060;" }, sale.products[i].amount+"un"));
		product_div.appendChild(lib.element.create("div", { class: "mobile-box b7 em09 center" }, "R$"+sale.products[i].price));
		product_div.appendChild(lib.element.create("div", { class: "mobile-box b7 em09 center" }, "R$"+(sale.products[i].amount * sale.products[i].price).toFixed(2) ));
		product_box.appendChild(product_div);
	};
	product_section.appendChild(product_box);

	let package_box = lib.element.create("div", { class: "box b2 container ground border padding-5 margin-top-5" });
	package_box.appendChild(lib.element.create("div", { class: "box b1 lucida-grande bold underline center" }, "Pacotes"));

	for(let i in sale.packages){
		let package_div = lib.element.create("div", { class: "box b1 container ground border-explicit padding-10 margin-top-5" });
		let package_info = lib.element.create("div", { class: "box b1 container" });
		package_info.appendChild(lib.element.create("img", {
			src: "https://spaces.jariomilitar.com/erp-images/icon/down-arrow.png", 
			class: "mobile-box b8 size-25 icon center pointer",
			onclick: "lib.displayDiv('package-"+sale.packages[i].package_id+"', this, 'https://spaces.jariomilitar.com/erp-images/icon/down-arrow.png', 'https://spaces.jariomilitar.com/erp-images/icon/up-arrow.png')"
		}, `P${sale.packages[i].package_id}`));

		package_info.appendChild(lib.element.create("div", { class: "mobile-box b2 em09 center v-center" }, sale.packages[i].info));
		package_info.appendChild(lib.element.create("div", { class: "mobile-box b3-8 center" }, sale.packages[i].setup));
		package_info.appendChild(lib.element.create("div", { class: "mobile-box b3 lucida-grande center bold" }, sale.packages[i].amount+"un"));
		package_info.appendChild(lib.element.create("div", { class: "mobile-box b3 em09 center" }, "R$"+sale.packages[i].price.toFixed(2) ));
		package_info.appendChild(lib.element.create("div", { class: "mobile-box b3 em09 center" }, "R$"+(sale.packages[i].amount * sale.packages[i].price).toFixed(2) ));
		package_div.appendChild(package_info);

		let package_product_box = lib.element.create("div", { 
			id: "package-"+sale.packages[i].package_id,
			class: "box b1 container",
			style: "display:none;"
		});

		for(let j in sale.packages[i].products) {
			let package_product_div = lib.element.create("div", { class: "box b1 container border box-hover padding-5 margin-top-5 box-hover" });
			package_product_div.appendChild(lib.element.create("div", { class: "mobile-box b5 lucida-grande center bold", style: "color:#060;" }, sale.packages[i].products[j].amount+"un" ));
			package_product_div.appendChild(lib.element.create("div", { class: "mobile-box b4-5 em09 v-center" }, sale.packages[i].products[j].product_info ));
			package_product_box.appendChild(package_product_div);
		};

		package_div.appendChild(package_product_box);
		package_box.appendChild(package_div);
	};
	
	product_section.appendChild(package_box);
	sale_box.appendChild(product_section);
};