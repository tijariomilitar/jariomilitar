const blogController = {};

blogController.index = async (req, res) => {
	res.render('blog/index');
};

module.exports = blogController;