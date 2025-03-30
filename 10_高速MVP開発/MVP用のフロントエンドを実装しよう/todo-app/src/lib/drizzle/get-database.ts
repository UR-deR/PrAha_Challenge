import { drizzle } from 'drizzle-orm/postgres-js';
import memoize from 'just-memoize';
import postgres from 'postgres';
import { getCredentials } from './get-credentials';
import * as schema from './schema';

export type Database = ReturnType<typeof getDatabase>;

export const getDatabase = memoize(() => {
  const credentials = getCredentials();
  const connectionString = credentials.URL;  
  const client = postgres(connectionString, { prepare: false })

  return drizzle(client, { schema });
});
