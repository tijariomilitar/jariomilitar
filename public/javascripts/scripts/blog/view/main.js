Blog.view = {};

Blog.article.view = {};

Blog.article.view.filter = (articles, pagination) => {
	let filter_box = document.getElementById("article-filter-box");
	let filter_div = document.getElementById("article-filter-div");
	filter_div.innerHTML = "";

	if(articles.length){
		for (let i = pagination.page * pagination.pageSize; i < articles.length && i < (pagination.page + 1) * pagination.pageSize; i++){
			let article_box = lib.element.create("div", { class: "box box-article margin-top-10 border relative radius-10 pointer shadow-hover", onclick: "window.location.href='/portal-do-lojista/artigo/"+articles[i].id+"';" } );
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

			filter_div.appendChild(article_box);
		};
	} else {
		filter_div.innerHTML = "Sem resultados";
	};
};

Blog.article.view.filter = (articles, pagination) => {
	let filter_box = document.getElementById("article-filter-box");
	let filter_div = document.getElementById("article-filter-div");
	filter_div.innerHTML = "";

	if(articles.length){
		for (let i = pagination.page * pagination.pageSize; i < articles.length && i < (pagination.page + 1) * pagination.pageSize; i++){
			let article_box = lib.element.create("div", { class: "box box-article ground margin-top-10 border relative radius-10 pointer shadow-hover", onclick: "window.location.href='/portal-do-lojista/artigo/"+articles[i].id+"';" } );
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

			filter_div.appendChild(article_box);
		};
	} else {
		filter_div.innerHTML = "Sem resultados";
	};
};

Blog.article.content.view = {};

Blog.article.content.view.list = (contents) => {
	let content_div = document.getElementById("article-content-div");
	content_div.innerHTML = "";

	let content_element;

	for(let i in contents) {
		if(contents[i].tag_name == "img") {
			content_element = lib.element.create(contents[i].tag_name, { id: 'content-id-'+contents[i].id, src: contents[i].content , class: contents[i].tag_style });
		} else {
			content_element = lib.element.create(contents[i].tag_name, { id: 'content-id-'+contents[i].id, class: contents[i].tag_style }, contents[i].content);
		}
		content_div.appendChild(content_element);
	};
};