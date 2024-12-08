import app from './app';
import mongoose from 'mongoose';
import config from './app/config/config';
import { Server } from 'http';

let server: Server;

async function main() {
  try {
    await mongoose.connect(config.database_uri as string);
    server = app.listen(config.path, () => {
      console.log(`Example app listening on port ${config.path}`);
    });
  } catch (error) {
    console.log(error);
  }
}

main();

process.on('unhandledRejection', () => {
  console.log(`👿 unhandledRejection is detected. server is shutting down...`);
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

process.on('uncaughtException', () => {
  console.log(`👿 uncaughtException is detected. server is shutting down...`);
  process.exit(1);
});
