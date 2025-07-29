import { pgTable, serial, text, integer, varchar, timestamp, boolean } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

// User profiles schema
export const userProfiles = pgTable('user_profiles', {
  id: serial('id').primaryKey(),
  email: text('email').unique().notNull(),
  age: integer('age'),
  stackUserId: varchar('stack_user_id', { length: 255 }).notNull().unique(),
  firstName: varchar('first_name', { length: 100 }),
  lastName: varchar('last_name', { length: 100 }),
  headline: varchar('headline', { length: 200 }),
  summary: text('summary'),
  location: varchar('location', { length: 100 }),
  profilePictureUrl: varchar('profile_picture_url', { length: 500 }),
  bannerImageUrl: varchar('banner_image_url', { length: 500 }),
  industry: varchar('industry', { length: 100 }),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow()
});

// User settings schema
export const userSettings = pgTable('user_settings', {
  stackUserId: varchar('stack_user_id', { length: 255 }).references(() => userProfiles.stackUserId).primaryKey(),
  privacyLevel: varchar('privacy_level', { length: 20 }).default('public'),
  emailNotifications: boolean('email_notifications').default(true),
  connectionRequestsOpen: boolean('connection_requests_open').default(true),
  profileVisibility: varchar('profile_visibility', { length: 20 }).default('public'),
  activityBroadcast: boolean('activity_broadcast').default(true),
  themePreference: varchar('theme_preference', { length: 10 }).default('light'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow()
});

// Posts schema
export const userPosts = pgTable('user_posts', {
  id: serial('id').primaryKey(),
  stackUserId: varchar('stack_user_id', { length: 255 }).references(() => userProfiles.stackUserId).notNull(),
  content: text('content').notNull(),
  imageUrl: varchar('image_url', { length: 500 }),
  likesCount: integer('likes_count').default(0),
  commentsCount: integer('comments_count').default(0),
  sharesCount: integer('shares_count').default(0),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow()
});

// Relations
export const userProfilesRelations = relations(userProfiles, ({ one, many }) => ({
  settings: one(userSettings),
  posts: many(userPosts),
}));

export const userSettingsRelations = relations(userSettings, ({ one }) => ({
  profile: one(userProfiles, {
    fields: [userSettings.stackUserId],
    references: [userProfiles.stackUserId]
  })
}));

export const userPostsRelations = relations(userPosts, ({ one }) => ({
  author: one(userProfiles, {
    fields: [userPosts.stackUserId],
    references: [userProfiles.stackUserId]
  })
}));
