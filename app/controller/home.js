const homeController = {
	index: async (req, res) => {
		if(req.user){
			return res.render('home', { user: req.user });
		};
		res.render('index');
	},
	info: async (req, res) => {
		if(req.user){
			return res.render('home', { user: req.user });
		};
		res.render('info');
	},
	presentation: async (req, res) => {
		if(req.user){
			return res.render('home', { user: req.user });
		};
		res.render('presentation');
	}
};

module.exports = homeController;