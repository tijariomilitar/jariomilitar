Product.catalog = {};

Product.catalog.filter = async (product) => {
	let response = await fetch("/product/catalog/filter?code="+product.code+"&name="+product.name+"&color="+product.color+"&size="+product.size+"&brand="+product.brand+"&price_category_id="+product.price_category_id);
	response = await response.json();

	if(API.verifyResponse(response)){ return false };

	return response;
};