const lib = require("jarmlib");

const Sale = require('../../model/sale/main');

const saleController = {};

function customerStrictParams(customerId) {
  return {
    keys: ["sale.customer_id"],
    values: [customerId]
  };
}

saleController.index = async (req, res) => {
  if (!req.user) { return res.redirect('/lojista/login'); }
  res.render('customer/sale');
};

saleController.filter = async (req, res) => {
  if (!req.user?.id) {
    return res.send({ unauthorized: "Você não tem permissão para realizar esta ação." });
  }

  const period = { key: "sale_date", start: req.body.periodStart, end: req.body.periodEnd };
  const strict_params = customerStrictParams(req.user.id);

  lib.Query.fillParam("sale.status", req.body.status, strict_params);

  const order_params = [["id", "DESC"]];

  try {
    let sales = await Sale.filter({ period, strict_params, order_params });
    res.send(sales);
  } catch (err) {
    console.log(err);
    res.send({ msg: "Ocorreu um erro ao filtrar as vendas, favor contatar o suporte" });
  };
};

saleController.findById = async (req, res) => {
  if (!req.user?.id) {
    return res.send({ unauthorized: "Você não tem permissão para realizar esta ação." });
  }

  const strict_params = customerStrictParams(req.user.id);
  lib.Query.fillParam("sale.id", req.params.id, strict_params);

  try {
    let sale = (await Sale.filter({ strict_params }))[0];

    if (!sale) {
      return res.send({ msg: "Pedido não encontrado." });
    }

    sale.products = await Sale.product.list(sale.id);
    sale.packages = await Sale.package.list(sale.id);
    for (let i in sale.packages) {
      sale.packages[i].products = [];
      let package_products = await Sale.package.product.list(sale.id, sale.packages[i].package_id);
      for (let j in package_products) {
        sale.packages[i].products.push(package_products[j]);
      };
    };

    res.send(sale);
  } catch (err) {
    console.log(err);
    res.send({ msg: "Ocorreu um erro ao filtrar as vendas, favor contatar o suporte" });
  };
};

module.exports = saleController;