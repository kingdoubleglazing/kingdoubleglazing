import { defineField, defineType } from 'sanity'

export const contactPageSchema = defineType({
  name: 'contactPage',
  title: 'Contact Page',
  type: 'document',
  fields: [
    defineField({ name: 'heroHeadline', title: 'Hero Headline', type: 'string' }),
    defineField({ name: 'heroSubtext', title: 'Hero Subtext', type: 'text', rows: 2 }),
    defineField({ name: 'formHeading', title: 'Form Heading', type: 'string' }),
  ],
  preview: { prepare: () => ({ title: 'Contact Page' }) },
})
