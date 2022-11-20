import { QueryInterface, DataTypes } from 'sequelize';

export default {
  up: async (queryInterface: QueryInterface): Promise<void> => {
    await queryInterface.createTable('Accounts', {
      id: {
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      balance: {
        allowNull: false,
        type: DataTypes.DECIMAL(12, 2),
      },
    });
  },
  down: async (queryInterface: QueryInterface): Promise<void> => {
    await queryInterface.dropTable('Accounts');
  },
};
