import { db } from '$lib/server/db';
import { page } from '$lib/server/db/schema';
import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions: Actions = {
	default: async ({ request }) => {
		const formData = await request.formData();
		const title = formData.get('title') as string;
		const slug = formData.get('slug') as string;
		const content = formData.get('content') as string;

		const sections = formData.get('sections') as string;
		const status = (formData.get('status') as string) || 'draft';

		if (!title || !slug) {
			return fail(400, { error: 'Judul dan Slug wajib diisi' });
		}

		try {
			await db.insert(page).values({
				title,
				slug,
				content,
				sections,
				status
			});
		} catch (e: any) {
			if (e.message?.includes('UNIQUE constraint failed')) {
				return fail(400, { error: 'Slug sudah digunakan' });
			}
			return fail(500, { error: 'Gagal menambahkan halaman' });
		}

		throw redirect(303, '/admin/halaman');
	}
};
