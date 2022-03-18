const landingPageController = {
	plateCarrier: async (req, res) => { return res.render('landing_page/plate_carrier', { user: req.user }); },
	blackout: async (req, res) => { return res.render('landing_page/blackout', { user: req.user }); },
	lancamento_da_semana: async (req, res) => { return res.render('landing_page/lancamento-da-semana', { user: req.user }); },
	number_1: async (req, res) => { return res.render('landing_page/number-1', { user: req.user, products }); },
	myProduct: async (req, res) => { return res.render('landing_page/meu-produto'); },
	semanaDoConsumidor: async (req, res) => { return res.render('landing_page/semana-do-consumidor'); }
};

module.exports = landingPageController;