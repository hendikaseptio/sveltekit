import { db } from '$lib/server/db';
import { setting, media } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import { fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const res = await db.select().from(setting).limit(1);
	const allMedia = await db.select().from(media).where(eq(media.type, 'image/jpeg')).limit(100); // simplify, should filter better

	return {
		settings: res[0],
		media: allMedia
	};
};

export const actions: Actions = {
	update: async ({ request }) => {
		const formData = await request.formData();
		const siteName = formData.get('siteName') as string;
		const siteLogo = formData.get('siteLogo') as string;
		const theme = formData.get('theme') as string;
		const address = formData.get('address') as string;
		const phone = formData.get('phone') as string;
		const facebook = formData.get('facebook') as string;
		const instagram = formData.get('instagram') as string;
		const x = formData.get('x') as string;

		if (!siteName) {
			return fail(400, { error: 'Nama situs wajib diisi' });
		}

		await db.update(setting)
			.set({
				siteName,
				siteLogo,
				theme,
				address,
				phone,
				facebook,
				instagram,
				x,
				updatedAt: new Date()
			})
			.where(eq(setting.id, 1));

		return { success: true };
	}
};
