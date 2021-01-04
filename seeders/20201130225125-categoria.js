module.exports = {
  up: async (queryInterface, Sequelize) => queryInterface.bulkInsert('Categoria', [{
    nombre: 'Categoria_test',
    descripcion: 'lorem limsus test',
    createdAt: new Date(),
    updatedAt: new Date(),

  }]),

  down: async (queryInterface, Sequelize) => queryInterface.bulkDelete('Categoria', null, {}),
};
