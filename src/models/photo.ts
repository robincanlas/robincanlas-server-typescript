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

  export interface GetAllFlickrApi {
    id: string;
    owner: string;
    secret: string;
    server: string;
    farm: number;
    title: string;
    ispublic: number;
    isfriend: number;
    isfamily: number;
    url_o: string;
    height_o: number;
    width_o: number;
  }

  export interface GetAllFlickr {
    id: number;
    index: number;
    thumbnail: string;
    url: string;
    src: string;
    raw: string;
    original: string;
  }

  export interface GetAllCloudinaryApi {
    asset_id: string;
    public_id: string;
    format: string;
    version: number;
    resource_type: string;
    type: string;
    created_at: string;
    bytes: number;
    width: number;
    height: number;
    url: string;
    secure_url: string;
  }

  export interface GetAllCloudinary {
    id: string;
    name: string;
    url: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
    sharp_img: string;
    description: string;
    technologies: string[];
    show: boolean;
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