import { db } from '$lib/server/db';
import { category } from '$lib/server/db/schema';
import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions: Actions = {
	default: async ({ request }) => {
		const formData = await request.formData();
		const name = formData.get('name') as string;
		const slug = formData.get('slug') as string;
		const description = formData.get('description') as string;

		if (!name || !slug) {
			return fail(400, { error: 'Nama dan Slug wajib diisi' });
		}

		try {
			await db.insert(category).values({
				name,
				slug,
				description
			});
		} catch (e: any) {
			if (e.message?.includes('UNIQUE constraint failed')) {
				return fail(400, { error: 'Slug sudah digunakan, pilih slug lain' });
			}
			return fail(500, { error: 'Gagal menambahkan kategori' });
		}

		throw redirect(303, '/admin/kategori');
	}
};
