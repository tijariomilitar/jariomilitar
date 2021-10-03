Catalog.package.view = {};

Catalog.package.view.show = (package) => {
	let html = "";

	html += "<div class='box b1 container'>";
	if(!package.images.length){
		html += "<div data-js='package-carousel' class='box b1 ground margin-top-15 center display-none display-block' style='background-image: url(/images/product/no-product.png)'>";
			html += "<img class='image-box' src='/images/product/no-product.png'>";		
		html += "</div>";
	} else {
		html += "<div data-js='package-carousel' class='box b1 ground margin-top-15 display-none display-block'>";
			// html += "<div class='center relative'><img class='image-box' src='"+package.images[0].url+"'></div>";
			html += "<figure class='box b2 zoom center relative' onmousemove='lib.image.zoom(event)' style='background-image: url("+package.images[0].url+")'>";
			  html += "<img class='image-fit center' src='"+package.images[0].url+"' />";
			html += "</figure>";
		html += "</div>";
		for(let i in package.images){
			if(i > 0){
				html += "<div data-js='package-carousel' class='box b1 ground margin-top-15 display-none'>";
					// html += "<div class='center relative'><img class='image-box center' src='"+package.images[i].url+"'></div>";
					html += "<figure class='box b2 zoom center relative' onmousemove='lib.image.zoom(event)' style='background-image: url("+package.images[i].url+")'>";
					  html += "<img class='image-fit center' src='"+package.images[i].url+"' />";
					html += "</figure>";
				html += '</div>';
			}
		}
		html += "<div id='package-carousel-navigation' class='box b1 ground container padding-10 center'>";
			html += "<div class='mobile-box b5'></div>";
			html += "<button data-js='package-carousel-prev' name='carousel-prev' class='mobile-box b5 noborder'><img class='height-40 icon pointer' src='/images/icon/prev.png'></button>";
			html += "<div class='mobile-box b5'></div>";
			html += "<button data-js='package-carousel-next' name='carousel-next' class='mobile-box b5 noborder'><img class='height-40 icon pointer' src='/images/icon/next.png'></button>";
		html += "</div>";
	}
	html += "</div>";


	document.getElementById("catalog-product-show-div").innerHTML = html;
	document.getElementById("catalog-product-show-box").style.display = "";

	html = "";
	html += "<div class='box b1 avant-garde em40 center padding-10 bold'>"+package.name+" - "+package.color+"</div>";
	if(package.price){
		html += "<div class='box b1 avant-garde em25 italic center padding-10 bold' style='color:#467846;'>R$"+package.price+"</div>";
	}

	if(package.products){
		package.products = lib.sort(package.products, 'code');
	};

	html += "<div class='box b1 container'>";
	if(package.products){
		for(let i in package.products){
			html += "<div class='mobile-box b3 container ground padding-10 margin-top-5 center'>";
			if(package.products[i].image){
				html += "<div class='mobile-box b1 center'><img class='image-card' style='max-height:100px' src='"+package.products[i].image+"'></div>";
			} else {
				html += "<div class='mobile-box b1 center'><img class='image-card' style='max-height:100px' src='/images/product/no-product.png'></div>";
			};
			html += "<div class='mobile-box b1 avant-garde center margin-top-10 bold'>"+package.products[i].amount+"un - "+package.products[i].name+" | "+package.products[i].color+"</div>";
			html += "</div>";
		}
	}
	html += "</div>";

	document.getElementById("catalog-product-info-box").innerHTML = html;
};