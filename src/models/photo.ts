import { Schema, model } from 'mongoose';

export namespace Photo {
  export interface Get {
    id: number;
    index: number;
    thumbnail: string;
    url: string;
    src: string;
    raw: string;
    original: string;
  }
}

export const PhotoSchema = new Schema<Photo.Get>({
  id: Number,
  index: Number,
  thumbnail: String,
  url: String,
  src: String,
  raw: String,
  original: String
}, {
  collection: 'photos'
});

export const PhotoModel = model<Photo.Get>('PhotoModel', PhotoSchema);