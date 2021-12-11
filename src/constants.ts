import * as dotenv from 'dotenv';

// INITIALIZE dot env
dotenv.config();

export const appConfig = {
  environment: process.env.NODE_ENV,
  port: +process.env.SERVER_PORT,
  swaggerEnable: process.env.SWAGGER_ENABLE,
  mongoDBConnection: process.env.MONGODB_CONNECTION

  // elasticSearchLocal: {
  //   host: process.env.ELASTICSEARCH_LOCAL
  // }
};

export enum SWAGGER {
  DISABLE = '0',
  ENABLE = '1'
}

export const allowedOrigins: string[] = [
  'http://kristofferrobincanlas.github.io',
  'https://kristofferrobincanlas.github.io',
  'http://robincanlas.github.io',
  'https://robincanlas.github.io',
  'http://kristofferrobincanlas.com',
  'https://kristofferrobincanlas.com',
  'http://192.168.100.8:8000',
  'http://localhost:8000',
  'http://127.0.0.1:8000'
];