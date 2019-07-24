/* eslint-disable no-console */
/* eslint-disable import/first */

// Override NODE_ENV here if required.
// process.env.NODE_ENV = 'test';

import readline from 'readline';
import feathers from '@feathersjs/feathers';
import express from '@feathersjs/express';
import configuration from '@feathersjs/configuration';
// import { hooks } from '@feathersjs/authentication-local';

import mongoose from '../src/mongoose';
import userModel from '../src/models/user.model';
import roleModel from '../src/models/role.model';
import users from './users';
import roles from './roles';
import logger from '../src/logger';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const hasher = require('@feathersjs/authentication-local/lib/utils/hash');

const app = express(feathers());

// Load app configuration
app.configure(configuration());

// Configure database adapters
app.configure(mongoose);

const seedCollection: Function = (model: any, data: any) => {
  try {
    if (Array.isArray(data)) {
      return Promise.all(data.map(d => seedCollection(model, d)));
    }
    const { _id } = data;
    return model(app).replaceOne({ _id }, data, { upsert: true });
  } catch (error) {
    logger.info(error.ValidationError || error.errmsg);
    return Promise.resolve();
  }
};

const seedData = async () => {
  logger.info('Seeding roles...');
  await seedCollection(roleModel, roles);

  logger.info('Seeding users...');

  // Hash password
  await Promise.all(users.map(async (u) => {
    // eslint-disable-next-line no-param-reassign
    u.password = await hasher('password');
  }));
  await seedCollection(userModel, users);
};

const read = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const main = async () => {
  await app.get('mongooseConnection');
  read.question(`Seed database ${app.get('mongodb')}? (Y)`, async (ans) => {
    if (ans.toLowerCase() === 'y') {
      await seedData();
    }
    process.exit(0);
  });
};

main();
