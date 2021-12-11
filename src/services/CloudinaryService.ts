import axios from 'axios';
import { appConfig } from '../constants';
import { Photo } from '../models';

export class CloudinaryService {
  private static readonly host: string = appConfig.cloudinaryApi.host;

  public async getPhotos(): Promise<Photo.GetAllCloudinaryApi[]> {
    return await axios.get(CloudinaryService.host)
    .then(response => {
      return response.data.resources;
    })
    .catch(error => {
      console.warn(error);
      return null;
    });
  }
}