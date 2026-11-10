'use strict';

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('Komiks', [
      {
        title: 'Naruto',
        author: 'Masashi Kishimoto',
        description: 'Perjalanan seorang ninja',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Bleach',
        author: 'Tite Kubo',
        description: 'Pertarungan para shinigami',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Komiks', null, {});
  },
};