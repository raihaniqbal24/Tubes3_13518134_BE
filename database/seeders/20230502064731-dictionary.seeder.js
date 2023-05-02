/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert(
      'dictionary',
      [
        {
          question: 'pertanyaan 1',
          answer: 'jawaban 1',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          question: 'pertanyaan 2',
          answer: 'jawaban 2',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          question: 'pertanyaan 3',
          answer: 'jawaban 3',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          question: 'pertanyaan 4',
          answer: 'jawaban 4',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          question: 'pertanyaan 5',
          answer: 'jawaban 5',
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {},
    );
  },

  async down(queryInterface) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('dictionary', null, {});
  },
};
