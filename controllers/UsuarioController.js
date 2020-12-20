const models = require('../models');
var bcrypt = require('bcryptjs');
const token = require('../services/token');

module.exports = {
    add: async(req, res, next) => {
        try {
            req.body.password = await bcrypt.hash(req.body.password, 10);
            const reg = await models.Usuario.create(req.body);
            res.status(200).json(reg);
        } catch (e) {
            res.status(500).send({
                message: 'Ocurrió un error'
            });
            next(e);
        }
    },
    login: async(req, res, next) => {
        try {
            console.log(req.body.email)
            let user = await models.Usuario.findOne({ where: { email: req.body.email } });
            if (user) {
                if (await bcrypt.compare(req.body.password, user.password)) {
                    const tokenReturn = await token.encode(user.id, user.rol);
                    res.status(200).json({ user, tokenReturn });
                } else {
                    res.status(401).send({ auth: false, accessToken:null , reason: 'Password Incorrecto' });
                }
            } else {
                res.status(404).send({ message: 'No existe el usuario' });
            }
        } catch (e) {
            res.status(500).send({ message: 'Ocurrió un error' });
            next(e);
        }
    }
}