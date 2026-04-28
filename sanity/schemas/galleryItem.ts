import { defineField, defineType } from 'sanity'

export const galleryItemSchema = defineType({
  name: 'galleryItem',
  title: 'Gallery Item',
  type: 'document',
  fields: [
    defineField({ name: 'image', title: 'Image', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'alt', title: 'Alt Text', type: 'string' }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: { list: ['retrofit', 'commercial', 'shopfronts', 'repairs'] },
    }),
    defineField({ name: 'caption', title: 'Caption', type: 'string' }),
    defineField({ name: 'order', title: 'Order (lower = first)', type: 'number' }),
  ],
  preview: {
    select: { title: 'caption', subtitle: 'category', media: 'image' },
  },
})
