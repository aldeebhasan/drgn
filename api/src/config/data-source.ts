import * as path from 'path';
import * as dotenv from 'dotenv';
import { DataSource } from 'typeorm';

dotenv.config({
  path: path.resolve('.env'),
});

export default new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT || 3306),
  username: process.env.DB_USER || '',
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [__dirname + '/../**/*.model{.ts,.js}'],
  synchronize: false,
  migrationsRun: false,
  logging: false,
  migrations: [__dirname + '/../migrations/*.ts'],
  dropSchema: false,
});
