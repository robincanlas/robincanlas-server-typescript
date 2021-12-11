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
import { CloudinaryService, FlickrService } from '../services';
import { Flickr, Cloudinary } from '../functions';

@Tags('Photos section')
@Route('photo')
export class PhotoController extends BaseController {
  private flickrService: FlickrService = new FlickrService();
  private cloudinaryService: CloudinaryService = new CloudinaryService();

  @SuccessResponse(201, 'Success')
  @Response(400, 'Bad Request')
  @Response(500, 'Service Error')
  @Get()
  public async getPhotos(): Promise<Photo.Get[]> {
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
  
  @SuccessResponse(201, 'Success')
  @Response(400, 'Bad Request')
  @Response(500, 'Service Error')
  @Get('flickr')
  public async getFlickrPhotos(): Promise<Photo.GetAllFlickr[]> {
    try {
      const photos: Photo.GetAllFlickrApi[] = await this.flickrService.getPhotos();
      if (photos) {
        return Flickr.constructFlickrPhotos(photos);
      } else {
        throw {
          status: 500,
          message: 'error fetching flickr photos'
        };
      }
    } catch (error) {
      console.warn('error fetching flickr photos', error);
      throw {
        status: 500,
        message: 'error fetching flickr photos'
      };
    }
  }

  @SuccessResponse(201, 'Success')
  @Response(400, 'Bad Request')
  @Response(500, 'Service Error')
  @Get('cloudinary')
  public async getCloudinaryPhotos(): Promise<Photo.GetAllCloudinary[]> {
    try {
      const photos: Photo.GetAllCloudinaryApi[] = await this.cloudinaryService.getPhotos();
      return Cloudinary.construct(photos);
    } catch (error) {
      console.warn('error fetching cloudinary photos', error);
      throw {
        status: 500,
        message: 'error fetching cloudinary photos'
      };
    }
  }
}