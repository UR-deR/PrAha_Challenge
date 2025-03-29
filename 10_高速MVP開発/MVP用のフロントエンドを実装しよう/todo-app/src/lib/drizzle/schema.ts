import { boolean, pgTable, varchar, numeric } from 'drizzle-orm/pg-core';

export const posts = pgTable('posts', {
  id: numeric('id').primaryKey(),
  userId: numeric('userId').notNull(),
  title: varchar('title').notNull(),
  body: boolean('body').notNull(),
});

export const users = pgTable('users', {
  id: numeric('id').primaryKey(),
  name: varchar('name').notNull(),
  username: varchar('username').notNull(),
  email: varchar('email').notNull(),
});
