import { pgTable, serial, varchar, integer, timestamp, unique } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull(),
  age: integer('age'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
}, (table) => {
  return {
    uniqueEmail: unique().on(table.email),
  };
});

// Export type for TypeScript (optional)
export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;