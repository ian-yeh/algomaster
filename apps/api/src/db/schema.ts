import { pgTable, uuid, text, timestamp, jsonb } from 'drizzle-orm/pg-core';

export const userProfiles = pgTable('user_profiles', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: text('user_id').notNull().unique(), // Links to Neon Auth user
  displayName: text('display_name'),
  bio: text('bio'),
  avatarUrl: text('avatar_url'),
  preferences: jsonb('preferences'), // JSON for settings
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// Your other app tables
export const posts = pgTable('posts', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: text('user_id').notNull(), // References Neon Auth user
  title: text('title').notNull(),
  content: text('content'),
  createdAt: timestamp('created_at').defaultNow(),
});