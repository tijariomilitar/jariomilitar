const articleController = {};
const lib = require("jarmlib");

const Article = require("../../model/blog/article");

articleController.index = async (req, res) => {
	res.render('blog/article/index');
};

articleController.manage = async (req, res) => {
	res.render('blog/article/manage');
};

articleController.create = async(req, res) => {
	const article = new Article();
	article.id = req.body.id;
	article.datetime = new Date().getTime();
	article.title = req.body.title;
	article.subtitle = req.body.subtitle;
	article.image = req.body.image;
	article.category = req.body.category;
	article.user_id = 1;

	try	{
		if(!article.id) {
			let savedArticle = await article.create();
			if(savedArticle.err) { return res.send({ msg: savedArticle.err }); }
			article.id = savedArticle.insertId;

			res.send({ done: "Artigo criado com sucesso!", article });
		} else {
			let updatedArticle = await article.update();
			if(updatedArticle.err) { return res.send({ msg: updatedArticle.err }); }

			res.send({ done: "Artigo atualizado com sucesso!", article });
		}
	} catch (err) {
		if(err.code == "ER_DUP_ENTRY") { return res.send({ msg: "Duplicidade para: "+err.sqlMessage.split("'")[1] }); } 
		console.log(err);
		res.send({ msg: "Ocorreu um erro ao cadastrar o Lead, favor contate o suporte!" });
	};
};

articleController.filter = async(req, res) => {
	let article = {
		title: req.body.title,
		subtitle: req.body.subtitle,
		category: req.body.category,
		status: req.body.status
	};

	let params = { keys: [], values: [] };
	let strict_params = { keys: [], values: [] };

	lib.Query.fillParam("article.title", article.title, params);
	lib.Query.fillParam("article.subtitle", article.subtitle, params);
	lib.Query.fillParam("article.category", article.category, strict_params);
	lib.Query.fillParam("article.status", article.status, strict_params);

	let order_params = [ ['id','DESC'] ];

	try	{
		let articles = await Article.filter([], [], params, strict_params, order_params);
		res.send(articles);
	} catch (err) {
		console.log(err);
		res.send({ msg: "Ocorreu um erro ao cadastrar o Lead, favor contate o suporte!" });
	};
};

articleController.findById = async(req, res) => {
	try	{
		let article = await Article.findById(req.params.id);	
		res.send(article);
	} catch (err) {
		console.log(err);
		res.send({ msg: "Ocorreu um erro ao encontrar o Conteúdo do artigo, favor contate o suporte!" });
	};
};

articleController.archive = async(req, res) => {
	try	{
		await Article.archive(req.params.id);	
		res.send({ done: "O artigo foi arquivado com sucesso!" });
	} catch (err) {
		console.log(err);
		res.send({ msg: "Ocorreu um erro ao encontrar o Conteúdo do artigo, favor contate o suporte!" });
	};
};

articleController.unarchive = async(req, res) => {
	try	{
		await Article.unarchive(req.params.id);	
		res.send({ done: "O artigo foi desarquivado com sucesso!" });
	} catch (err) {
		console.log(err);
		res.send({ msg: "Ocorreu um erro ao encontrar o Conteúdo do artigo, favor contate o suporte!" });
	};
};

articleController.delete = async(req, res) => {
	try	{
		await Article.delete(req.params.id);
		await Article.content.deleteByArticleId(req.params.id);
		res.send({ done: "Artigo excluído com sucesso" });
	} catch (err) {
		console.log(err);
		res.send({ msg: "Ocorreu um erro ao encontrar o Conteúdo do artigo, favor contate o suporte!" });
	};
};

articleController.content = {};

articleController.content.create = async(req, res) => {
	const content = new Article.content();
	content.id = req.body.id;
	content.article_id = req.body.article_id;
	content.tag_name = req.body.tag_name;
	content.tag_style = req.body.tag_style;
	content.content = req.body.content;

	try	{
		if(!content.id) {
			let savedContent = await content.create();
			if(savedContent.err) { return res.send({ msg: savedContent.err }); }
			content.id = savedContent.insertId;
			res.send({ done: "Conteúdo adicionado com sucesso!", content });
		} else {
			let updatedContent = await content.update();
			if(updatedContent.err) { return res.send({ msg: updatedContent.err }); }
			res.send({ done: "Conteúdo atualizado com sucesso!", content });
		}
	} catch (err) {
		if(err.code == "ER_DUP_ENTRY") { return res.send({ msg: "Duplicidade para: "+err.sqlMessage.split("'")[1] }); } 
		console.log(err);
		res.send({ msg: "Ocorreu um erro ao cadastrar o Conteúdo do artigo, favor contate o suporte!" });
	};
};

articleController.content.list = async(req, res) => {
	try	{
		let contents = await Article.content.list(req.body.article_id);	
		res.send(contents);
	} catch (err) {
		console.log(err);
		res.send({ msg: "Ocorreu um erro ao cadastrar o Conteúdo do artigo, favor contate o suporte!" });
	};
};

articleController.content.findById = async(req, res) => {
	try	{
		let content = await Article.content.findById(req.params.id);	
		res.send(content);
	} catch (err) {
		console.log(err);
		res.send({ msg: "Ocorreu um erro ao encontrar o Conteúdo do artigo, favor contate o suporte!" });
	};
};

articleController.content.delete = async(req, res) => {
	try	{
		let content = await Article.content.delete(req.params.id);	
		res.send({ done: "Conteúdo excluído com sucesso" });
	} catch (err) {
		console.log(err);
		res.send({ msg: "Ocorreu um erro ao encontrar o Conteúdo do artigo, favor contate o suporte!" });
	};
};

module.exports = articleController;