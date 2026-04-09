export type GalleryCategory = 'double-glazing' | 'shower-screens' | 'commercial' | 'repairs'

export interface GalleryImage {
  src: string
  alt: string
  category: GalleryCategory
  caption: string
  /** Internal link to the relevant service page */
  href: string
}

export const GALLERY_CATEGORIES: { value: GalleryCategory | 'all'; label: string }[] = [
  { value: 'all',            label: 'All Work' },
  { value: 'double-glazing', label: 'Double Glazing' },
  { value: 'shower-screens', label: 'Shower Screens' },
  { value: 'commercial',     label: 'Commercial' },
  { value: 'repairs',        label: 'Glass Repairs' },
]

export const galleryImages: GalleryImage[] = [
  {
    src: '/gallery/Double-glazing-category.webp',
    alt: 'Retrofit double glazing installed in a Melbourne home — sealed unit sits inside the existing frame',
    category: 'double-glazing',
    caption: 'Retrofit double glazing',
    href: '/double-glazing/',
  },
  {
    src: '/gallery/Semi-frameless-shower-screen-b.webp',
    alt: 'Semi-frameless shower screen with brushed nickel hardware in a Melbourne bathroom',
    category: 'shower-screens',
    caption: 'Semi-frameless shower screen',
    href: '/shower-screens/semi-frameless/',
  },
  {
    src: '/gallery/Balconia_-Yarraville-bowling-club.webp',
    alt: 'Balcony glazing installation at Yarraville Bowling Club, Melbourne',
    category: 'commercial',
    caption: 'Balcony glazing — Yarraville Bowling Club',
    href: '/commercial-glazing/',
  },
  {
    src: '/gallery/Balconia_-Yarraville-bowling-club-2.webp',
    alt: 'Completed balcony glass panels at Yarraville Bowling Club',
    category: 'commercial',
    caption: 'Balcony glazing — Yarraville Bowling Club',
    href: '/commercial-glazing/',
  },
  {
    src: '/gallery/Balconia-pic-1000x667-1.webp',
    alt: 'Commercial balcony glass installation Melbourne — frameless panels with unobstructed views',
    category: 'commercial',
    caption: 'Commercial balcony glazing',
    href: '/commercial-glazing/',
  },
  {
    src: '/gallery/office-partition.webp',
    alt: 'Floor-to-ceiling glass office partition installed in Melbourne CBD',
    category: 'commercial',
    caption: 'Glass office partition',
    href: '/commercial-glazing/',
  },
  {
    src: '/gallery/Shop-fronts-1b.webp',
    alt: 'Commercial shop front glazing Melbourne — full-height glass facade',
    category: 'commercial',
    caption: 'Shop front glazing',
    href: '/commercial-glazing/',
  },
  {
    src: '/gallery/Shop-fronts-2b.webp',
    alt: 'Glass shop front installation in Melbourne — toughened safety glass',
    category: 'commercial',
    caption: 'Shop front glazing',
    href: '/commercial-glazing/',
  },
  {
    src: '/gallery/Shop-fronts-3b.webp',
    alt: 'Commercial glazing shop front Melbourne — aluminium framed glass panels',
    category: 'commercial',
    caption: 'Shop front glazing',
    href: '/commercial-glazing/',
  },
  {
    src: '/gallery/glass-repairs-2-scaled.webp',
    alt: 'Emergency glass repair Melbourne — broken window board-up and replacement',
    category: 'repairs',
    caption: 'Emergency glass repair',
    href: '/emergency-glass/',
  },
  {
    src: '/gallery/glass-repairs-cropped.webp',
    alt: 'Glass repair and replacement by licensed glazier in Melbourne',
    category: 'repairs',
    caption: 'Glass repair',
    href: '/emergency-glass/',
  },
]
