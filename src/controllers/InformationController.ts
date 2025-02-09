import {
  Get,
  Route,
  SuccessResponse,
  Response,
  Tags,
  Put,
  Body
} from 'tsoa';
import { BaseController } from './';
import { server } from '..';
import { Information } from '../models';
import { appConfig } from '../config/Environment';

@Tags('Information service')
@Route('information')
export class InformationController extends BaseController {
  
  @SuccessResponse(201, 'Success')
  @Response(400, 'Bad Request')
  @Response(500, 'Service Error')
  @Get()
  public async getInformation (): Promise<Information.Get> {
    const redisKey: string = 'get-information';
    try {
      return await server.redisService.getOrSetCache(redisKey, server.mongoDbService.getInformation)
    } catch (error) {
      console.warn('error fetching information', error);
      throw {
        status: 500,
        message: 'error fetching information'
      };
    }
  }

  @SuccessResponse(201, 'Success')
  @Response(400, 'Bad Request')
  @Response(500, 'Service Error')
  @Put('update/employmentStatus')
  public async updateEmploymentStatus (
    @Body() body: Information.UpdateEmploymentStatusRequest
  ): Promise<string> {
    try {
      if (body.master_password === appConfig.masterPassword) { 
        const newStatus: Information.UpdateEmploymentStatusMongoose = {
          ...body,
          isEmployed: +body.isEmployed < 1 ? false : true
        }
        await server.mongoDbService.updateEmploymentStatus(newStatus); 
        return 'Success';
      } else {
        return 'Failed';
      }
    } catch (error) {
      console.warn('error updating information', error);
      throw {
        status: 500,
        message: 'error updating information'
      };
    }
  }

  @SuccessResponse(201, 'Success')
  @Response(400, 'Bad Request')
  @Response(500, 'Service Error')
  @Put('update/phoneNumber')
  public async updatePhoneNumber (
    @Body() body: Information.UpdatePhoneNumber
  ): Promise<string> {
    try {
      if (body.master_password === appConfig.masterPassword) { 
        await server.mongoDbService.updatePhoneNumber(body); 
        return 'Success';
      } else {
        return 'Failed';
      }
    } catch (error) {
      console.warn('error updating information', error);
      throw {
        status: 500,
        message: 'error updating information'
      };
    }
  }

  @SuccessResponse(201, 'Success')
  @Response(400, 'Bad Request')
  @Response(500, 'Service Error')
  @Put('update/phoneNumber')
  public async updateFreelanceStatus (
    @Body() body: Information.UpdateFreelanceStatus
  ): Promise<string> {
    try {
      if (body.master_password === appConfig.masterPassword) { 
        await server.mongoDbService.updateFreelanceStatus({
          availableForFreelance: body.availableForFreelance
        }); 
        return 'Success';
      } else {
        return 'Failed';
      }
    } catch (error) {
      console.warn('error updating information', error);
      throw {
        status: 500,
        message: 'error updating information'
      };
    }
  }
}