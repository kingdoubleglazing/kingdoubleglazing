import { defineField, defineType } from 'sanity'

export const pricingOptionSchema = defineType({
  name: 'pricingOption',
  title: 'Pricing Option',
  type: 'document',
  fields: [
    defineField({
      name: 'optionKey',
      title: 'Option Key (A/B/C/D)',
      type: 'string',
      options: { list: ['A', 'B', 'C', 'D'] },
    }),
    defineField({ name: 'label', title: 'Label (e.g. Option A)', type: 'string' }),
    defineField({ name: 'sublabel', title: 'Sublabel (e.g. Basic warmth)', type: 'string' }),
    defineField({ name: 'spec', title: 'Glass Spec', type: 'string' }),
    defineField({ name: 'pricePerSqm', title: 'Price per m²', type: 'number' }),
    defineField({ name: 'heatPct', title: 'Heat Reduction %', type: 'number' }),
    defineField({ name: 'noisePct', title: 'Noise Reduction %', type: 'number' }),
    defineField({
      name: 'tech',
      title: 'Technical Details',
      type: 'object',
      fields: [
        defineField({ name: 'composition', title: 'Composition (array)', type: 'array', of: [{ type: 'string' }] }),
        defineField({ name: 'spacerMm', title: 'Spacer (mm)', type: 'number' }),
        defineField({ name: 'lowE', title: 'Low-E Coating', type: 'boolean' }),
        defineField({ name: 'acousticPVB', title: 'Acoustic PVB', type: 'boolean' }),
        defineField({ name: 'tinted', title: 'Tinted', type: 'boolean' }),
        defineField({ name: 'bestFor', title: 'Best For', type: 'string' }),
        defineField({ name: 'rwRating', title: 'Rw Rating (or blank)', type: 'string' }),
        defineField({ name: 'notes', title: 'Technical Notes', type: 'text', rows: 3 }),
      ],
    }),
  ],
  preview: {
    select: { title: 'label', subtitle: 'spec' },
  },
})
