import { db } from '$lib/server/db';
import { post } from '$lib/server/db/schema';
import { error } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';

export const load = async ({ params }) => {
	const result = await db.select().from(post).where(eq(post.slug, params.slug)).limit(1);

	const article = result[0];

	// Fallback mock for the specific demo slugs if database is empty
	if (!article) {
		const mocks: Record<string, any> = {
			'selamat-datang': {
				title: 'Selamat Datang di Blog SvelteKit Kami',
				content: 'Selamat datang di blog baru kami! Kami sangat senang bisa berbagi pengetahuan seputar SvelteKit, Drizzle ORM, dan Shadcn Svelte. SvelteKit memberikan pengalaman pengembang yang luar biasa dengan performa yang sangat cepat.',
				publishedAt: new Date()
			},
			'belajar-shadcn': {
				title: 'Belajar Shadcn Svelte',
				content: 'Shadcn UI adalah kumpulan komponen yang dapat Anda salin dan tempel ke aplikasi Anda. Versi Svelte-nya membawa kemudahan yang sama ke ekosistem Svelte. Dengan menggunakan Tailwind CSS, penyesuaian gaya menjadi sangat fleksibel.',
				publishedAt: new Date()
			},
			'integrasi-drizzle': {
				title: 'Integrasi Database dengan Drizzle',
				content: 'Drizzle ORM adalah ORM TypeScript modern yang terasa seperti menulis SQL tetapi dengan keamanan tipe data yang lengkap. Dalam proyek ini, kita menggunakan SQLite untuk kemudahan pengembangan lokal.',
				publishedAt: new Date()
			}
		};

		if (mocks[params.slug]) {
			return { article: mocks[params.slug] };
		}

		throw error(404, 'Artikel tidak ditemukan');
	}

	return {
		article
	};
};
