import { Db } from 'mongodb';

// Add age to dog
// Created on Jan 17, 2024 at 12:15
export = {
  async up(db: Db) {
    await db.collection('dogs').updateMany({}, { $set: { age: null } });
  },

  async down(db: Db) {
    await db.collection('dogs').updateMany({}, { $unset: { age: null } });
  },
};
