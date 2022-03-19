Article.view = {};

Article.view.preview = (article) => {
	let preview_div = document.getElementById("article-preview-div");
	preview_div.innerHTML = "";

	let article_box = preview_div.appendChild(lib.element.create("div", { class: "box box-article ground margin-top-10 border relative radius-10 pointer shadow-hover" } ));
	let image_div = lib.element.create("div", { class: "box a1 container height-200" });
	image_div.appendChild(lib.element.create("img", { class: "image-fit radius-10", src: article.image }));

	if(article.category == "Vendas") { article.categoryColor = "#7fc355" };
	if(article.category == "Lançamento") { article.categoryColor = "gold" };
	if(article.category == "Revenda JA®") { article.categoryColor = "#808080" };
	if(article.category == "Tendências") { article.categoryColor = "orange" };
	let category_div = lib.element.create("div", { class: "container category-article height-30 width-150 radius-15 center", style: "background-color:"+article.categoryColor+";" });
	category_div.appendChild(lib.element.create("p", { class: "center em08 lucida-grande bold" }, article.category))

	let text_div = lib.element.create("div", { class: "box a1 container height-110 padding-15" });

	let title_div = lib.element.create("div", { class: "container a1 container height-50" });
	title_div.appendChild(lib.element.create("div", { class: "lucida-grande bold" }, article.title ));
	text_div.appendChild(title_div);

	let subtitle_div = lib.element.create("div", { class: "box a1 height-60 padding-5" });
	subtitle_div.appendChild(lib.element.create("div", { class: "em08 lucida-grande ellipsis" }, article.subtitle));	
	text_div.appendChild(subtitle_div);

	article_box.appendChild(image_div);
	article_box.appendChild(category_div);
	article_box.appendChild(text_div);

	lib.display("article-preview-div", "");
};

Article.view.filter = (articles, pagination) => {
	let filter_box = document.getElementById("article-filter-box");
	let filter_div = document.getElementById("article-filter-div");
	filter_div.innerHTML = "";

	if(articles.length){
		for (let i = pagination.page * pagination.pageSize; i < articles.length && i < (pagination.page + 1) * pagination.pageSize; i++){
			let article_box = lib.element.create("div", { class: "box b3 ground margin-top-10 padding-5 border relative radius-10 pointer shadow-hover" } );
			let image_div = lib.element.create("div", { class: "box a1 container height-200" });
			image_div.appendChild(lib.element.create("img", { class: "image-fit radius-10", src: articles[i].image }));

			if(articles[i].category == "Vendas") { articles[i].categoryColor = "#7fc355" };
			if(articles[i].category == "Lançamento") { articles[i].categoryColor = "gold" };
			if(articles[i].category == "Revenda JA®") { articles[i].categoryColor = "#808080" };
			if(articles[i].category == "Tendências") { articles[i].categoryColor = "orange" };
			let category_div = lib.element.create("div", { class: "container category-article height-30 width-150 radius-15 center", style: "background-color:"+articles[i].categoryColor+";" });
			category_div.appendChild(lib.element.create("p", { class: "center em08 lucida-grande bold" }, articles[i].category))

			let text_div = lib.element.create("div", { class: "box a1 container height-110 padding-15" });

			let title_div = lib.element.create("div", { class: "container a1 container height-50" });
			title_div.appendChild(lib.element.create("div", { class: "lucida-grande bold" }, articles[i].title ));
			text_div.appendChild(title_div);

			let subtitle_div = lib.element.create("div", { class: "box a1 height-60 padding-5" });
			subtitle_div.appendChild(lib.element.create("div", { class: "em08 lucida-grande ellipsis" }, articles[i].subtitle));	
			text_div.appendChild(subtitle_div);

			article_box.appendChild(image_div);
			article_box.appendChild(category_div);
			article_box.appendChild(text_div);

			let menu_div = lib.element.create("div", { class: "box b1 container" });
			menu_div.appendChild(lib.element.create("div", { class: "mobile-box b3 border-lg-st center padding-5 radius-5", onclick: "Article.controller.edit('"+articles[i].id+"')" }, "Arquivar" ));
			menu_div.appendChild(lib.element.create("div", { class: "mobile-box b3 border-lg-st center padding-5 radius-5", onclick: "Article.controller.edit('"+articles[i].id+"')" }, "Editar" ));
			menu_div.appendChild(lib.element.create("div", { class: "mobile-box b3 border-lg-st center padding-5 radius-5", onclick: "Article.controller.edit('"+articles[i].id+"')" }, "Excluir" ));

			article_box.appendChild(menu_div);

			filter_div.appendChild(article_box);
		};
	} else {
		filter_div.innerHTML = "Sem resultados";
	};
};

Article.view.edit = article => {
	document.getElementById("article-create-form").elements.namedItem("id").value = article.id;
	document.getElementById("article-create-form").elements.namedItem("title").value = article.title;
	document.getElementById("article-create-form").elements.namedItem("subtitle").value = article.subtitle;
	document.getElementById("article-create-form").elements.namedItem("image").value = article.image;
	document.getElementById("article-create-form").elements.namedItem("category").value = article.category;
};

Article.content.view = {};

Article.content.view.list = (contents) => {
	let preview_div = document.getElementById("article-preview-div");
	let content_div = document.getElementById("article-content-div");
	content_div.innerHTML = "";

	let content_element;

	for(let i in contents) {
		if(contents[i].tag_name == "img") {
			content_element = lib.element.create(contents[i].tag_name, { id: 'content-id-'+contents[i].id, src: contents[i].content , class: contents[i].tag_style + " box-hover pointer", onclick: "Article.content.controller.edit("+contents[i].id+")" });
		} else {
			content_element = lib.element.create(contents[i].tag_name, { id: 'content-id-'+contents[i].id, class: contents[i].tag_style + " box-hover pointer", onclick: "Article.content.controller.edit("+contents[i].id+")" }, contents[i].content);
		}
		content_div.appendChild(content_element);
	};
};

Article.content.view.edit = (content) => {
	Article.content.controller.create.elements.namedItem("id").value = content.id;
	Article.content.controller.create.elements.namedItem("tag-name").value = content.tag_name;
	Article.content.controller.create.elements.namedItem("tag-style").value = content.tag_style;
	Article.content.controller.create.elements.namedItem("content").value = content.content;
};