import mongoose from 'mongoose';
import { appConfig } from '../config/Environment';
import { 
  Information,
  InformationModel,
  Photo, 
  PhotoModel, 
  Shoe, 
  ShoeModel, 
  Work, 
  WorkModel } from '../models';

export class MongoDbService {

  public db: mongoose.Connection;

  public async connect(): Promise<string> {
    return new Promise((resolve, reject) => {
      mongoose.connect(appConfig.mongoDBConnection);
      // Get the default connection
      this.db = mongoose.connection;
      // Bind connection to error event (to get notification of connection errors)
      this.db.on('error', () => {
        reject('MongoDB connection error:');
      });

      this.db.once('open', () => {
        resolve('MongoDB CONNECTED');
      }); 
    });
  }

  public async getPhotos(): Promise<Photo.Get[]> {
    return await PhotoModel.find({}, { '_id': 0 }).exec();
  }

  public async getWorks(): Promise<Work.Get[]> {
    return await WorkModel
    .find({ 'show': true }, { '_id': 0 })
    .sort({ 'index': 1 });
  }

  public async getWorkById(id: string): Promise<Work.Get> {
    return await WorkModel.findOne({ 'id': id }, { '_id': 0}).exec();
  }

  public async insertManyWorks(works: Work.Get[]): Promise<boolean> {
    return await WorkModel.insertMany(works)
    .then(() => {
      return true;
    }).catch(error => {
      console.warn(error);
      return false;
    });
  }

  public async deleteAllWorks(): Promise<boolean> {
    return await WorkModel.deleteMany({})
    .then(() => {
      return true;
    }).catch(error => {
      console.warn(error);
      return false;
    });
  }

  public async getWorkByIndex(lessOrGreat: string, index: number, sortBy: number): Promise<Work.Get[]> {
    // tslint:disable-next-line: max-line-length
    return await WorkModel.find({ 'index': { [lessOrGreat]: index }, 'show': true }, { '_id': 0 }).sort({ 'index': sortBy }).limit(1).exec();
  }

  public async getShoes(): Promise<Shoe.Get[]> {
    return await ShoeModel.find({}, {_id: 0}).exec();
  }

  public async getInformation(): Promise<Information.Get> {
    const information: Information.Get[] = await InformationModel.find({}, {_id: 0}).exec();
    if (information.length > 0) {
      return information[0];
    }
    return null;
  }

  public async updateEmploymentStatus(entity: Information.UpdateEmploymentStatus): Promise<void> {
    await InformationModel.updateOne({ 'email': entity.email }, { isEmployed: entity.isEmployed }).exec();
  }

  public async deleteAllPhotos(): Promise<boolean> {
    return await PhotoModel.deleteMany({})
    .then(() => {
      return true;
    }).catch(error => {
      console.warn(error);
      return false;
    });
  }

  public async insertManyPhotos(photos: Photo.GetAllFlickr[]): Promise<boolean> {
    return await PhotoModel.insertMany(photos)
    .then(() => {
      return true;
    }).catch(error => {
      console.warn(error);
      return false;
    });
  }
}