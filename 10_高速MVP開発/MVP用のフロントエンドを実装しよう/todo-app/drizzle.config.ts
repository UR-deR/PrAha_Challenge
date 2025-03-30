import { defineConfig } from 'drizzle-kit';
import { getCredentials } from './src/lib/drizzle/get-credentials';

const credentials = getCredentials();

export default defineConfig({
  dialect: 'postgresql',
  schema: './src/lib/drizzle/schema.ts',
  out: './src/lib/drizzle/migrations',
  dbCredentials: {
    url: credentials.URL,
  }
});
