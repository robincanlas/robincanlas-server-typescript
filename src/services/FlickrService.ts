import axios from 'axios';
import { appConfig } from '../constants';
import { Photo } from '../models';

export class FlickrService {
  private static readonly host: string = appConfig.flickerApi.host;

  public async getPhotos(): Promise<Photo.GetAllFlickrApi[]> {
    return await axios.get(FlickrService.host)
    .then(response => {
      return response.data.photos.photo;
    })
    .catch(error => {
      console.warn(error);
      return null;
    });
  }
}