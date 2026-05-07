import { db } from '$lib/server/db';
import { media, post, page } from '$lib/server/db/schema';
import { desc, eq } from 'drizzle-orm';
import { fail } from '@sveltejs/kit';
import type { Actions } from './$types';
import fs from 'node:fs';
import path from 'node:path';

export const load = async () => {
	const allMedia = await db.select().from(media).orderBy(desc(media.createdAt));
	const allPosts = await db.select({ content: post.content }).from(post);
	const allPages = await db.select({ content: page.content }).from(page);

	// Combine all content into one large string for easier searching
	const combinedContent = [...allPosts, ...allPages].map(i => i.content).join(' ');

	// Check usage for each media
	const mediaWithUsage = allMedia.map(m => ({
		...m,
		isUsed: combinedContent.includes(m.path)
	}));

	return {
		media: mediaWithUsage
	};
};

export const actions: Actions = {
	upload: async ({ request }) => {
		const formData = await request.formData();
		const files = formData.getAll('files') as File[];

		if (files.length === 0 || (files.length === 1 && files[0].size === 0)) {
			return fail(400, { error: 'Tidak ada file yang dipilih' });
		}

		const results = [];

		for (const file of files) {
			if (file.size === 0) continue;

			const fileName = `${Date.now()}-${file.name}`;
			const filePath = path.join('static', 'uploads', fileName);
			const publicPath = `/uploads/${fileName}`;

			try {
				const buffer = Buffer.from(await file.arrayBuffer());
				fs.writeFileSync(filePath, buffer);

				const [inserted] = await db.insert(media).values({
					name: file.name,
					path: publicPath,
					type: file.type,
					size: file.size
				}).returning();

				results.push(inserted);
			} catch (e) {
				console.error(`Gagal mengupload ${file.name}:`, e);
			}
		}

		return { success: true, uploaded: results };
	},

	delete: async ({ request }) => {
		const formData = await request.formData();
		const id = formData.get('id') as string;

		if (!id) return fail(400, { error: 'ID tidak ditemukan' });

		const res = await db.select().from(media).where(eq(media.id, id)).limit(1);
		if (res.length === 0) return fail(404, { error: 'Media tidak ditemukan' });

		const item = res[0];
		const filePath = path.join('static', item.path);

		try {
			if (fs.existsSync(filePath)) {
				fs.unlinkSync(filePath);
			}
			await db.delete(media).where(eq(media.id, id));
			return { success: true };
		} catch (e) {
			return fail(500, { error: 'Gagal menghapus file' });
		}
	},

	cleanup: async () => {
		const allMedia = await db.select().from(media);
		const allPosts = await db.select({ content: post.content }).from(post);
		const allPages = await db.select({ content: page.content }).from(page);
		const combinedContent = [...allPosts, ...allPages].map(i => i.content).join(' ');

		const unusedMedia = allMedia.filter(m => !combinedContent.includes(m.path));
		
		let deletedCount = 0;
		for (const item of unusedMedia) {
			const filePath = path.join('static', item.path);
			try {
				if (fs.existsSync(filePath)) {
					fs.unlinkSync(filePath);
				}
				await db.delete(media).where(eq(media.id, item.id));
				deletedCount++;
			} catch (e) {
				console.error(`Gagal menghapus ${item.name}:`, e);
			}
		}

		return { success: true, deletedCount };
	}
};
