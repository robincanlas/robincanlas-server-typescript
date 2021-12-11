import {
  Get,
  Route,
  SuccessResponse,
  Response,
  Tags,
} from 'tsoa';
import { server } from '..';
import { Shoe } from '../models';
import { BaseController } from './';

@Tags('Shoe section')
@Route('shoe')
export class ShoeController extends BaseController {

  @SuccessResponse(201, 'Success')
  @Response(400, 'Bad Request')
  @Response(500, 'Service error')
  @Get()
  public async getShoes(): Promise<Shoe.Get[]> {
    try {
      return server.mongoDbService.getShoes();      
    } catch (error) {
      console.warn('error fetching shoes', error);
      throw {
        status: 500,
        message: 'error fetching shoes'
      };
    }
  }
}