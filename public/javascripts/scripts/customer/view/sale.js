Sale.view = {};

Sale.view.filter = (sales, pagination) => {
	let filter_div = document.getElementById("sale-filter-div");
	filter_div.innerHTML = "";

	if(sales.length){
		for (let i = pagination.page * pagination.pageSize; i < sales.length && i < (pagination.page + 1) * pagination.pageSize; i++){
			let sale_div = lib.element.create("div", { class: "box b1 container padding-5 margin-top-5 border-st shadow-st-hover transition-03-03 radius-5 pointer noselect" } );

			sale_div.appendChild(lib.element.create("div", { class: "mobile-box b12 lucida-grande bold padding-2 center" }, sales[i].id) );
			sale_div.appendChild(lib.element.info("b4 em09 lucida-grande", "Status", sales[i].status ))
			sale_div.appendChild(lib.element.info("b4 em09 lucida-grande", "Início da negociação", lib.timestampToDate(sales[i].sale_date) ))
			sale_div.appendChild(lib.element.info("b4 em09 lucida-grande", "Conf. do pagamento", lib.convertDatetime(lib.timestampToDatetime(sales[i].payment_confirmation_date)) || 'Ag. pagamento' ))
			sale_div.appendChild(lib.element.info("b6 em09 lucida-grande bold", "Valor total", `R$${sales[i].value.toFixed(2)}` ))

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