import fs from 'node:fs/promises';
import path from 'node:path';
import url from 'node:url';
import pool from './server/database.js';

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
fs.readFile(`${__dirname}/sql/setup.sql`, { encoding: 'utf-8' })
  .then((sql) => pool.query(sql))
  .then(() => {
    if (process.env.NODE_ENV !== 'test') {
      console.log('✅ Database setup complete!');
    }
  })
  .catch((error) => {
    const dbNotFound = error.message.match(
      /database "(.+)" does not exist/i
    );

    if (dbNotFound) {
      const [err, db] = dbNotFound;
      console.error('❌ Error: ' + err);
      console.info(
        `Try running \`createdb -U postgres ${db}\` in your terminal`
      );
    } else {
      console.error(error);
      console.error('❌ Error: ' + error.message);
    }
  })
  .finally(() => {
    // Shut down the pool so we can exit (otherwise this hangs).
    return pool.end();
  });
