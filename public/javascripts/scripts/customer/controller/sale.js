Sale.controller = {};

Sale.controller.filter = document.getElementById("sale-filter-form");
if(Sale.controller.filter){
	Sale.controller.filter.addEventListener("submit", async event => {
		event.preventDefault();

		let sale = {
			periodStart: lib.dateToTimestamp(event.target.elements.namedItem("periodStart").value),
			periodEnd: lib.dateToTimestamp(event.target.elements.namedItem("periodEnd").value),
			status: event.target.elements.namedItem("status").value
		};

		let sales = await API.response(Sale.filter, sale);
		if(!sales) { return false; }

		lib.display("sale-filter-box", "");
		lib.display("sale-filter-container", "");
		lib.display("sale-show-box", "none");

		const pagination = { pageSize: 8, page: 0 };
		(function(){ lib.carousel.execute("sale-filter-box", Sale.view.filter, sales, pagination); }());

		Sale.view.statistics(sales);
	});
};

Sale.controller.show = async (sale_id) => {
	let sale = await API.response(Sale.findById, sale_id);
	if(!sale) { return false; }

	lib.display("sale-filter-box", "none");
	lib.display("sale-filter-container", "none");
	lib.display("sale-show-box", "");

	Sale.view.show(sale);
};