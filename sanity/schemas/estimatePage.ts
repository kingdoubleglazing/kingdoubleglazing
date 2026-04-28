import { defineField, defineType } from 'sanity'

export const estimatePageSchema = defineType({
  name: 'estimatePage',
  title: 'Estimate Page',
  type: 'document',
  fields: [
    defineField({ name: 'heroHeadline', title: 'Hero Headline', type: 'string' }),
    defineField({ name: 'heroSubtext', title: 'Hero Subtext', type: 'text', rows: 2 }),
    defineField({ name: 'secondStoreySurcharge', title: 'Second Storey Surcharge ($)', type: 'number' }),
  ],
  preview: { prepare: () => ({ title: 'Estimate Page' }) },
})
