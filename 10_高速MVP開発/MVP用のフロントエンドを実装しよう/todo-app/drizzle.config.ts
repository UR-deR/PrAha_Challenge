import { defineConfig } from 'drizzle-kit';
import { getCredentials } from './src/lib/drizzle/get-credentials';

const credentials = getCredentials();

export default defineConfig({
  dialect: 'postgresql',
  schema: './src/lib/drizzle/schema.ts',
  out: './src/lib/drizzle/migrations',
  dbCredentials: {
    host: credentials.DB_HOST,
    port: credentials.DB_PORT,
    user: credentials.DB_USER,
    password: credentials.DB_PASSWORD,
    database: credentials.DB_NAME,
  },
});
