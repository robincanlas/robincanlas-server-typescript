import * as dotenv from 'dotenv';

// INITIALIZE dot env
dotenv.config();

export enum ENV {
  PROD = 'production',
  DEV = 'development'
}

export const appConfig = {
  environment: process.env.NODE_ENV,
  port: process.env.NODE_ENV === ENV.PROD ? process.env.PORT : process.env.SERVER_PORT,
  swaggerEnable: process.env.SWAGGER_ENABLE,
  masterPassword: process.env.MASTER_PASSWORD,
  mongoDBConnection: process.env.MONGODB_CONNECTION,
  flickerApi: {
    host: process.env.FLICKER_API
  },
  cloudinaryApi: {
    host: process.env.CLOUDINARY_API
  },
  positionStackApi: {
    host: process.env.POSITION_STACK_API,
    access_key: process.env.POSITION_STACK_API_ACCESS_KEY
  }
};
