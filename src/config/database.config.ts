import { registerAs } from '@nestjs/config';

export default registerAs('database', () => ({
  user: process.env.USER,
  password: process.env.PASSWORD,
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT,
  name: process.env.DATABASE_NAME,
}));
