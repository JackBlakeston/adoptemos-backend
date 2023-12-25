import mongoose from 'mongoose';
import { Database } from '@src/infrastructure/database/Database';

jest.mock('mongoose', () => ({
  connect: jest.fn(),
  set: jest.fn(),
}));

describe('Database', () => {
  const mockDbUrl = 'foo';

  describe('constructor', () => {
    describe('WHEN creating an instance', () => {
      it('should set the dbUrl property', () => {
        const mockDatabase = new Database(mockDbUrl);

        expect(mockDatabase.dbUrl).toBe(mockDbUrl);
      });
    });
  });

  describe('connect method', () => {
    const mockDatabase = new Database(mockDbUrl);

    describe('WHEN called', () => {
      it('should connect to mongoose and set environment options', async () => {
        const mockOptions = { dbName: 'test' };

        await mockDatabase.connect(mockOptions);

        expect(mongoose.connect).toHaveBeenCalledWith(mockDbUrl, mockOptions);
        expect(mongoose.set).toHaveBeenCalledTimes(2);
      });
    });
  });
});
