const db = require('../../../config/connection');

const lib = require('jarmlib');

const Lead = function () {
  this.id = 0;
  this.datetime = "";
  this.name = "";
  this.email = "";
  this.phone = "";

  this.save = () => {
    if (!this.datetime) { return { err: "É necessário a data de criação" } };
    if (!this.name) { return { err: "Informe seu nome completo" } };
    if (!this.email) { return { err: "Informe seu principal e-mail" } };
    if (!this.phone) { return { err: "Informe seu telefone para contato." } };

    let obj = lib.convertTo.object(this);
    let { query, values } = lib.Query.save(obj, 'cms_wt_erp.customer_lead');

    return db(query, values);
  };
};

module.exports = Lead;