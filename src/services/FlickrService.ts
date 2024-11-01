import axios from 'axios';
import { appConfig } from '../config/Environment';
import { Photo } from '../models';

export class FlickrService {
  private static readonly host: string = appConfig.flickerApi.host;

  public async getPhotos(): Promise<Photo.GetAllFlickrApi[]> {
    return await fetch(FlickrService.host)
    .then(response => response.json())
    .then(data => data.photos.photo)
    .catch(error => {
      console.error(error);
      return null;
    });
  }
}