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

	for(let i in contents) {
		let content_box = lib.element.create("div", { id: 'content-box-'+contents[i].id, class: "box b11-12 container", style: "display: none;" });
		
		let content = lib.element.create("div", { id: 'content-'+contents[i].id, class: "box b11-12 container" });
		let content_element = lib.element.create(contents[i].tag_name, { id: 'content-id-'+contents[i].id, class: contents[i].tag_style }, contents[i].content);
		content.appendChild(content_element);

		content_div.appendChild(content);
		content_div.appendChild(content_box);

		content_div.appendChild(lib.element.icon('b12', 20, "/images/icon/edit.png", "Article.content.controller.edit("+contents[i].id+")"));
	};
};

Article.content.view.edit = (content) => {
	let content_box = document.getElementById("content-box-"+content.id);
	content_box.innerHTML = "";

	let content_form = lib.element.create("form", { id: "content-form-"+content.id, class: "box b1 container ground border padding-10 margin-top-10 radius-5" });
	
	let tag_select = lib.element.create("select", { name: "tag-name", class: "mobile-box b6 input-generic margin-top-5 radius-5 center hide-disabled" });
	content.tag_name == "div" && tag_select.appendChild(lib.element.create("option", { value: "div", selected: "on" }, "div"));
	content.tag_name == "h1" && tag_select.appendChild(lib.element.create("option", { value: "h1", selected: "on" }, "h1"));
	content.tag_name == "h3" && tag_select.appendChild(lib.element.create("option", { value: "h3", selected: "on" }, "h3"));
	content.tag_name == "p" && tag_select.appendChild(lib.element.create("option", { value: "p", selected: "on" }, "p"));
	content.tag_name == "img" && tag_select.appendChild(lib.element.create("option", { value: "img", selected: "on" }, "img"));
	
	content.tag_name != "div" && tag_select.appendChild(lib.element.create("option", { value: "div" }, "div"));
	content.tag_name != "h1" && tag_select.appendChild(lib.element.create("option", { value: "h1" }, "h1"));
	content.tag_name != "h3" && tag_select.appendChild(lib.element.create("option", { value: "h3" }, "h3"));
	content.tag_name != "p" && tag_select.appendChild(lib.element.create("option", { value: "p" }, "p"));
	content.tag_name != "img" && tag_select.appendChild(lib.element.create("option", { value: "img" }, "img"));
	
	content_form.appendChild(lib.element.create("input", { name: "id", type: "hidden", value: content.id }));
	content_form.appendChild(tag_select);
	content_form.appendChild(lib.element.create("input", { name: "tag-style", class: "mobile-box b3-4 input-generic margin-top-5 radius-5 center", value: content.tag_name, placeholder: "Estilos CSS3", autocomplete: "off" }));
	content_form.appendChild(lib.element.create("textarea", { name: "content", class: "box b11-12 height-100 avant-garde margin-top-5 padding-5 radius-5" }, content.content));
	content_form.appendChild(lib.element.icon('b12', 25, "https://spaces.jariomilitar.com/erp-images/icon/increase.png", `Article.content.controller.update(${content.id})`));
	
	content_box.appendChild(content_form);
};

{/*<form id="article-content-form" class="box b2-3 container ground border padding-10 margin-top-10 radius-5 margin-bottom-300">
	<input type="hidden" name="id" value="">
	<input type="hidden" name="article-id" value="">
	<select name="tag-name" class="mobile-box b6 input-generic margin-top-5 radius-5 center hide-disabled">
		<option value="" selected disabled>Tag</option>
		<option value="div">div</option>
		<option value="h1">h1</option>
		<option value="h3">h3</option>
		<option value="p">p</option>
		<option value="img">img</option>
	</select>
	<input type="text" name="tag-style" class="mobile-box b3-4 input-generic margin-top-5 radius-5 center" placeholder="Estilos CSS3" autocomplete="off">
	<textarea name="content" class="box b11-12 height-100 avant-garde margin-top-5 padding-5 radius-5"></textarea>
	<button type="submit" name="submit" class="box b12 container height-100 noborder margin-top-5 center"><img class='size-20 icon center pointer' src="https://spaces.jariomilitar.com/erp-images/icon/increase.png"></button>
</form>*/}

// soldado
// sargento
// capitão
// coronéu
// General
// Marechal