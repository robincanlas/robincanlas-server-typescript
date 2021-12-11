import mongoose from 'mongoose';
import { appConfig } from '../constants';
import { Photo, PhotoModel, Work, WorkModel } from '../models';

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
    return await PhotoModel.find({}, { '_id': 0 });
  }

  public async getWorks(): Promise<Work.Get[]> {
    return await WorkModel
    .find({ 'show': true }, { '_id': 0 })
    .sort({ 'index': 1 });
  }
}