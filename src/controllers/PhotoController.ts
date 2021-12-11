import {
  Get,
  Route,
  SuccessResponse,
  Response,
  Tags,
} from 'tsoa';
import { BaseController } from './';
import { server } from '..';
import { Photo } from '../models';

@Tags('Photos')
@Route('photo')
export class PhotoController extends BaseController {
  
  @SuccessResponse(201, 'Success')
  @Response(400, 'Bad Request')
  @Response(500, 'Service Error')
  @Get()
  public async getPhotos (): Promise<Photo.Get[]> {
    try {
      return await server.mongoDbService.getPhotos();      
    } catch (error) {
      console.warn('error fetching photos', error);
      throw {
        status: 500,
        message: 'error fetching photos'
      };
    }
  }
}