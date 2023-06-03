import {
  Get,
  Route,
  SuccessResponse,
  Response,
  Tags,
  Path,
  Query
} from 'tsoa';
import { Covid } from '../models';
import { DiseaseShService } from '../services';
import { BaseController } from './';

@Tags('Covid-19 service')
@Route('covid19')
export class Covid19Controller extends BaseController {
  private diseaseShService: DiseaseShService = new DiseaseShService();

  /**
   * Get historical data based on number of days and country name
   * @param {string} country Country name
   * @param {string} lastdays Number of days to return. Use 'all' for the full data set (e.g. 15, all, 24)
   */
  @SuccessResponse(201, 'Success')
  @Response(400, 'Bad Request')
  @Response(500, 'Service Error')
  @Get('historical/{country}')
  public async getHistoricalByCountry(
    @Path() country: string,
    @Query() lastdays: string = '30'
  ): Promise<Covid.GetHistoricalByCountry> {
    return await this.diseaseShService.getHistoricalByCountry(country, lastdays);
  }
 
  @SuccessResponse(201, 'Success')
  @Response(400, 'Bad Request')
  @Response(500, 'Service Error')
  @Get('countries')
  public async getCountries(): Promise<Covid.GetCountry[]> {
    return await this.diseaseShService.getCountries();
  }

  @SuccessResponse(201, 'Success')
  @Response(400, 'Bad Request')
  @Response(500, 'Service Error')
  @Get('list/jhucsse')
  public async getCountriesJhucsse(): Promise<Covid.JhucsseCountries[]> {
    // return await this.diseaseShService.getCountriesJhucsse();
    return await this.diseaseShService.getCountriesWorldometers();
  }

  @SuccessResponse(201, 'Success')
  @Response(400, 'Bad Request')
  @Response(500, 'Service Error')
  @Get('list/worldometers')
  public async getCountriesWorldometers(): Promise<Covid.JhucsseCountries[]> {
    return await this.diseaseShService.getCountriesWorldometers();
  }

  @SuccessResponse(201, 'Success')
  @Response(400, 'Bad Request')
  @Response(500, 'Service Error')
  @Get('list/worldometers/raw')
  public async getCountriesWorldometersRaw(): Promise<Covid.WorldometerCountries[]> {
    return await this.diseaseShService.getCountriesWorldometersRaw();
  }

  @SuccessResponse(201, 'Success')
  @Response(400, 'Bad Request')
  @Response(500, 'Service Error')
  @Get('all')
  public async getAll(): Promise<Covid.GetAll> {
    return await this.diseaseShService.getAll();
  }

  /**
   * Get historical data based on number of days
   * @param {string} lastdays Number of days to return. Use 'all' for the full data set (e.g. 15, all, 24)
   */
  @SuccessResponse(201, 'Success')
  @Response(400, 'Bad Request')
  @Response(500, 'Service Error')
  @Get('historical/all')
  public async getHistorical(
    @Query() lastdays: string = '30'
  ): Promise<Covid.GetHistorical> {
    return await this.diseaseShService.getHistorical(lastdays);
  }
  
}