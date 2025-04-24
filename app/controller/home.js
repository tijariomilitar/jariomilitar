const homeController = {
  index: async (req, res) => {
    if (req.user) {
      return res.redirect('/lojista/home');
    };
    res.render('index');
  },
  info: async (req, res) => {
    if (req.user) {
      return res.redirect('/lojista/home');
    };
    res.render('info');
  },
  presentation: async (req, res) => {
    if (req.user) {
      return res.redirect('/lojista/home');
    };
    res.render('presentation/index');
  }
};

module.exports = homeController;