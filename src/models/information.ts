import { Schema, model } from 'mongoose';

export namespace Information {
  export interface Get {
    isEmployed: boolean;
    phone: string;
    email: string;
    availableForFreelance: boolean;
  }

  export interface Update {
    master_password: string;
    email: string;
    availableForFreelance: boolean;
    isEmployed: boolean;
    phone: string;
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