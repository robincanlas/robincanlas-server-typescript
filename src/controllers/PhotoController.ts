import {
  Get,
  Route,
  SuccessResponse,
  Response,
  Tags,
  Put,
  Body,
} from 'tsoa';
import { BaseController } from './';
import { server } from '..';
import { Photo, Validation } from '../models';
import { CloudinaryService, FlickrService, MongoDbService } from '../services';
import { Flickr, Cloudinary } from '../functions';
import { appConfig } from '../constants';

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

  @SuccessResponse(201, 'Success')
  @Response(400, 'Bad Request')
  @Response(401, 'Forbidden')
  @Response(500, 'Service Error')
  @Put('sync_flickr_and_mongdb')
  public async syncFlickAndMongodb(@Body() body: Validation.Security): Promise<any> {
    try {
      if (body.master_password === appConfig.masterPassword) {
        const deleteMany: boolean = await server.mongoDbService.deleteAllPhotos();
        if (deleteMany) {
          const photosApi: Photo.GetAllFlickrApi[] = await this.flickrService.getPhotos();
          const photos: Photo.GetAllFlickr[] = Flickr.constructFlickrPhotos(photosApi);
          const insertMany: boolean = await server.mongoDbService.insertManyPhotos(photos);

          if (insertMany) {
            this.setStatus(200);
            return true;
          } else {
            this.setStatus(401);
            return false;
          }
        } else {
          throw {
            status: 401,
            message: 'delete many error' 
          };
        }
      } else {
        this.setStatus(401);
      }
    } catch (error) {
      console.warn('error sync', error);
      throw {
        status: 500,
        message: 'error sync'
      };
    }
  }
}