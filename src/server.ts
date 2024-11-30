import app from './app';
import mongoose from 'mongoose';
import config from './app/config/config';

async function main() {
  try {
    await mongoose.connect(config.database_uri as string);
    app.listen(config.path, () => {
      console.log(`Example app listening on port ${config.path}`);
    });
  } catch (error) {
    console.log(error);
  }
}

main();
