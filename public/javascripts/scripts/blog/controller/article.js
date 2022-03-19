Article.controller = {};
Article.flow = { status: "title" };

Article.controller.create = document.getElementById("article-create-form");
if(Article.controller.create) {
	Article.controller.create.addEventListener("submit", async e => {
		e.preventDefault();

		const article = {
			id: e.target.elements.namedItem("id").value,
			title: e.target.elements.namedItem("title").value,
			subtitle: e.target.elements.namedItem("subtitle").value,
			image: e.target.elements.namedItem("image").value,
			category: e.target.elements.namedItem("category").value
		};

		let response = await API.response(Article.create, article);
		if( !response ) { return false; }

		response.article && Article.flow.next();

		Article.view.preview(article);

		e.target.elements.namedItem("id").value = response.article.id;

		Article.content.controller.create.elements.namedItem("article-id").value = response.article.id;
	});
};

Article.controller.filter = document.getElementById("article-filter-form");
if(Article.controller.filter){
	Article.controller.filter.addEventListener("submit", async e => {
		e.preventDefault();

		let article = {
			title: e.target.elements.namedItem("title").value,
			subtitle: e.target.elements.namedItem("subtitle").value,
			category: e.target.elements.namedItem("category").value
		};

		let articles = await API.response(Article.filter, article);
		if(!articles) { return false; }

		lib.display("article-filter-box", "");

		lib.display("article-create-box", "none");
		lib.display("article-content-box", "none");

		const pagination = { pageSize: 21, page: 0};
		(function(){ lib.carousel.execute("article-filter-box", Article.view.filter, articles, pagination); }());
	});
}

Article.controller.edit = async (article_id) => {
	let article = await API.response(Article.findById, article_id);
	if(!article) { return false; }

	let contents = await API.response(Article.content.list, { article_id });
	if( !contents ) { return false; }

	console.log(article);

	article.contents = contents;

	lib.display("article-filter-box", "none");
	
	lib.display("article-create-box", "");
	lib.display("article-content-box", "");
	lib.display("article-content-div", "");
	lib.display("article-content-form", "");

	Article.content.controller.create.elements.namedItem("article-id").value = article.id;

	Article.view.preview(article);
	Article.view.edit(article);
	Article.content.view.list(article.contents);
};

Article.flow.next = () => {
	if(Article.flow.status == "title") {
		lib.display(Article.controller.create.elements.namedItem("title"), "none");
		lib.display(Article.controller.create.elements.namedItem("subtitle"), "");
		lib.display("flow-prev", "");
		return Article.flow.status = "subtitle";
	};

	if(Article.flow.status == "subtitle") {
		lib.display(Article.controller.create.elements.namedItem("subtitle"), "none");
		lib.display(Article.controller.create.elements.namedItem("image"), "");
		return Article.flow.status = "image";
	};

	if(Article.flow.status == "image") {
		lib.display(Article.controller.create.elements.namedItem("image"), "none");
		lib.display(Article.controller.create.elements.namedItem("category"), "");
		return Article.flow.status = "category";
	};

	if(Article.flow.status == "category") {
		lib.display(Article.controller.create.elements.namedItem("category"), "none");
		lib.display(Article.controller.create.elements.namedItem("submit"), "");
		lib.display("flow-next", "none");
		return Article.flow.status = "submit";
	};

	if(Article.flow.status == "submit") {
		lib.display(Article.controller.create.elements.namedItem("submit"), "none");
		lib.display(Article.controller.create.elements.namedItem("title"), "");
		lib.display("article-content-form", "");
		lib.display("flow-next", "");
		lib.display("flow-prev", "none");
		return Article.flow.status = "title";
	};
};

Article.flow.prev = () => {
	if(Article.flow.status == "subtitle") {
		lib.display(Article.controller.create.elements.namedItem("subtitle"), "none");
		lib.display(Article.controller.create.elements.namedItem("title"), "");
		lib.display("flow-prev", "none");
		return Article.flow.status = "title";
	};

	if(Article.flow.status == "image") {
		lib.display(Article.controller.create.elements.namedItem("image"), "none");
		lib.display(Article.controller.create.elements.namedItem("subtitle"), "");
		return Article.flow.status = "subtitle";
	};

	if(Article.flow.status == "category") {
		lib.display(Article.controller.create.elements.namedItem("category"), "none");
		lib.display(Article.controller.create.elements.namedItem("image"), "");
		return Article.flow.status = "image";
	};

	if(Article.flow.status == "submit") {
		lib.display(Article.controller.create.elements.namedItem("submit"), "none");
		lib.display(Article.controller.create.elements.namedItem("category"), "");
		lib.display("flow-next", "");
		return Article.flow.status = "category";
	};
};

Article.content.controller = {};

Article.content.controller.create = document.getElementById("article-content-form");
if(Article.content.controller.create) {
	Article.content.controller.create.addEventListener("submit", async e => {
		e.preventDefault();

		const content = {
			id: e.target.elements.namedItem("id").value,
			article_id: e.target.elements.namedItem("article-id").value,
			tag_name: e.target.elements.namedItem("tag-name").value,
			tag_style: e.target.elements.namedItem("tag-style").value,
			content: e.target.elements.namedItem("content").value
		};

		let response = await API.response(Article.content.create, content);
		if( !response ) { return false; }

		Article.content.controller.list(content.article_id);

		e.target.elements.namedItem("id").value = "";
		e.target.elements.namedItem("tag-name").value = "";
		e.target.elements.namedItem("tag-style").value = "";
		e.target.elements.namedItem("content").value = "";
	});
}

Article.content.controller.list = async (article_id) => {
	let contents = await API.response(Article.content.list, { article_id });
	if( !contents ) { return false; }

	lib.display("article-content-div", "");

	Article.content.view.list(contents);
};

Article.content.controller.edit = async (content_id) => {
	console.log(Article.content.controller.create.elements.namedItem("id").value);
	if(Article.content.controller.create.elements.namedItem("content").value) {
		let r = confirm("Atenção: \n \n Existe um conteúdo sem cadastrado, tem certeza que deseja continuar? \n \n O conteúdo perdido não pode ser recuperado!")
		if(!r) { return; }
	}

	let content = await API.response(Article.content.findById, content_id);
	if (!content) { return false; }

	Article.content.view.edit(content);
};