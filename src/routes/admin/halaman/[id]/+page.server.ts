import { db } from '$lib/server/db';
import { page } from '$lib/server/db/schema';
import { error, fail, redirect } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const res = await db.select().from(page).where(eq(page.id, params.id)).limit(1);
	
	if (res.length === 0) {
		throw error(404, 'Halaman tidak ditemukan');
	}

	return {
		page: res[0]
	};
};

export const actions: Actions = {
	default: async ({ params, request }) => {
		const formData = await request.formData();
		const title = formData.get('title') as string;
		const slug = formData.get('slug') as string;
		const sections = formData.get('sections') as string;

		if (!title || !slug) {
			return fail(400, { error: 'Judul dan Slug wajib diisi' });
		}

		try {
			await db
				.update(page)
				.set({ title, slug, content, sections })
				.where(eq(page.id, params.id));
		} catch (e: any) {
			if (e.message?.includes('UNIQUE constraint failed')) {
				return fail(400, { error: 'Slug sudah digunakan' });
			}
			return fail(500, { error: 'Gagal memperbarui halaman' });
		}

		throw redirect(303, '/admin/halaman');
	}
};
