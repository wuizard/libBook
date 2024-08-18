import { Schema, Document } from 'mongoose';

export interface IBook extends Document {
  title: string;
  author: string;
  publishedYear: number;
  genres: [string],
  stock: number,
  createdDate: Date,
  updatedDate: Date
}

export const bookSchema = new Schema<IBook>({
  title: String,
  author: String,
  publishedYear: Number,
  genres: [String],
  stock: Number,
  createdDate: {
    type: Date,
    default: Date.now,
  },
  updatedDate: {
    type: Date,
    default: Date.now,
  },
});