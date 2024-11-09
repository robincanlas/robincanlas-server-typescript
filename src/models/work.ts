import { Schema, model } from 'mongoose';

export namespace Work {
  export interface Get {
    id: string;
    name: string;
    url: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
    description: string;
    technologies: string[];
    show: boolean;
    year: number;
    index: number;
    sharp_img: string;
    code: string | null;
    site: string | null;
  }

  export interface GetByIndex {
    current: Work.Get;
    previous: string | null;
    next: string | null;
  }

  export interface Update {
    works: Work.Get[];
    master_password: string;
  }

  export interface Create {
    work: Omit<Work.Get, "index">;
    master_password: string;
  }

  export interface UpdateDescription {
    id: string;
    description: string;
    master_password: string;
  }
}

export const WorkSchema = new Schema<Work.Get>({
  id: String,
  name : String,
  url : String,
  sm : String,
  md : String,
  lg : String,
  xl : String,
  description : String,
  technologies: Array,
  show: Boolean,
  year: Number,
  index: Number,
  sharp_img: String,
  code: String,
  site: String
}, {
  collection: 'works'
});

export const WorkModel = model<Work.Get>('WorkModel', WorkSchema);