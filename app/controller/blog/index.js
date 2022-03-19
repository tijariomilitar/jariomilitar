const Article = require("../../model/blog/article");

const blogController = {};

blogController.index = async (req, res) => {
	res.render('blog/index');
};

blogController.article = async (req, res) => {
	try	{
		let article = (await Article.findById(req.params.id))[0];
		res.render('blog/article', { article });
	} catch (err) {
		console.log(err);
		res.send({ msg: "Ocorreu um erro ao encontrar o Conteúdo do artigo, favor contate o suporte!" });
	};
};

module.exports = blogController;