import { Schema, model } from 'mongoose';

export namespace Information {
  export interface Get {
    isEmployed: boolean;
    phone: string;
    email: string;
  }

  export interface UpdateEmploymentStatusRequest {
    email: string;
    isEmployed: string;
    master_password: string;
  }

  export interface UpdateEmploymentStatusMongoose {
    email: string;
    isEmployed: boolean;
    master_password: string;
  }

  export interface UpdatePhoneNumber {
    email: string;
    phone: string;
    master_password: string;  
  }
}

export const InformationSchema = new Schema<Information.Get>({
  isEmployed: Boolean,
  phone: String,
  email: String
}, {
  collection: 'informations'
});

export const InformationModel = model<Information.Get>('InformationModel', InformationSchema);