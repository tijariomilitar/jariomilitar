Catalog.product.view = {};

Catalog.product.view.show = (product) => {
	let html = "";

	html += "<div class='box b1 container'>";
	if(!product.images.length){
		html += "<div data-js='product-carousel' class='box b1 ground margin-top-15 center display-none display-block' style='background-image: url(/images/product/no-product.png)'>";
			html += "<img class='image-box' src='/images/product/no-product.png'>";		
		html += "</div>";
	} else {
		html += "<div data-js='product-carousel' class='box b1 ground margin-top-15 display-none display-block'>";
			html += "<div class='center relative'><img class='image-box' src='"+product.images[0].url+"'></div>";
		html += "</div>";
		for(let i in product.images){
			if(i > 0){
				html += "<div data-js='product-carousel' class='box b1 ground margin-top-15 display-none'>";
					html += "<div class='center relative'><img class='image-box center' src='"+product.images[i].url+"'></div>";
				html += "</div>";
			}
		}
		html += "<div id='product-carousel-navigation' class='box b1 ground container padding-10 center'>";
			html += "<div class='mobile-box b5'></div>";
			html += "<button data-js='product-carousel-prev' name='carousel-prev' class='mobile-box b5 noborder'><img class='height-40 icon pointer' src='/images/icon/prev.png'></button>";
			html += "<div class='mobile-box b5'></div>";
			html += "<button data-js='product-carousel-next' name='carousel-next' class='mobile-box b5 noborder'><img class='height-40 icon pointer' src='/images/icon/next.png'></button>";
		html += "</div>";
	}
	html += "</div>";

	document.getElementById("catalog-product-show-div").innerHTML = html;
	document.getElementById("catalog-product-show-box").style.display = "";

	html = "";
	html += "<div class='box b1 avant-garde em40 center padding-10 bold'>"+product.name+" - "+product.color+"</div>";
	if(product.price){
		html += "<div class='box b1 avant-garde em25 italic center padding-10 bold' style='color:#467846;'>R$"+product.price+"</div>";
	}

	document.getElementById("catalog-product-info-box").innerHTML = html;
};