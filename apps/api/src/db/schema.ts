import { pgTable, serial, text } from 'drizzle-orm/pg-core';

// Using default public schema
export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  name: text('name'),
  email: text('email'),
});