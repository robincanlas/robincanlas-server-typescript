import axios from 'axios';
import { appConfig } from '../config/Environment';
import { Covid } from '../models/country';

// https://github.com/disease-sh/API

export class DiseaseShService {
  private static readonly host: string = appConfig.diseaseShApi.host;

  public async getCountriesJhucsse(): Promise<Covid.JhucsseCountries[]> {
    return await axios.get(`${DiseaseShService.host}jhucsse`)
    .then(response => {
      return response.data;
    })
    .catch(error => {
      console.warn(error);
      return null;
    });
  }

  public async getCountriesWorldometers(): Promise<Covid.JhucsseCountries[]> {
    const countries: Covid.WorldometerCountries[] = await axios.get(`${DiseaseShService.host}countries`)
    .then(response => {
      return response.data;
    })
    .catch(error => {
      console.warn(error);
      return null;
    });

    return countries.map((country) => ({
      country: country.country,
      county: '',
      updatedAt: country.updated.toString(),
      stats: {
        confirmed: country.cases,
        deaths: country.deaths,
        recovered: country.recovered,
      },
      coordinates: {
        latitude: country.countryInfo.lat.toString(),
        longitude: country.countryInfo.long.toString()
      },
      province: '',
      flag: country.countryInfo.flag
    }));
  }

  public async getCountriesWorldometersRaw(): Promise<Covid.WorldometerCountries[]> {
    return await axios.get(`${DiseaseShService.host}countries`)
    .then(response => {
      return response.data;
    })
    .catch(error => {
      console.warn(error);
      return null;
    });
  }

  public async getAll(): Promise<Covid.GetAll> {
    return await axios.get(`${DiseaseShService.host}all`)
    .then(response => {
      return response.data;
    })
    .catch(error => {
      console.warn(error);
      return null;
    });
  }

  public async getHistorical(lastdays: string): Promise<Covid.GetHistorical> {
    return await axios.get(`${DiseaseShService.host}historical/all?lastdays=${lastdays}`)
    .then(response => {
      return response.data;
    })
    .catch(error => {
      console.warn(error);
      return null;
    });
  }

  public async getHistoricalByCountry(country: string, lastdays: string): Promise<Covid.GetHistoricalByCountry> {
    return await axios.get(`${DiseaseShService.host}historical/${country}?lastdays=${lastdays}`)
    .then(response => {
      return response.data;
    })
    .catch(error => {
      console.warn(error);
      return null;
    });
  }

  public async getCountries(): Promise<Covid.GetCountry[]> {
    return await axios.get(`${DiseaseShService.host}countries`)
    .then(response => {
      return response.data;
    })
    .catch(error => {
      console.warn(error);
      return null;
    });
  }
}