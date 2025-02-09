import { Schema, model } from 'mongoose';

export namespace Information {
  export interface Get {
    isEmployed: boolean;
    phone: string;
    email: string;
    availableForFreelance: boolean;
  }

  export interface UpdateEmploymentStatusRequest {
    isEmployed: string;
    master_password: string;
  }

  export interface UpdateEmploymentStatusMongoose {
    isEmployed: boolean;
    master_password: string;
  }

  export interface UpdatePhoneNumber {
    email: string;
    phone: string;
    master_password: string;  
    availableForFreelance: string;
  }

  export interface UpdateFreelanceStatus {
    master_password: string;
    availableForFreelance: string;
  }

  export interface UpdateEmail {
    master_password: string;
    email: string;
  }
}

export const InformationSchema = new Schema<Information.Get>({
  isEmployed: Boolean,
  phone: String,
  email: String,
  availableForFreelance: Boolean
}, {
  collection: 'informations'
});

export const InformationModel = model<Information.Get>('InformationModel', InformationSchema);