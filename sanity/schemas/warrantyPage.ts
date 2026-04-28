import { defineField, defineType } from 'sanity'

const coverageItemFields = [
  defineField({ name: 'item', type: 'string', title: 'Item Name' }),
  defineField({ name: 'detail', type: 'text', title: 'Detail Text', rows: 2 }),
]

export const warrantyPageSchema = defineType({
  name: 'warrantyPage',
  title: 'Warranty Page',
  type: 'document',
  fields: [
    defineField({ name: 'heroHeadline', title: 'Hero Headline (white)', type: 'string' }),
    defineField({ name: 'heroHeadlineYellow', title: 'Hero Headline (yellow)', type: 'string' }),
    defineField({ name: 'heroSubtext', title: 'Hero Subtext', type: 'text', rows: 2 }),
    defineField({
      name: 'coveredItems',
      title: 'What\'s Covered Items',
      type: 'array',
      of: [{ type: 'object', fields: coverageItemFields }],
    }),
    defineField({
      name: 'notCoveredItems',
      title: 'What\'s Not Covered Items',
      type: 'array',
      of: [{ type: 'object', fields: coverageItemFields }],
    }),
    defineField({ name: 'claimSteps', title: 'How to Claim Steps', type: 'array', of: [{ type: 'string' }] }),
    defineField({ name: 'ctaHeadline', title: 'CTA Section Headline', type: 'string' }),
    defineField({ name: 'ctaSubtext', title: 'CTA Subtext', type: 'string' }),
  ],
  preview: { prepare: () => ({ title: 'Warranty Page' }) },
})
