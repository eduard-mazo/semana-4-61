const models = require('../models');

module.exports = {
  add: async (req, res, next) => {
    try {
      res.status(200).json(await models.Categoria.create(req.body));
    } catch (e) {
      res.status(500).send({ message: 'Ocurrió un error' });
      next(e);
    }
  },
  list: async (req, res, next) => {
    try {
      res.status(200).json(await models.Categoria.findAll());
    } catch (e) {
      res.status(500).send({ message: 'Ocurrió un error' });
      next(e);
    }
  },
  update: async (req, res, next) => {
    try {
      res.status(200)
        .json(await models.Categoria.update(
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
        .json(await models.Categoria.update({ estado: 1 }, { where: { id: req.body.id } }));
    } catch (e) {
      res.status(500).send({ message: 'Ocurrió un error' });
      next(e);
    }
  },
  deactivate: async (req, res, next) => {
    try {
      res.status(200)
        .json(await models.Categoria.update({ estado: 0 }, { where: { id: req.body.id } }));
    } catch (e) {
      res.status(500).send({ message: 'Ocurrió un error' });
      next(e);
    }
  },
};
