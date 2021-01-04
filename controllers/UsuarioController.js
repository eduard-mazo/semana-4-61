const bcrypt = require('bcryptjs');
const models = require('../models');
const token = require('../services/token');

module.exports = {
  add: async (req, res, next) => {
    try {
      req.body.password = await bcrypt.hash(req.body.password, 10);
      const reg = await models.Usuario.create(req.body);
      res.status(200).json(reg);
    } catch (e) {
      res.status(500).send({
        message: 'Ocurrió un error',
      });
      next(e);
    }
  },
  list: async (req, res, next) => {
    try {
      res.status(200).json(await models.Usuario.findAll());
    } catch (e) {
      res.status(500).send({ message: 'Ocurrió un error' });
      next(e);
    }
  },
  login: async (req, res, next) => {
    try {
      const user = await models.Usuario.findOne({ where: { email: req.body.email } });
      if (user) {
        if (await bcrypt.compare(req.body.password, user.password)) {
          const tokenReturn = await token.encode(user.id, user.rol);
          res.status(200).json({ user, tokenReturn });
        } else {
          res.status(401).send({ auth: false, accessToken: null, reason: 'Password Incorrecto' });
        }
      } else {
        res.status(404).send({ message: 'No existe el usuario' });
      }
    } catch (e) {
      res.status(500).send({ message: 'Ocurrió un error' });
      next(e);
    }
  },
  update: async (req, res, next) => {
    try {
      res.status(200)
        .json(await models.Usuario.update(
          { nombre: req.body.nombre, descripcion: req.body.descripcion },
          { where: { id: req.body.id } },
        ));
    } catch (e) {
      res.status(500).send({ message: 'Ocurrió un error' });
      next(e);
    }
  },
  activate: async (req, res, next) => {
    try {
      res.status(200)
        .json(await models.Usuario.update({ estado: 1 }, { where: { id: req.body.id } }));
    } catch (e) {
      res.status(500).send({ message: 'Ocurrió un error' });
      next(e);
    }
  },
  deactivate: async (req, res, next) => {
    try {
      res.status(200)
        .json(await models.Usuario.update({ estado: 0 }, { where: { id: req.body.id } }));
    } catch (e) {
      res.status(500).send({ message: 'Ocurrió un error' });
      next(e);
    }
  },
};
