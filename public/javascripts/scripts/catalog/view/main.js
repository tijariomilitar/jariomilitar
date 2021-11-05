Catalog.view = {};

Catalog.view.filter = (products, pagination) => {
	var html = "";
	if(products.length){
		for (let i = pagination.page * pagination.pageSize; i < products.length && i < (pagination.page + 1) * pagination.pageSize; i++){
			if(!products[i].pack){
				html += "<div class='box b5 container ground margin-top-10 padding-10 pointer shadow-2-hover' onclick='Catalog.product.controller.show(`"+products[i].id+"`, `"+products[i].category_id+"`)'>";
			} else {
				html += "<div class='box b5 container ground margin-top-10 padding-10 pointer shadow-2-hover' onclick='Catalog.package.controller.show(`"+products[i].id+"`, `"+products[i].category_id+"`)'>";
			};
			if(products[i].image){
				html += "<div class='box b1'><img class='image-card' src='"+products[i].image+"' alt=''/></div>";
			} else {
				html += "<div class='box b1'><img class='image-card' src='/images/product/no-product.png' alt=''/></div>";
			};
			html += `<div class="box b1 avant-garde center padding-10 bold" style="color:#323232;">`+products[i].name+` - `+products[i].color+`</div>`;
			if(products[i].price){ html += "<div class='box b1 em15 center italic bold' style='color:#467846;'>R$"+products[i].price.toFixed(2)+"</div>" }
			html += "</div>";
		};
		document.getElementById("catalog-filter-div").innerHTML = html;
		document.getElementById("catalog-filter-box").style.display = "";
	} else {
		document.getElementById("catalog-filter-div").innerHTML = "<div class='box b1 margin-top-10 padding-10 center'>Não foram encotrados resultados</div>";
		document.getElementById("catalog-filter-box").style.display = "";
	};
}

html += "<div class='box b5 container ground margin-top-10 padding-10 pointer shadow-2-hover' onclick='Catalog.product.controller.show(`"+products[i].id+"`, `"+products[i].category_id+"`)'>";
	html += "<div class='box b1'><img class='image-card' src='"+products[i].image+"' alt=''/></div>";
	html += "<div class='box b1'><img class='image-card' src='/images/product/no-product.png' alt=''/></div>";
html += `<div class="box b1 avant-garde center padding-10 bold" style="color:#323232;">`+products[i].name+` - `+products[i].color+`</div>`;
if(products[i].price){ html += "<div class='box b1 em15 center italic bold' style='color:#467846;'>R$"+products[i].price.toFixed(2)+"</div>" }
html += "</div>";