import * as dotenv from 'dotenv';

// INITIALIZE dot env
dotenv.config();

export const appConfig = {
  environment: process.env.NODE_ENV,
  port: process.env.SERVER_PORT,
  swaggerEnable: process.env.SWAGGER_ENABLE,
  masterPassword: process.env.MASTER_PASSWORD,
  mongoDBConnection: process.env.MONGODB_CONNECTION,
  flickerApi: {
    host: process.env.FLICKER_API
  },
  cloudinaryApi: {
    host: process.env.CLOUDINARY_API
  }
};

export enum ENV {
  PROD = 'production',
  DEV = 'development'
}