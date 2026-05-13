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
	cover: text('cover'),
	status: text('status').notNull().default('draft'), // draft, published
	publishedAt: integer('published_at', { mode: 'timestamp' }).$defaultFn(() => new Date()),
	authorId: text('author_id').references(() => user.id),
	categoryId: text('category_id').references(() => category.id)
});

export const category = sqliteTable('category', {
	id: text('id')
		.primaryKey()
		.$defaultFn(() => crypto.randomUUID()),
	name: text('name').notNull(),
	slug: text('slug').notNull().unique(),
	description: text('description'),
	createdAt: integer('created_at', { mode: 'timestamp' }).$defaultFn(() => new Date())
});

export const page = sqliteTable('page', {
	id: text('id')
		.primaryKey()
		.$defaultFn(() => crypto.randomUUID()),
	title: text('title').notNull(),
	slug: text('slug').notNull().unique(),
	content: text('content').notNull(),
	sections: text('sections'), // JSON array of sections
	status: text('status').notNull().default('draft'), // draft | published
	createdAt: integer('created_at', { mode: 'timestamp' }).$defaultFn(() => new Date())
});

export const media = sqliteTable('media', {
	id: text('id')
		.primaryKey()
		.$defaultFn(() => crypto.randomUUID()),
	name: text('name').notNull(),
	path: text('path').notNull(),
	type: text('type').notNull(),
	size: integer('size').notNull(),
	createdAt: integer('created_at', { mode: 'timestamp' }).$defaultFn(() => new Date())
});

export const setting = sqliteTable('setting', {
	id: integer('id').primaryKey({ autoIncrement: true }),
	siteName: text('site_name').notNull().default('My SvelteKit Blog'),
	siteLogo: text('site_logo'),
	theme: text('theme').notNull().default('auto'), // light, dark, auto
	address: text('address'),
	phone: text('phone'),
	facebook: text('facebook'),
	instagram: text('instagram'),
	x: text('x'),
	updatedAt: integer('updated_at', { mode: 'timestamp' }).$defaultFn(() => new Date())
});

export const postCategory = sqliteTable('post_category', {
	postId: text('post_id')
		.notNull()
		.references(() => post.id, { onDelete: 'cascade' }),
	categoryId: text('category_id')
		.notNull()
		.references(() => category.id, { onDelete: 'cascade' })
});

export const menu = sqliteTable('menu', {
	id: text('id')
		.primaryKey()
		.$defaultFn(() => crypto.randomUUID()),
	label: text('label').notNull(),
	url: text('url').notNull(),
	order: integer('order').notNull().default(0),
	parentId: text('parent_id'),
	isExternal: integer('is_external', { mode: 'boolean' }).notNull().default(false),
	createdAt: integer('created_at', { mode: 'timestamp' }).$defaultFn(() => new Date())
});

export const analytics = sqliteTable('analytics', {
	id: text('id')
		.primaryKey()
		.$defaultFn(() => crypto.randomUUID()),
	url: text('url').notNull(),
	ip: text('ip'),
	userAgent: text('user_agent'),
	createdAt: integer('created_at', { mode: 'timestamp' }).$defaultFn(() => new Date())
});

export * from './auth.schema';
