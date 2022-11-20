import { SequelizeOptions } from 'sequelize-typescript';
import 'dotenv/config';

const config: SequelizeOptions = {
  username: process.env.DB_USER || 'ngcash',
  password: process.env.DB_PASS || '123456',
  database: 'ngcash',
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 3002,
  dialect: 'postgres',
  dialectOptions: {
    timezone: 'Z',
  },
  logging: false,
  models: [__dirname + '/models'],
};

module.exports = config;
