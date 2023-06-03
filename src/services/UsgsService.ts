import axios from 'axios';
import { appConfig } from '../config/Environment';
import { Earthquake } from '../models/earthquake';

export class UsgsService {
  private static readonly host: string = appConfig.usgsApi.host;
  private static readonly fdsnws: string = '/fdsnws/event/1/';
  private static readonly feedSummary: string = '/earthquakes/feed/v1.0/summary/';

  public dictionary: {[key: string]: string} = {
    bySignificantDay: 'significant_day.geojson',
    bySignificantWeek: 'significant_week.geojson',
    bySignificantMonth: 'significant_month.geojson',
    byAllDay: 'all_day.geojson',
    byAllWeek: 'all_week.geojson',
    byAllMonth: 'all_month.geojson',
  };

  public async getAllBy(byAll: string): Promise<Earthquake.Get[]> {
    return await axios.get(`${UsgsService.host}${UsgsService.feedSummary}${byAll}`)
    .then(response => {
      return response.data;
    })
    .catch(error => {
      console.warn(error);
      return null;
    });
  }

  public async getAllBySignificant(bySignificant: string): Promise<Earthquake.Get[]> {
    return await axios.get(`${UsgsService.host}${UsgsService.feedSummary}${bySignificant}`)
    .then(response => {
      return response.data;
    })
    .catch(error => {
      console.warn(error);
      return null;
    });
  }

  public async getByRange(startTime: string, endTime: string, limit: string = null): Promise<Earthquake.Get[]> {
    let query = `starttime=${startTime}&endtime=${endTime}`;
    query = limit ? query.concat(`&limit=${limit}`) : query;  

    return await axios.get(`${UsgsService.host}${UsgsService.fdsnws}query?format=geojson&${query}`)
    .then(response => {
      return response.data;
    })
    .catch(error => {
      console.warn(error);
      return null;
    });
  }

}
// https://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php
// https://earthquake.usgs.gov/fdsnws/event/1/