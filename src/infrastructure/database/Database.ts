/* eslint-disable no-console */
import mongoose, { ConnectOptions } from 'mongoose';
import { MONGODB_URL } from 'src/config/database';

export class Database {
  async connect(connectOptions?: ConnectOptions): Promise<void> {
    await mongoose.connect(MONGODB_URL, connectOptions);
    console.log('Connected to mongodb');
  }
}
