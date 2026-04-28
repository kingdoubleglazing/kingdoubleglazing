import { defineField, defineType } from 'sanity'

export const testimonialSchema = defineType({
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Customer Name', type: 'string' }),
    defineField({ name: 'suburb', title: 'Suburb', type: 'string' }),
    defineField({ name: 'source', title: 'Source (e.g. Google)', type: 'string' }),
    defineField({ name: 'rating', title: 'Rating (1–5)', type: 'number' }),
    defineField({
      name: 'tag',
      title: 'Tag',
      type: 'string',
      options: {
        list: ['energy', 'noise', 'retrofit', 'heritage', 'emergency', 'commercial'],
      },
    }),
    defineField({ name: 'text', title: 'Review Text', type: 'text', rows: 4 }),
    defineField({ name: 'customerImage', title: 'Customer Photo (optional)', type: 'image' }),
  ],
  preview: {
    select: { title: 'name', subtitle: 'suburb' },
  },
})
