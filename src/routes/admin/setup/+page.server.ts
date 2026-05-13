import { db } from '$lib/server/db';
import { setting, page, menu } from '$lib/server/db/schema';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';
import { exec } from 'child_process';
import { promisify } from 'util';
import { env as dynamicEnv } from '$env/dynamic/private';
import { auth } from '$lib/server/auth';

const execPromise = promisify(exec);

export const load: PageServerLoad = async () => {
	let needsInit = false;
	try {
		// Check if setting table exists
		await db.select().from(setting).limit(1);
	} catch (e) {
		// Table doesn't exist
		needsInit = true;
	}

	if (!needsInit) {
		try {
			const existingSettings = await db.select().from(setting).limit(1);
			if (existingSettings.length > 0 && existingSettings[0].siteName !== 'My SvelteKit Blog') {
				throw redirect(303, '/admin');
			}
		} catch (e: any) {
			if (e.status === 303) throw e;
			needsInit = true;
		}
	}

	return { needsInit };
};

export const actions: Actions = {
	initDb: async () => {
		try {
			console.log('🚀 Running database initialization with force...');
			
			const env = { ...process.env, DATABASE_URL: dynamicEnv.DATABASE_URL };
			
			// Added --force to ensure it doesn't wait for confirmation
			const { stdout, stderr } = await execPromise('npx drizzle-kit push --force', { env });
			
			console.log('Stdout:', stdout);
			if (stderr) console.error('Stderr:', stderr);
			
			return { success: true, message: 'Database berhasil diinisialisasi!' };
		} catch (e: any) {
			console.error('Database init failed:', e);
			const errorMsg = e.stderr || e.stdout || e.message;
			return { success: false, message: 'Gagal inisialisasi database: ' + errorMsg };
		}
	},
	setup: async ({ request }) => {
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

		// 2. Create Default Users (Admin & Editor)
		// Note: Better Auth uses signUpEmail server-side
		try {
			// Admin
			await auth.api.signUpEmail({
				body: {
					email: 'admin@blog.com',
					password: 'password123',
					name: 'Super Admin'
				}
			});

			// Editor
			await auth.api.signUpEmail({
				body: {
					email: 'editor@blog.com',
					password: 'password123',
					name: 'Content Editor'
				}
			});
			
			console.log('✅ Default users seeded successfully');
		} catch (e) {
			console.error('User seeding failed (likely already exists):', e);
		}

		// 3. Create Pages and Menus
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
				{ id: '1', type: 'hero-secondary', props: { title: 'Paket Harga', subtitle: 'Pilih paket yang sesuai dengan kebutuhan Anda.', align: 'center' } }
			],
			'profil-proyek': [
				{ id: '1', type: 'hero-secondary', props: { title: 'Profil Proyek', subtitle: 'Daftar proyek unggulan yang telah kami selesaikan.', align: 'center' } }
			],
			'karya': [
				{ id: '1', type: 'hero-secondary', props: { title: 'Portofolio Karya', subtitle: 'Koleksi karya terbaik kami.', align: 'center' } }
			]
		};

		// Create Home Menu
		await db.insert(menu).values({
			label: 'Beranda',
			url: '/',
			order: 0,
			isExternal: false
		}).onConflictDoNothing();

		// Create selected pages and menus
		for (const pageSlug of selectedPages) {
			const label = pageSlug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
			
			await db.insert(page).values({
				title: label,
				slug: pageSlug,
				content: `Halaman ${label}`,
				sections: JSON.stringify(pageTemplates[pageSlug] || []),
				status: 'published'
			}).onConflictDoNothing();

			await db.insert(menu).values({
				label: label,
				url: `/p/${pageSlug}`,
				order: selectedPages.indexOf(pageSlug) + 1,
				isExternal: false
			}).onConflictDoNothing();
		}

		await db.insert(menu).values({
			label: 'Artikel',
			url: '/artikel',
			order: 10,
			isExternal: false
		}).onConflictDoNothing();

		throw redirect(303, '/admin');
	}
};
