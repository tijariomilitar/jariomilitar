const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt-nodejs');

const Customer = require('../app/model/customer');

const db = require('./connection');

passport.serializeUser(async (user, done) => {
    done(null, user);
});

passport.deserializeUser(async (user, done) => {
    done(null, user);
});

passport.use(
    'local-signup',
    new LocalStrategy({
        usernameField : 'cnpj',
        passwordField : 'password',
        passReqToCallback : true
    },
    async (req, cnpj, password, done) => {
        try {
            return done(null, { id: user.id, business: user.business })
        } catch (err) {
            console.log(err);
            return done(null, false, req.flash('signupMessage', 'Ocorreu um erro favor contatar o suporte!'));
        }
    })
);

passport.use(
    'local-login',
    new LocalStrategy({
        usernameField : 'access',
        passwordField : 'password',
        passReqToCallback : true
    },
    async (req, access, password, done) => {
        if(!access) { return done(null, false, req.flash('loginMessage', 'É necessário preencher o CNPJ ou CPF.')); }
        if(!password) { return done(null, false, req.flash('loginMessage', 'É necessário preencher o Password.')); }

        try {
            let customer = await Customer.findBy.cnpj(access);

            if(!customer.length) {
                customer = await Customer.findBy.cpf(access);
            };

            if (!customer.length){
                return done(null, false, req.flash('loginMessage', 'Usuário não encontrado.'));
            };

            if(customer.length){
                if (!bcrypt.compareSync(password, customer[0].password)){
                    return done(null, false, req.flash('loginMessage', 'Senha inválida.'));
                };
                return done(null, { id: customer[0].id, access: customer[0].access });
            };
        } catch (err) {
            console.log(err);
        }
    })
);

module.exports = passport;