Blog.controller = {};
Blog.article.controller = {};

Blog.article.controller.filter = document.getElementById("article-filter-form");
if(Blog.article.controller.filter){
	Blog.article.controller.filter.addEventListener("submit", async e => {
		e.preventDefault();

		let article = {
			title: e.target.elements.namedItem("title").value,
			category: e.target.elements.namedItem("category").value,
			status: 'up'
		};

		let articles = await API.response(Article.filter, article);
		if(!articles) { return false; }

		lib.display("article-filter-box", "");

		const pagination = { pageSize: 21, page: 0};
		(function(){ lib.carousel.execute("article-filter-box", Blog.article.view.filter, articles, pagination); }());
	});
}

Blog.article.controller.filterByCategory = (category_name) => {
	Blog.article.controller.filter.elements.namedItem('category').value = category_name;
	Blog.article.controller.filter.submit.click();
};

Blog.article.content.controller = {};

Blog.article.content.controller.list = async (article_id) => {
	let contents = await API.response(Article.content.list, { article_id });
	if( !contents ) { return false; }

	lib.display("article-content-div", "");

	Blog.article.content.view.list(contents);
};