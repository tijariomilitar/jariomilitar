Product.view.catalog = {};

Product.view.catalog.filter = async (products, pagination) => {
	var html = "";
	for(let i in products){
		if(!products[i].pack){
			html += "<div class='box b2 container ground pointer padding-10 margin-top-5 shadow-hover' onclick='window.location.href=`/product/show/"+products[i].product_id+"`'>";
		} else {
			html += "<div class='box b2 container ground pointer padding-10 margin-top-5 shadow-hover' onclick='window.location.href=`/product/package/show/"+products[i].package_id+"`'>";
		};
		if(products[i].image){
			html += "<div class='mobile-box b4 center'><img class='height-100' src='"+products[i].image+"' alt=''/></div>";
		} else {
			html += "<div class='mobile-box b4 center'><img class='height-100' src='/images/product/no-product.png' alt=''/></div>";
		};
		html += `<div class="mobile-box b2 avant-garde center em12 italic bold" style="color:#323232;">`+products[i].name+` - `+products[i].color+`</div>`;
		html += "<div class='mobile-box b4 center padding-5 container'>";
			// html += "<div class='mobile-box b1 em08 italic'>À vista</div>";
			html += "<div class='mobile-box b1 em14 center italic bold' style='color:#467846;'>$"+products[i].price.toFixed(2)+"</div>";
		html += "</div>";
		// html += "<div class='mobile-box b4 center border-left padding-5 container'>";
		// 	html += "<div class='mobile-box b1 em08 italic'>30 dias</div>";
		// 	html += "<div class='mobile-box b1 em10 center italic bold' style='color:#467846;'>$"+(products[i].price * 1.06).toFixed(2)+"</div>";
		// html += "</div>";
		// html += "<div class='mobile-box b4 center border-left padding-5 container'>";
		// 	html += "<div class='mobile-box b1 em08 italic'>60 dias</div>";
		// 	html += "<div class='mobile-box b1 em10 center italic bold' style='color:#467846;'>$"+(products[i].price * 1.09).toFixed(2)+"</div>";
		// html += "</div>";
		// html += "<div class='mobile-box b4 center border-left padding-5 container'>";
		// 	html += "<div class='mobile-box b1 em08 italic'>90 dias</div>";
		// 	html += "<div class='mobile-box b1 em10 center italic bold' style='color:#467846;'>$"+(products[i].price * 1.12).toFixed(2)+"</div>";
		// html += "</div>";
		html += "</div>";
	};
	document.getElementById("product-catalog-filter-table").innerHTML = html;

	html = "";
	for (let i = pagination.page * pagination.pageSize; i < products.length && i < (pagination.page + 1) * pagination.pageSize; i++){
		if(!products[i].pack){
			html += "<div class='box b3 container ground pointer padding-10 margin-top-5 shadow-hover' onclick='window.location.href=`/product/show/"+products[i].product_id+"`'>";
		} else {
			html += "<div class='box b3 container ground pointer padding-10 margin-top-5 shadow-hover' onclick='window.location.href=`/product/package/show/"+products[i].package_id+"`'>";
		};
		html += "<div class='container'>";
		if(products[i].image){
			html += "<div class='box one'><img class='image-card' src='"+products[i].image+"' alt=''/></div>";
		} else {
			html += "<div class='box one'><img class='image-card' src='/images/product/no-product.png' alt=''/></div>";
		};
		html += `<div class="box one avant-garde center em10 padding-10 bold" style="color:#323232;">`+products[i].name+` - `+products[i].color+`</div>`;
		// if(products[i].announcement){
		// 	html += `<div class="box one avant-garde box-hover center em10 padding-10 radius-10" onclick="lib.openExternalLink('`+products[i].announcement+`')">Ver no Site</div>`;
		// };
		html += "<div class='box one em15 center italic bold' style='color:#467846;'>$"+products[i].price.toFixed(2)+"</div>"
		html += "</div>";
		html += "</div>";
	};
	document.getElementById("product-catalog-container").innerHTML = html;
};

Product.view.catalog.card = {
	image: {
		show: (images, pagination, params) => {
			let html = "";
		    if(images.length){
			    for (let i = pagination.page * pagination.pageSize; i < images.length && i < (pagination.page + 1) * pagination.pageSize;i++){
					document.getElementById("product-"+images[i].product_id+"-catalog-card-img").src = images[i].url;
				};
		    } else {
				document.getElementById("product-"+params[0]+"-catalog-card-img").src = "/images/product/no-product.png";
		    };
		}
	}
};