import { pgTable, serial, text, integer } from 'drizzle-orm/pg-core';

// Using default public schema
export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').unique().notNull(),
  age: integer('age'),
});
