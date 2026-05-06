import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { user } from './auth.schema';

export const task = sqliteTable('task', {
	id: text('id')
		.primaryKey()
		.$defaultFn(() => crypto.randomUUID()),
	title: text('title').notNull(),
	priority: integer('priority').notNull().default(1)
});

export const post = sqliteTable('post', {
	id: text('id')
		.primaryKey()
		.$defaultFn(() => crypto.randomUUID()),
	title: text('title').notNull(),
	slug: text('slug').notNull().unique(),
	content: text('content').notNull(),
	excerpt: text('excerpt'),
	publishedAt: integer('published_at', { mode: 'timestamp' }).$defaultFn(() => new Date()),
	authorId: text('author_id').references(() => user.id)
});

export * from './auth.schema';
