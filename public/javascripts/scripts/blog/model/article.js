const Article = {};

Article.create = async article => {
	let response = await fetch("/portal-do-lojista/article/create", {
		method: "POST",
		headers: {'Content-Type': 'application/json'},
	    body: JSON.stringify(article)
	});
	response = await response.json();

	if(API.verifyResponse(response)){ return false };
	alert(response.done);

	return response;
};

Article.filter = async article => {
	let response = await fetch("/portal-do-lojista/article/filter", {
		method: "POST",
		headers: {'Content-Type': 'application/json'},
	    body: JSON.stringify(article)
	});
	response = await response.json();

	if(API.verifyResponse(response)){ return false };

	return response;
};

Article.findById = async (article_id) => {
	let response = await fetch("/portal-do-lojista/article/find/"+article_id);
	response = await response.json();
	
	if(API.verifyResponse(response)){ return false };
	
	return response[0];
};

Article.content = {};

Article.content.create = async article => {
	let response = await fetch("/portal-do-lojista/article/content/create", {
		method: "POST",
		headers: {'Content-Type': 'application/json'},
	    body: JSON.stringify(article)
	});
	response = await response.json();

	if(API.verifyResponse(response)){ return false };

	return response;
};

Article.content.findById = async (content_id) => {
	let response = await fetch("/portal-do-lojista/article/content/find/"+content_id);
	response = await response.json();
	
	if(API.verifyResponse(response)){ return false };
	
	return response[0];
};

Article.content.list = async article => {
	let response = await fetch("/portal-do-lojista/article/content/list", {
		method: "POST",
		headers: {'Content-Type': 'application/json'},
	    body: JSON.stringify(article)
	});
	response = await response.json();

	if(API.verifyResponse(response)){ return false };

	return response;
};