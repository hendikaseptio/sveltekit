import { db } from '$lib/server/db';
import { category } from '$lib/server/db/schema';
import { error, fail, redirect } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const res = await db.select().from(category).where(eq(category.id, params.id)).limit(1);
	
	if (res.length === 0) {
		throw error(404, 'Kategori tidak ditemukan');
	}

	return {
		category: res[0]
	};
};

export const actions: Actions = {
	default: async ({ params, request }) => {
		const formData = await request.formData();
		const name = formData.get('name') as string;
		const slug = formData.get('slug') as string;
		const description = formData.get('description') as string;

		if (!name || !slug) {
			return fail(400, { error: 'Nama dan Slug wajib diisi' });
		}

		try {
			await db.update(category)
				.set({ name, slug, description })
				.where(eq(category.id, params.id));
		} catch (e: any) {
			if (e.message?.includes('UNIQUE constraint failed')) {
				return fail(400, { error: 'Slug sudah digunakan, pilih slug lain' });
			}
			return fail(500, { error: 'Gagal memperbarui kategori' });
		}

		throw redirect(303, '/admin/kategori');
	}
};
