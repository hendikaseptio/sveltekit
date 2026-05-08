import { db } from '$lib/server/db';
import { menu } from '$lib/server/db/schema';
import { asc, eq } from 'drizzle-orm';

export const load = async () => {
	const menus = await db.select().from(menu).orderBy(asc(menu.order));

	const formattedMenus = menus.map((m) => ({
		id: m.id,
		header: m.label,
		type: m.isExternal ? 'Eksternal' : 'Internal',
		status: 'Active',
		target: m.url,
		limit: m.order.toString(),
		reviewer: m.parentId ? 'Sub Menu' : 'Menu Utama'
	}));

	return { menus: formattedMenus };
};

export const actions = {
	delete: async ({ request }: { request: Request }) => {
		const formData = await request.formData();
		const id = formData.get('id') as string;
		if (!id) return { success: false };
		await db.delete(menu).where(eq(menu.id, id));
		return { success: true };
	}
};
