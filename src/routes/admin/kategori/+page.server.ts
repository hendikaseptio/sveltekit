import { db } from '$lib/server/db';
import { category } from '$lib/server/db/schema';
import { desc, eq } from 'drizzle-orm';
import type { Actions } from './$types';

export const load = async () => {
	const categories = await db.select().from(category).orderBy(desc(category.createdAt));
	
	// Format data for DataTable
	const formattedCategories = categories.map(c => ({
		id: c.id,
		header: c.name,
		type: 'Kategori',
		status: 'Active',
		target: c.slug,
		limit: c.createdAt ? c.createdAt.toLocaleDateString('id-ID') : '-',
		reviewer: 'Admin'
	}));

	return {
		categories: formattedCategories
	};
};

export const actions: Actions = {
	delete: async ({ request }) => {
		const formData = await request.formData();
		const id = formData.get('id') as string;

		if (!id) return { success: false };

		await db.delete(category).where(eq(category.id, id));
		return { success: true };
	}
};
