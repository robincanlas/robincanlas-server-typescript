import { Schema, model } from 'mongoose';

export namespace Shoe {
  export interface Get {
    name: string;
    image: string;
    price: string;
  }
}

export const ShoeSchema = new Schema({
  name: String,
  image: String,
  price: String
}, {
  collection: 'shoes'
});

export const ShoeModel = model<Shoe.Get>('ShoeModel', ShoeSchema);