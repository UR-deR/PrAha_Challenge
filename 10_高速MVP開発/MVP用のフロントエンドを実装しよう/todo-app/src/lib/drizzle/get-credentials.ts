import { log } from 'node:console';
import { z } from 'zod';

export type Credentials = ReturnType<typeof getCredentials>;

export const getCredentials = () => {
  const URL = z.string().parse(process.env['NEXT_PUBLIC_SUPABASE_URL']);

  return {
    URL
  };
};
