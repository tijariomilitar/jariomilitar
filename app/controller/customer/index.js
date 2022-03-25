const Customer = require("../../model/customer");
const Sale = require("../../model/sale/main");
const Rank = require("../../model/rank");

const lib = require("jarmlib");

const Token = require('../../../config/token');
const JWT = require('jsonwebtoken');
const Mailer = require('../../../config/mailer');
const bcrypt = require('bcrypt-nodejs');
const ejs = require("ejs");
const path = require('path');

const customerController = {};

customerController.index = async (req, res) => {
	res.redirect('/portal-do-lojista');
};

customerController.home = async (req, res) => {
	if(!req.user) { return res.redirect('/lojista/login'); }

	let customer = (await Customer.findBy.id(req.user.id))[0];

	const period = {
		key: "sale_date",
		start: (new Date().getTime()) - (lib.date.timestamp.day() * 90),
		end: new Date().getTime()
	};

	const strict_params = { keys: [], values: [] }
	lib.Query.fillParam("sale.customer_id", req.user.id, strict_params);
	const order_params = [ ["id","DESC"] ];
	let sales = await Sale.filter([], [], period, [], strict_params, order_params, 0);

	const saleStatistics = {
		saleValue: 0,
		shipmentValue: 0,
		discountValue: 0,
		totalValue: 0
	};

	for(let i in sales) {
		if(sales[i].status == "Ag. embalo" || sales[i].status == "Ag. nota fiscal" || sales[i].status == "Ag. envio" || sales[i].status == "Enviado"){
			saleStatistics.saleValue += parseFloat(sales[i].product_value);
			saleStatistics.saleValue += parseFloat(sales[i].package_value);
			saleStatistics.shipmentValue += parseFloat(sales[i].shipment_value);
			saleStatistics.discountValue += parseFloat(sales[i].discount_value);
			saleStatistics.totalValue += parseFloat(sales[i].value);
		} else {
			sales.splice(i, 1);
			i--;
		};
	};

	for(let i in Rank) {
		if(saleStatistics.totalValue >= Rank[i].min_value && saleStatistics.totalValue < Rank[i].max_value) {
			customer.rank = Rank[i];
		};
	};

	res.render('customer/home', { customer, sales, saleStatistics, Rank });
};

customerController.login = async (req, res) => {
	if(req.user) { return res.redirect("/lojista/home"); }
	
	res.render('customer/login', { user: req.user, message: req.flash('loginMessage') });
};

customerController.successfulLogin = (req, res) => {
	res.redirect('/lojista/home');
};

customerController.signup = async (req, res) => {
	if(req.user){
		return res.redirect('/');
	};
	res.render('user/signup', { user: req.user, message: req.flash('signupMessage')});
};

customerController.successfulSignup = (req, res) => {
	res.redirect('/');
};

customerController.logout = (req, res) => {
	req.logout();
	res.redirect('/lojista');
};

customerController.recover = {};

customerController.recover.index = async (req, res) => {
	res.render('customer/recover');
};

customerController.recover.sendMail = async (req, res) => {
	try	{
		let customer = (await Customer.findBy.cnpj(req.params.access))[0];
	    if(!customer) { customer = (await Customer.findBy.cpf(req.params.access))[0]; };

	    if (!customer){
	        return res.send({ msg: "Não foi encontrado nenhum usuário, por favor verifique os dados e tente novamente" })
	    };

	    if(!customer.email) {
	    	return res.send({ done: "Você ainda não cadastrou um email para sua conta, por favor entre em contato com um consultor comercial." })
	    }

	    const JWTData = {
            iss: 'jariomilitar-api',
            data: { 
                customer_id: customer.id,
                access: customer.access
            }
        };

        const token = await Token.generate(JWTData);

        await Customer.setToken(token, customer.id);

        const data = await ejs.renderFile(path.join(__dirname, "../../../app/view/customer/mail-template/recover.ejs"), { customer, token });
            
        const option = {
            from: "JA Rio Militar <comercial@jariomilitar.com.br>",
            to: `${customer.name} <${customer.email}>`,
            subject: "Recuperação de senha",
            html: data,
            attachments: [
		        {
			        filename: 'favicon.png',
			        path: path.join(__dirname, "../../../app/view/customer/mail-template/images/favicon.png"),
			        cid: 'favicon'
			    }
		    ]
        };

        await Mailer.sendMail(option, (err, info) => {
            if (err) { 
            	console.log(err);
            	return res.send({ msg: "Ocorreu um erro ao enviar o email, por favor recarregue a página e tente novamente." })
            }
        });

		res.send({ done: "Link de recuperação enviado para o E-mail: <b>"+customer.email+"</b> Caso este não seja seu e-mail atual por favor contate um consultor e solicite a alteração." });
	} catch (err) {
		console.log(err);
		return res.send("Ocorreu um erro ao tentar recuperar sua senha, por favor entre em contato com um consultor comercial!");
	};
};

customerController.recover.password = async (req, res) => {
	JWT.verify(req.params.token, process.env.SECRET_KEY, async (err, authData) => {
		if(err) {
			return res.send({ msg: "O código é inválido, tente novamente ou solicite um novo código" });
		} else {
			let customer = (await Customer.findBy.token(req.params.token))[0];
			if(!customer){ 
				return res.send({ msg: "O código é inválido, tente novamente ou solicite um novo código" });
			}

			if(authData.data.customer_id == customer.id){
				return res.render('customer/update-password', { token: req.params.token });
			} else {
				return res.send({ msg: "O código é inválido, tente novamente ou solicite um novo código" });
			}
		}
	});
};

customerController.recover.update = async (req, res) => {
	JWT.verify(req.body.token, process.env.SECRET_KEY, async (err, authData) => {
		if(err) {
			return res.send({ msg: "O código é inválido, tente novamente ou solicite um novo código" });
		} else {
			let customer = (await Customer.findBy.token(req.body.token))[0];
			if(!customer){ 
				return res.send({ msg: "O código é inválido, tente novamente ou solicite um novo código" });
			}

			if(authData.data.customer_id == customer.id){
				if(!req.body.password || req.body.password.length < 4){ return res.send({ msg: 'Senha inválida.' }); };
				if(req.body.password !== req.body.password_confirm){ return res.send({ msg: 'As senhas não correspondem.' }); }

				customer.password = bcrypt.hashSync(req.body.password, null, null);
				customer.password_confirm = bcrypt.hashSync(req.body.password_confirm, null, null);

				await Customer.updatePassword(customer);
				await Customer.destroyToken(req.body.token);

				return res.send({ done: "Sua senha foi atualizada com sucesso!" });
			} else {
				return res.send({ msg: "O código é inválido, tente novamente ou solicite um novo código" });
			}
		}
	});
};

module.exports = customerController;