import mongoose from "mongoose";

import { IBook, bookSchema } from './books';

const mongoDBURL = 'mongodb+srv://bertwu:sB5CfpRIjFlL0Oa9@libbook.v0rwz.mongodb.net/staging?ssl=true&retryWrites=true&w=majority';
const mongooseOptions = {
    connectTimeoutMS: 30000,
};
const DB = mongoose.createConnection(mongoDBURL, mongooseOptions);

const Books = DB.model<IBook>('Books', bookSchema);

export { Books }