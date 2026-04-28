import { defineField, defineType } from 'sanity'

export const faqItemSchema = defineType({
  name: 'faqItem',
  title: 'FAQ Item',
  type: 'document',
  fields: [
    defineField({
      name: 'group',
      title: 'Page Group',
      type: 'string',
      options: {
        list: ['homepage', 'estimate', 'contact', 'retrofit', 'emergency', 'general', 'services'],
      },
    }),
    defineField({ name: 'order', title: 'Order (lower = first)', type: 'number' }),
    defineField({ name: 'q', title: 'Question', type: 'string' }),
    defineField({ name: 'a', title: 'Answer', type: 'text', rows: 4 }),
  ],
  preview: {
    select: { title: 'q', subtitle: 'group' },
  },
})
