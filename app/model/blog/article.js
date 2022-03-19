const db = require('../../../config/connection');
const lib = require('jarmlib');

const Article = function(){
	this.id;
	this.datetime;
	this.title;
	this.subtitle;
	this.image;
	this.category;
	this.user_id;

	this.create = () => {
		if(!this.datetime) { return { err: "É necessário a data de criação" } };
        if(!this.title) { return { err: "É necessário incluir um título ao artigo" } };
        if(!this.subtitle) { return { err: "É necessário incluir um subtítulo ao artigo" } };
        if(!this.image) { return { err: "É necessário incluir uma imagem de capa ao artigo" } };
        if(!this.category) { return { err: "É necessário selecionar a categoria do artigo" } };
        if(!this.user_id) { return { err: "É necessário informar o usuário que está criando o artigo" } };

        let obj = lib.convertTo.object(this);
		let query = lib.Query.save(obj, 'cms_wt_erp.blog_article');

        return db(query);
	};

	this.update = () => {
		if(!this.id) { return { err: "Não é possível atualizar esse artigo" } };
		if(!this.datetime) { return { err: "É necessário a data de criação" } };
        if(!this.title) { return { err: "É necessário incluir um título ao artigo" } };
        if(!this.subtitle) { return { err: "É necessário incluir um subtítulo ao artigo" } };
        if(!this.image) { return { err: "É necessário incluir uma imagem de capa ao artigo" } };
        if(!this.category) { return { err: "É necessário selecionar a categoria do artigo" } };
        if(!this.user_id) { return { err: "É necessário informar o usuário que está criando o artigo" } };

        let obj = lib.convertTo.object(this);
		let query = lib.Query.update(obj, 'cms_wt_erp.blog_article', "id");

        return db(query);
	};
};

Article.filter = async (props, inners, params, strict_params, order_params) => {
	let query = new lib.Query().select().props(props).table("cms_wt_erp.blog_article article")
		.inners(inners).params(params).strictParams(strict_params).order(order_params).build().query;
	return db(query);
};

Article.findById = (article_id) => {
	let query = "SELECT * FROM cms_wt_erp.blog_article WHERE id="+article_id+";";
	return db(query);
};

Article.content = function(){
	this.id;
	this.article_id;
	this.tag_name;
	this.tag_style;
	this.content;

	this.create = () => {
        if(!this.article_id) { return { err: "O conteúdo não tem nenhum artigo vinculado" } };
        if(!this.tag_name) { return { err: "É necessário selecionar a tag" } };
        if(!this.content) { return { err: "É necessário incluir o conteúdo" } };

        let obj = lib.convertTo.object(this);
		let query = lib.Query.save(obj, 'cms_wt_erp.blog_article_content');

        return db(query);
	};

	this.update = () => {
		if(!this.id) { return { err: "Não é possível atualizar esse artigo" } };
        if(!this.tag_name) { return { err: "É necessário incluir uma imagem de capa ao artigo" } };
        if(!this.content) { return { err: "É necessário selecionar a categoria do artigo" } };

        let obj = lib.convertTo.object(this);
		let query = lib.Query.update(obj, 'cms_wt_erp.blog_article_content', "id");

        return db(query);
	};
};

Article.content.list = (article_id) => {
	let query = "SELECT * FROM cms_wt_erp.blog_article_content WHERE article_id="+article_id+" ORDER BY id;";
    return db(query);
};

Article.content.findById = (content_id) => {
	let query = "SELECT * FROM cms_wt_erp.blog_article_content WHERE id="+content_id+";";
	return db(query);
};

module.exports = Article;