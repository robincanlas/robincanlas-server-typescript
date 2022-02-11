import {
  Get,
  Route,
  SuccessResponse,
  Response,
  Tags,
} from 'tsoa';
import { BaseController } from './';
import { server } from '..';
import { Information } from '../models';

@Tags('Information service')
@Route('information')
export class InformationController extends BaseController {
  
  @SuccessResponse(201, 'Success')
  @Response(400, 'Bad Request')
  @Response(500, 'Service Error')
  @Get()
  public async getInformation (): Promise<Information.Get> {
    try {
      return await server.mongoDbService.getInformation();      
    } catch (error) {
      console.warn('error fetching information', error);
      throw {
        status: 500,
        message: 'error fetching information'
      };
    }
  }
}