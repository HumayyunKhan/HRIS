const host = 'localhost';
const user = 'root';
const password = 'LearnWordpress';
// const database = 'mydb';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const Importer = require('mysql-import');

// import mysql from 'mysql';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const dotenv = require('dotenv');
dotenv.config();

export const updateDb = (dbName: string) => {
  const importer = new Importer({ host, user, password, database: dbName });
  // New onProgress method, added in version 5.0!
  importer.onProgress(progress => {
    const percent = Math.floor((progress.bytes_processed / progress.total_bytes) * 10000) / 100;
    console.log(`${percent}% Completed`);
  });

  importer
    .import('src/core/config/Dump06272022.sql')
    .then(() => {
      const files_imported = importer.getImported();
      console.log(`${files_imported.length} SQL file(s) imported.`);
      return true;
    })
    .catch(err => {
      console.error(err);
      throw err;
    });
};
