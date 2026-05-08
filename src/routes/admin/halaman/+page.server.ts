import { db } from '$lib/server/db';
import { page } from '$lib/server/db/schema';
import { desc, eq } from 'drizzle-orm';
import type { Actions } from './$types';

export const load = async () => {
	const pages = await db.select().from(page).orderBy(desc(page.createdAt));
	
	// Format data for DataTable
	const formattedPages = pages.map(p => ({
		id: p.id,
		header: p.title,
		type: 'Halaman',
		status: 'Active',
		target: `/p/${p.slug}`,
		limit: p.createdAt ? p.createdAt.toLocaleDateString('id-ID') : '-',
		reviewer: 'Admin'
	}));

	return {
		pages: formattedPages
	};
};

export const actions: Actions = {
	delete: async ({ request }) => {
		const formData = await request.formData();
		const id = formData.get('id') as string;

		if (!id) return { success: false };

		await db.delete(page).where(eq(page.id, id));
		return { success: true };
	}
};
