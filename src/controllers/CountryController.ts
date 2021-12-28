import {
  Get,
  Route,
  SuccessResponse,
  Response,
  Tags,
  Path
} from 'tsoa';
import { BaseController } from './';
import { PositionStackService } from '../services';
import { Country } from '../models/country';

@Tags('Country service')
@Route('country')
export class CountryController extends BaseController {
  private positionStackService: PositionStackService = new PositionStackService();
  
  @SuccessResponse(201, 'Success')
  @Response(400, 'Bad Request')
  @Response(500, 'Service Error')
  @Get('{countryName}')
  public async getCountries(@Path() countryName: string): Promise<Country.Get[]> {
    try {
      return await this.positionStackService.getCountries(countryName);  
    } catch (error) {
      console.warn('error fetching countries', error);
      throw {
        status: 500,
        message: 'error fetching countries'
      };
    }
  }
}