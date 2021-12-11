import { Schema, model } from 'mongoose';

export namespace Information {
  export interface Get {
    isEmployed: boolean;
    phone: string;
    email: string;
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