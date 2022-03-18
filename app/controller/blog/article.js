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
			article.id = updatedArticle.insertId;

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
		category: req.body.category
	};

	let params = { keys: [], values: [] };
	let strict_params = { keys: [], values: [] };

	lib.Query.fillParam("article.title", article.title, params);
	lib.Query.fillParam("article.subtitle", article.subtitle, params);
	lib.Query.fillParam("article.category", article.category, strict_params);

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

articleController.content = {};

articleController.content.create = async(req, res) => {
	const content = new Article.content();
	content.article_id = req.body.article_id;
	content.tag_name = req.body.tag_name;
	content.tag_style = req.body.tag_style;
	content.content = req.body.content;

	try	{
		let savedContent = await content.create();
		if(savedContent.err) { return res.send({ msg: savedContent.err }); }
		content.id = savedContent.insertId;

		res.send({ done: "Conteúdo adicionado com sucesso!", content });
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

module.exports = articleController;