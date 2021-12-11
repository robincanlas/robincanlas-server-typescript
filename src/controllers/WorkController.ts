import {
  Get,
  Route,
  SuccessResponse,
  Response,
  Tags,
  Path,
} from 'tsoa';
import { BaseController } from './';
import { server } from '..';
import { Work } from '../models';

@Tags('Work section')
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

  @SuccessResponse(201, 'Success')
  @Response(400, 'Bad Request')
  @Response(404, 'Not Found')
  @Response(500, 'Service Error')
  @Get('{id}')
  public async getById(@Path() id: string): Promise<Work.GetByIndex | Work.Get> {
    const current: Work.Get = await server.mongoDbService.getWorkById(id);
    if (current) {
      const [previous, next] = await Promise.all([
        server.mongoDbService.getWorkByIndex('$lt', current.index, -1),
        server.mongoDbService.getWorkByIndex('$gt', current.index, 1)
      ]);
      const obj: Work.GetByIndex = {
        'current': current,
        'previous': previous.length > 0 ? previous[0].id : null,
        'next': next.length > 0 ? next[0].id : null 
      };
      return obj;
    } else {
      return current;
    }
  }
}