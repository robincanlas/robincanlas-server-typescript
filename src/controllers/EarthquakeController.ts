import {
  Get,
  Route,
  SuccessResponse,
  Response,
  Tags,
  Path
} from 'tsoa';
import { BaseController } from './';
import { UsgsService } from '../services';
import { Earthquake } from '../models';

@Tags('Earthquake service')
@Route('earthquake')
export class EarthquakeController extends BaseController {
  private usgsService: UsgsService = new UsgsService();
  
  @SuccessResponse(201, 'Success')
  @Response(400, 'Bad Request')
  @Response(500, 'Service Error')
  @Get('/all/significant/{significantByDayWeekMonth}')
  public async getAllBySignificant(@Path() significantByDayWeekMonth: string): Promise<Earthquake.Get[]> {
    try {
      return await this.usgsService.getAllBySignificant(this.usgsService.dictionary[significantByDayWeekMonth]);  
    } catch (error) {
      console.warn('error fetching earthquakes', error);
      throw {
        status: 500,
        message: 'error fetching earthquakes'
      };
    }
  }

  @SuccessResponse(201, 'Success')
  @Response(400, 'Bad Request')
  @Response(500, 'Service Error')
  @Get('/all/by/{byDayWeekMonth}')
  public async getAllDay(@Path() byDayWeekMonth: string): Promise<Earthquake.Get[]> {
    try {
      return await this.usgsService.getAllBy(this.usgsService.dictionary[byDayWeekMonth]);  
    } catch (error) {
      console.warn('error fetching earthquakes', error);
      throw {
        status: 500,
        message: 'error fetching earthquakes'
      };
    }
  }

  @SuccessResponse(201, 'Success')
  @Response(400, 'Bad Request')
  @Response(500, 'Service Error')
  @Get('/byRange/{startDate}/{endDate}/{limit}')
  public async getByDateRange(@Path() startDate: string, @Path() endDate: string, @Path() limit: string): Promise<Earthquake.Get[]> {
    try {
      return await this.usgsService.getByRange(startDate, endDate, limit);  
    } catch (error) {
      console.warn('error fetching earthquakes', error);
      throw {
        status: 500,
        message: 'error fetching earthquakes'
      };
    }
  }
  
  @SuccessResponse(201, 'Success')
  @Response(400, 'Bad Request')
  @Response(500, 'Service Error')
  @Get('/byRange/{startDate}/{endDate}')
  public async getByDateRangeNoLimit(@Path() startDate: string, @Path() endDate: string): Promise<Earthquake.Get[]> {
    try {
      return await this.usgsService.getByRange(startDate, endDate);  
    } catch (error) {
      console.warn('error fetching earthquakes', error);
      throw {
        status: 500,
        message: 'error fetching earthquakes'
      };
    }
  } 
}