import * as dotenv from 'dotenv';

// INITIALIZE dot env
dotenv.config();

export const appConfig = {
  environment: process.env.NODE_ENV,
  port: +process.env.SERVER_PORT,
  swaggerEnable: process.env.SWAGGER_ENABLE,
  mongoDBConnection: process.env.MONGODB_CONNECTION,
  flickerApi: {
    host: process.env.FLICKER_API
  },
  cloudinaryApi: {
    host: process.env.CLOUDINARY_API
  }
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

export const cloudinarySizes = {
  sm: 'c_scale,h_146,q_100,w_200',
  md: 'c_scale,h_291,q_100,w_400',
  lg: 'c_scale,h_583,q_100,w_800',
  xl: 'c_scale,h_662,q_100,w_910',
  sharp_img: 'w_1000,ar_16:9,c_fill,g_auto,e_sharpen'
};