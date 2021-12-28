import axios from 'axios';
import { appConfig } from '../config/Environment';
import { Country } from '../models/country';

export class PositionStackService {
  private static readonly host: string = appConfig.positionStackApi.host;
  private static readonly access_key: string = appConfig.positionStackApi.access_key;

  public async getCountries(country: string): Promise<Country.Get[]> {
    return await axios.get(`${PositionStackService.host}forward`, 
    { params: { access_key: PositionStackService.access_key, query: country } })
    .then(response => {
      return response.data.data;
    })
    .catch(error => {
      console.warn(error);
      return null;
    });
  }
}