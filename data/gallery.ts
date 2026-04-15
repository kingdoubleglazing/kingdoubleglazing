export const galleryItems = [
  {
    src: '/gallery/Double-glazing-category.webp',
    alt: 'Retrofit double glazing installed in Melbourne home',
    category: 'retrofit',
    caption: 'Retrofit Double Glazing',
  },
  {
    src: '/gallery/Balconia-pic-1000x667-1.webp',
    alt: 'Balconia glazing project — exterior glass installation',
    category: 'commercial',
    caption: 'Commercial Glazing',
  },
  {
    src: '/gallery/Balconia_-Yarraville-bowling-club.webp',
    alt: 'Yarraville bowling club glazing project',
    category: 'commercial',
    caption: 'Yarraville Bowling Club',
  },
  {
    src: '/gallery/Balconia_-Yarraville-bowling-club-2.webp',
    alt: 'Yarraville bowling club — interior glazing detail',
    category: 'commercial',
    caption: 'Yarraville Bowling Club — Detail',
  },
  {
    src: '/gallery/Shop-fronts-1b.webp',
    alt: 'Commercial shopfront glass installation Melbourne',
    category: 'shopfronts',
    caption: 'Shopfront Glazing',
  },
  {
    src: '/gallery/Shop-fronts-2b.webp',
    alt: 'Retail shopfront double glazing Melbourne',
    category: 'shopfronts',
    caption: 'Retail Shopfront',
  },
  {
    src: '/gallery/Shop-fronts-3b.webp',
    alt: 'Commercial glass shopfront — Melbourne CBD',
    category: 'shopfronts',
    caption: 'Commercial Shopfront',
  },
  {
    src: '/gallery/office-partition.webp',
    alt: 'Glass office partition installation',
    category: 'commercial',
    caption: 'Office Partitions',
  },
  {
    src: '/gallery/Semi-frameless-shower-screen-b.webp',
    alt: 'Semi-frameless shower screen installation Melbourne',
    category: 'shower-screens',
    caption: 'Semi-Frameless Shower Screen',
  },
  {
    src: '/gallery/glass-repairs-cropped.webp',
    alt: 'Emergency glass repair Melbourne',
    category: 'repairs',
    caption: 'Glass Repairs',
  },
  {
    src: '/gallery/glass-repairs-2-scaled.webp',
    alt: 'Glass repair and replacement Melbourne',
    category: 'repairs',
    caption: 'Glass Replacement',
  },
] as const

export type GalleryItem = (typeof galleryItems)[number]
export type GalleryCategory = GalleryItem['category']

export const galleryCategories = [
  { id: 'all',           label: 'All Work' },
  { id: 'retrofit',      label: 'Retrofit Glazing' },
  { id: 'shopfronts',    label: 'Shopfronts' },
  { id: 'commercial',    label: 'Commercial' },
  { id: 'shower-screens', label: 'Shower Screens' },
  { id: 'repairs',       label: 'Repairs' },
] as const
