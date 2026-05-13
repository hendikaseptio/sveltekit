import { db } from '$lib/server/db';
import { setting, page, menu } from '$lib/server/db/schema';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';

export const load: PageServerLoad = async () => {
	// If settings already exist, redirect to admin dashboard
	const existingSettings = await db.select().from(setting).limit(1);
	if (existingSettings.length > 0) {
		// Only redirect if there's actual data
		if (existingSettings[0].siteName !== 'My SvelteKit Blog') {
			throw redirect(303, '/admin');
		}
	}
	return {};
};

export const actions: Actions = {
	default: async ({ request }) => {
		const formData = await request.formData();
		const siteName = formData.get('siteName') as string;
		const siteDescription = formData.get('siteDescription') as string;
		const selectedPages = formData.getAll('pages') as string[];

		// 1. Update Settings
		await db.insert(setting).values({
			siteName: siteName || 'My Website',
			address: siteDescription || '',
		}).onConflictDoUpdate({
			target: setting.id,
			set: {
				siteName: siteName || 'My Website',
				address: siteDescription || '',
				updatedAt: new Date()
			}
		});

		// 2. Create Pages and Menus
		// Define default sections for different page types
		const pageTemplates: Record<string, any> = {
			'tentang-kami': [
				{ id: '1', type: 'hero-secondary', props: { title: 'Tentang Kami', subtitle: 'Mengenal lebih dekat siapa kami.', align: 'center' } },
				{ id: '2', type: 'image-text', props: { title: 'Misi Kami', content: '<p>Kami hadir untuk memberikan solusi terbaik bagi Anda.</p>', image: '/images/hero.png', imagePosition: 'left' } }
			],
			'kontak': [
				{ id: '1', type: 'hero-secondary', props: { title: 'Hubungi Kami', subtitle: 'Kami siap membantu Anda kapan saja.', align: 'center' } },
				{ id: '2', type: 'contact', props: { title: 'Informasi Kontak', subtitle: 'Silakan hubungi kami melalui saluran berikut.', email: 'hello@example.com', phone: '+62 812-3456-7890', address: 'Jakarta, Indonesia' } }
			],
			'harga': [
				{ id: '1', type: 'hero-secondary', props: { title: 'Paket Harga', subtitle: 'Pilih paket yang sesuai dengan kebutuhan Anda.', align: 'center' } },
				{ id: '2', type: 'faq', props: { title: 'Pertanyaan Umum', subtitle: 'Jawaban atas pertanyaan yang sering diajukan.', items: [{ question: 'Berapa biayanya?', answer: 'Tergantung paket yang dipilih.' }] } }
			],
			'profil-proyek': [
				{ id: '1', type: 'hero-secondary', props: { title: 'Profil Proyek', subtitle: 'Daftar proyek unggulan yang telah kami selesaikan.', align: 'center' } },
				{ id: '2', type: 'posts', props: { title: 'Proyek Terbaru', subtitle: 'Intip apa yang sedang kami kerjakan.', count: 3 } }
			],
			'karya': [
				{ id: '1', type: 'hero-secondary', props: { title: 'Portofolio Karya', subtitle: 'Koleksi karya terbaik kami.', align: 'center' } },
				{ id: '2', type: 'cta', props: { title: 'Ingin Memulai Proyek?', subtitle: 'Mari bekerja sama menciptakan karya luar biasa.', ctaText: 'Hubungi Kami', ctaLink: '/kontak' } }
			]
		};

		// Create Home Menu first
		await db.insert(menu).values({
			label: 'Beranda',
			url: '/',
			order: 0,
			isExternal: false
		});

		// Create selected pages and their menus
		for (const pageSlug of selectedPages) {
			const label = pageSlug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
			
			// Create Page
			await db.insert(page).values({
				title: label,
				slug: pageSlug,
				content: `Halaman ${label}`,
				sections: JSON.stringify(pageTemplates[pageSlug] || []),
				status: 'published'
			}).onConflictDoNothing();

			// Create Menu
			await db.insert(menu).values({
				label: label,
				url: `/p/${pageSlug}`,
				order: selectedPages.indexOf(pageSlug) + 1,
				isExternal: false
			});
		}

		// Also add "Artikel" if not already in menus
		await db.insert(menu).values({
			label: 'Artikel',
			url: '/artikel',
			order: 10,
			isExternal: false
		});

		throw redirect(303, '/admin');
	}
};
