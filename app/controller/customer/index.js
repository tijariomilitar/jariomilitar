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
const fs = require("fs");

const customerController = {};

function getAppBaseUrl(req) {
  if (process.env.APP_URL) return process.env.APP_URL.replace(/\/$/, "");
  return `${req.protocol}://${req.get("host")}`;
}

async function sendRecoverMail(req, res, access) {
  try {
    const customer = await Customer.findByAccess(access);

    if (!customer) {
      return res.send({ msg: "Não foi encontrado nenhum usuário, por favor verifique os dados e tente novamente" });
    }

    if (!customer.email) {
      return res.send({ done: "Você ainda não cadastrou um email para sua conta, por favor entre em contato com um consultor comercial." });
    }

    const JWTData = {
      iss: 'jariomilitar-api',
      data: {
        customer_id: customer.id,
        access: customer.access
      }
    };

    const token = await Token.generate(JWTData);

    if (!token) {
      return res.send({ msg: "Ocorreu um erro ao gerar o link de recuperação, por favor tente novamente." });
    }

    await Customer.setToken(token, customer.id);

    const baseUrl = getAppBaseUrl(req);
    const resetUrl = `${baseUrl}/lojista/alterar-senha/${encodeURIComponent(token)}`;

    const data = await ejs.renderFile(
      path.join(__dirname, "../../../app/view/customer/mail-template/recover.ejs"),
      { customer, resetUrl }
    );

    const option = {
      from: "JA Rio Militar <comercial@jariomilitar.com.br>",
      to: `${customer.name} <${customer.email}>`,
      subject: "Recuperação de senha",
      html: data
    };

    const faviconPath = path.join(__dirname, "../../../public/images/favicon/favicon-white.png");
    if (fs.existsSync(faviconPath)) {
      option.attachments = [{
        filename: 'favicon.png',
        path: faviconPath,
        cid: 'favicon'
      }];
    }

    await new Promise((resolve, reject) => {
      Mailer.sendMail(option, (err, info) => {
        if (err) reject(err);
        else resolve(info);
      });
    });

    return res.send({
      done: "Link de recuperação enviado para o E-mail: <b>" + customer.email + "</b> Caso este não seja seu e-mail atual por favor contate um consultor e solicite a alteração."
    });
  } catch (err) {
    console.log(err);
    return res.send({ msg: "Ocorreu um erro ao tentar recuperar sua senha, por favor entre em contato com um consultor comercial!" });
  }
}

customerController.index = async (req, res) => {
  res.redirect('/portal-do-lojista');
};

customerController.home = async (req, res) => {
  if (!req.user) { return res.redirect('/lojista/login'); }

  let customer = (await Customer.findBy.id(req.user.id))[0];

  const period = {
    key: "sale_date",
    start: (new Date().getTime()) - (lib.date.timestamp.day() * 90),
    end: new Date().getTime()
  };

  const strict_params = {
    keys: ["sale.customer_id"],
    values: [req.user.id]
  };
  const order_params = [["id", "DESC"]];
  let sales = await Sale.filter({ period, strict_params, order_params });

  const saleStatistics = {
    saleValue: 0,
    shipmentValue: 0,
    discountValue: 0,
    totalValue: 0
  };

  for (let i in sales) {
    if (sales[i].status == "Ag. pagamento 2/2"
      || sales[i].status == "Ag. boletos"
      || sales[i].status == "Ag. cartão de crédito"
      || sales[i].status == "Ag. embalo"
      || sales[i].status == "Ag. nota fiscal"
      || sales[i].status == "Ag. envio"
      || sales[i].status == "Enviado"
      || sales[i].status == "Ag. envio p/ retirada"
      || sales[i].status == "Ag. transporte p/ P.R."
      || sales[i].status == "A caminho do P.R."
      || sales[i].status == "Disponível para retirada"
      || sales[i].status == "Entregue") {
      saleStatistics.saleValue += parseFloat(sales[i].product_value);
      saleStatistics.saleValue += parseFloat(sales[i].package_value);
      saleStatistics.shipmentValue += parseFloat(sales[i].shipment_value);
      saleStatistics.discountValue += parseFloat(sales[i].discount_value);
      saleStatistics.totalValue += parseFloat(sales[i].value);
    }
  };

  for (let i in sales) {
    if (sales[i].status == "Ag. pagamento 2/2"
      || sales[i].status == "Ag. boletos"
      || sales[i].status == "Ag. cartão de crédito"
      || sales[i].status == "Ag. embalo"
      || sales[i].status == "Ag. nota fiscal"
      || sales[i].status == "Ag. envio"
      || sales[i].status == "Enviado"
      || sales[i].status == "Ag. envio p/ retirada"
      || sales[i].status == "Ag. transporte p/ P.R."
      || sales[i].status == "A caminho do P.R."
      || sales[i].status == "Disponível para retirada"
      || sales[i].status == "Entregue") {
    } else {
      sales.splice(i, 1);
      i--;
    }
  };

  for (let i in Rank) {
    if (parseFloat(saleStatistics.totalValue) >= Rank[i].min_value && parseFloat(saleStatistics.totalValue) < Rank[i].max_value) {
      customer.rank = Rank[i];
    }
  };

  res.render('customer/home', { customer, sales, saleStatistics, Rank });
};

