import { Sequelize } from 'sequelize-typescript';
import 'dotenv/config';

const sequelize = new Sequelize({
  dialect: 'postgres',
  database: process.env.DB_NAME || 'ngcash',
  username: process.env.DB_USERNAME || 'ngcash',
  password: process.env.DB_PASSWORD || '123456',
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 3002,
  models: [__dirname + '/models'],
  logging: false,
});

export default sequelize;
