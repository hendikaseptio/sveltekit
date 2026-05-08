import { db } from '$lib/server/db';
import { menu } from '$lib/server/db/schema';
import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

export const load = async () => {
	const menus = await db.select().from(menu);
	return { parentMenus: menus.filter(m => !m.parentId) };
};

export const actions: Actions = {
	default: async ({ request }) => {
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
			await db.insert(menu).values({ label, url, order, parentId, isExternal });
		} catch {
			return fail(500, { error: 'Gagal menambahkan menu' });
		}

		throw redirect(303, '/admin/menu');
	}
};