customerController.login = async (req, res) => {
  if (req.user) { return res.redirect("/lojista/home"); }

  res.render('customer/login', { user: req.user, message: req.flash('loginMessage') });
};

customerController.successfulLogin = (req, res) => {
  res.redirect('/lojista/home');
};

customerController.signup = async (req, res) => {
  if (req.user) {
    return res.redirect('/');
  };
  res.render('user/signup', { user: req.user, message: req.flash('signupMessage') });
};

customerController.successfulSignup = (req, res) => {
  res.redirect('/');
};

customerController.logout = (req, res) => {
  req.logout(function (err) {
    res.redirect('/user/login');
  });
};

customerController.recover = {};

customerController.recover.index = async (req, res) => {
  res.render('customer/recover', { message: req.query.message || null });
};

customerController.recover.request = async (req, res) => {
  return sendRecoverMail(req, res, req.body.access);
};

customerController.recover.sendMail = async (req, res) => {
  return sendRecoverMail(req, res, decodeURIComponent(req.params.access || ""));
};

customerController.recover.password = async (req, res) => {
  const token = decodeURIComponent(req.params.token || "");

  JWT.verify(token, process.env.SECRET_KEY, async (err, authData) => {
    if (err) {
      return res.render('customer/recover', {
        message: "O link é inválido ou expirou. Solicite uma nova recuperação de senha."
      });
    }

    let customer = (await Customer.findBy.token(token))[0];
    if (!customer) {
      return res.render('customer/recover', {
        message: "O link é inválido ou expirou. Solicite uma nova recuperação de senha."
      });
    }

    if (authData.data.customer_id == customer.id) {
      return res.render('customer/update-password', { token });
    }

    return res.render('customer/recover', {
      message: "O link é inválido ou expirou. Solicite uma nova recuperação de senha."
    });
  });
};

customerController.recover.update = async (req, res) => {
  JWT.verify(req.body.token, process.env.SECRET_KEY, async (err, authData) => {
    if (err) {
      return res.send({ msg: "O código é inválido, tente novamente ou solicite um novo código" });
    }

    let customer = (await Customer.findBy.token(req.body.token))[0];
    if (!customer) {
      return res.send({ msg: "O código é inválido, tente novamente ou solicite um novo código" });
    }

    if (authData.data.customer_id != customer.id) {
      return res.send({ msg: "O código é inválido, tente novamente ou solicite um novo código" });
    }

    if (!req.body.password || req.body.password.length < 4) {
      return res.send({ msg: 'Senha inválida.' });
    }

    if (req.body.password !== req.body.password_confirm) {
      return res.send({ msg: 'As senhas não correspondem.' });
    }

    customer.password = bcrypt.hashSync(req.body.password, null, null);
    await Customer.updatePassword(customer);
    await Customer.destroyToken(req.body.token);

    return res.send({ done: "Sua senha foi atualizada com sucesso!" });
  });
};

module.exports = customerController;