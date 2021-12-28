import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import * as swaggerUi from 'swagger-ui-express';
import * as swaggerDocument from '../build/swagger.json';
import { RegisterRoutes } from '../build/routes';
import { allowedOrigins, SWAGGER } from '../constants';
import { MongoDbService } from '../services/MongoDbService';
import { appConfig } from './Environment';

export class Server {
  public app: express.Express = express();
  private readonly port: string = appConfig.port;
  public mongoDbService: MongoDbService = new MongoDbService();
  constructor() {
    this.app.use(cors({
      credentials: true,
      origin: allowedOrigins,
      methods: 'POST, PUT, GET, PATCH, OPTIONS, DELETE',
      allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept, Authorization, apikey, x-access-token',
    }));
    this.app.use(cookieParser());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
    RegisterRoutes(this.app);

    if (appConfig.swaggerEnable === SWAGGER.ENABLE) {
      this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
    }
  }

  public async listen(port: string = this.port) {
    process.on('uncaughtException', this.criticalErrorHandler);
    process.on('unhandledRejection', this.criticalErrorHandler);
    const listen = this.app.listen(this.port, async () => {
      const dbConnection: string = await this.mongoDbService.connect();
      console.log(dbConnection);
      console.log(`Listening on port ${this.port}`);
      console.log(`Environment ${appConfig.environment}`);
    });

  //   Logger.info(`${secrets.app.environment} server running on port: ${this.port}`);
    return listen;
  }

  private criticalErrorHandler(...args) {
  //   Logger.error('Critical Error...', ...args);
  //   process.exit(1);
  }
}