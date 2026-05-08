import { db } from '$lib/server/db';
import { menu } from '$lib/server/db/schema';
import { error, fail, redirect } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const res = await db.select().from(menu).where(eq(menu.id, params.id)).limit(1);

	if (res.length === 0) {
		throw error(404, 'Menu tidak ditemukan');
	}

	const allMenus = await db.select().from(menu);

	return {
		menuItem: res[0],
		parentMenus: allMenus.filter(m => !m.parentId && m.id !== params.id)
	};
};

export const actions: Actions = {
	default: async ({ params, request }) => {
		const formData = await request.formData();
		const label = formData.get('label') as string;
		const url = formData.get('url') as string;
		const order = parseInt(formData.get('order') as string) || 0;
		const parentId = (formData.get('parentId') as string) || null;
		const isExternal = formData.get('isExternal') === 'true';

		if (!label || !url) {
			return fail(400, { error: 'Label dan URL wajib diisi' });
		}

		try {
			await db
				.update(menu)
				.set({ label, url, order, parentId, isExternal })
				.where(eq(menu.id, params.id));
		} catch {
			return fail(500, { error: 'Gagal memperbarui menu' });
		}

		throw redirect(303, '/admin/menu');
	}
};
