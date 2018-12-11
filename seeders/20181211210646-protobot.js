'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('transformers', [{
      name: 'szani',
      faction: 'neutral',
      power: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('transformers', null);
  }
};
