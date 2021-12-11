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
  index: Number
}, {
  collection: 'works'
});

export const WorkModel = model<Work.Get>('WorkModel', WorkSchema);