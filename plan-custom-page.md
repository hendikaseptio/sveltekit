kita bangun fitur yang bisa cutom halaman bre biar ada hiasanya kayak ada herro section, image teks, team section, atau yang lainya.
Composable Section Builder
kurang lelbih untuk flownya 
Tambah Section
↓
Pilih Layout
↓
Edit Content
↓
Drag Reorder
↓
Publish
Arsitektur yang saya rekomendasikan
1. Simpan halaman sebagai array sections
[
  {
    "id": "hero-1",
    "type": "hero",
    "props": {
      "title": "Tentang Kami",
      "subtitle": "Kami membantu UMKM..."
    }
  },
  {
    "id": "imgtext-1",
    "type": "image-text",
    "props": {
      "title": "Visi Kami",
      "content": "Lorem ipsum",
      "image": "/uploads/team.jpg",
      "imagePosition": "left"
    }
  }
]
Folder structure
src/lib/components/sections/
  HeroSection.svelte
  ImageTextSection.svelte
  TeamSection.svelte
  FAQSection.svelte
Renderer dinamis
<script lang="ts">
  import HeroSection from './sections/HeroSection.svelte'
  import ImageTextSection from './sections/ImageTextSection.svelte'

  export let section

  const map = {
    hero: HeroSection,
    'image-text': ImageTextSection
  }

  $: Component = map[section.type]
</script>

<svelte:component
  this={Component}
  {...section.props}
/>
Render page
{#each sections as section}
  <SectionRenderer {section} />
{/each}

UI editor admin
Sidebar section list
[ Hero ]
[ Image + Text ]
[ Team ]
[ FAQ ]
Klik:
→ push section baru ke array.

Form editor props
Title
[____________]

Description
[____________]

Image
[ Upload ]
Pakai:

shadcn Input
Textarea
Select
Switch

Reorder section
Saya lebih rekomendasi:

svelte-dnd-action
Contoh drag reorder
<section use:dndzone={{ items: sections }}>
  {#each sections as section (section.id)}
    <div>
      {section.type}
    </div>
  {/each}
</section>
Inline preview realtime
Bikin layout:
+-------------------+------------------+
| Sidebar Editor    | Live Preview     |
|                   |                  |
+-------------------+------------------+

Jadi user edit langsung lihat hasil.
Ini UX terbaik.

Komponen section yang bagus

Minimal punya:

Hero
title
subtitle
CTA
Image Text
image
title
content
image left/right
Features
icon
title
desc
Team
avatar
role
FAQ
accordion
CTA
button
background

Jangan simpan HTML mentah
Lebih bagus:

JSON schema
structured content

Karena:

aman
mudah migrate
mudah render

Design system penting

Karena pakai shadcn:
buat section punya:

spacing konsisten
max-width konsisten
typography konsisten

Misal:
container mx-auto px-4 py-20
Semua section pakai itu.

Hasil langsung terasa profesional.
