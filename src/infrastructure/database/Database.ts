/* eslint-disable no-console */
import mongoose, { ConnectOptions } from 'mongoose';

export class Database {
  dbUrl: string;

  constructor(dbUrl: string) {
    this.dbUrl = dbUrl;
  }

  static configureMongoose = () => {
    mongoose.set('toJSON', {
      virtuals: true,
      versionKey: false,
      transform: (doc, ret) => {
        delete ret._id;
      },
    });
    mongoose.set('toObject', {
      virtuals: true,
      versionKey: false,
      transform: (doc, ret) => {
        delete ret._id;
      },
    });
  };

  async connect(connectOptions?: ConnectOptions): Promise<void> {
    Database.configureMongoose();
    await mongoose.connect(this.dbUrl, connectOptions);
    console.log('Connected to mongodb');
  }
}
