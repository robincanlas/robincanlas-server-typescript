import {
  Get,
  Route,
  SuccessResponse,
  Response,
  Tags,
  Path,
  Put,
  Body,
  Post,
  Hidden,
  Patch
} from 'tsoa';
import { BaseController } from './';
import { server } from '..';
import { Work } from '../models';
import { appConfig } from '../config/Environment';

@Tags('Work service')
@Route('work')
export class WorkController extends BaseController {

  @SuccessResponse(201, 'Success')
  @Response(400, 'Bad Request')
  @Response(500, 'Service Error')
  @Get()
  public async getWork(): Promise<Work.Get[]> {
    try {
      const works: Work.Get[] = await server.redisService.getOrSetCache('get-works', server.mongoDbService.getWorks);

      return works.sort((a, b) => b.index - a.index);
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
        server.mongoDbService.getWorkByIndex('$gt', current.index, 1),
        server.mongoDbService.getWorkByIndex('$lt', current.index, -1)
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
  
  @Hidden()
  @SuccessResponse(201, 'Success')
  @Response(400, 'Bad Request')
  @Response(403, 'Forbidden')
  @Response(500, 'Service Error')
  @Put()
  public async insertWorks(@Body() body: Work.Update): Promise<boolean> {
    try {
      if (body.master_password === appConfig.masterPassword) {
        await server.mongoDbService.deleteAllWorks();
        await server.mongoDbService.insertManyWorks(body.works);
  
        return true;
      } else {
        this.setStatus(403);
      }
  
      return false; 
    } catch (error) {
      return error;
    }
  }

  @Hidden()
  @SuccessResponse(201, 'Success')
  @Response(400, 'Bad Request')
  @Response(403, 'Forbidden')
  @Response(500, 'Service Error')
  @Post()
  public async createWork(@Body() body: Work.Update): Promise<boolean> {
    try {
      if (body.master_password === appConfig.masterPassword) {
        await server.mongoDbService.insertManyWorks(body.works);
  
        return true;
      } else {
        this.setStatus(403);
      }
  
      return false; 
    } catch (error) {
      return error;
    }
  }

  @SuccessResponse(201, 'Success')
  @Response(400, 'Bad Request')
  @Response(403, 'Forbidden')
  @Response(500, 'Service Error')
  @Patch('description')
  public async updateWorkDescription(@Body() body: Work.UpdateDescription): Promise<string> {
    try {
      if (body.master_password === appConfig.masterPassword) {
        await server.mongoDbService.updateWorkDescription(body);
        return 'Success!';
      } else {
        this.setStatus(403);
      }
  
      return 'Failed'; 
    } catch (error) {
      console.log(error);
      return 'Failed';
    }
  }
}