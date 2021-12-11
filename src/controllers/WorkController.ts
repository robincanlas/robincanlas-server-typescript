import {
  Get,
  Route,
  SuccessResponse,
  Response,
  Tags,
} from 'tsoa';
import { BaseController } from './';
import { server } from '..';
import { Work } from '../models';

@Tags('Work')
@Route('work')
export class WorkController extends BaseController {

  @SuccessResponse(201, 'Success')
  @Response(400, 'Bad Request')
  @Response(500, 'Service Error')
  @Get()
  public async getWork(): Promise<Work.Get[]> {
    try {
      return server.mongoDbService.getWorks();      
    } catch (error) {
      console.warn('error fetching work', error);
      throw {
        status: 500,
        message: 'error fetching work'
      };
    }
  }
}