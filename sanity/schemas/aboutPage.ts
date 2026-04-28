import { defineField, defineType } from 'sanity'

export const aboutPageSchema = defineType({
  name: 'aboutPage',
  title: 'About Page',
  type: 'document',
  fields: [
    defineField({ name: 'heroHeadline', title: 'Hero Headline (white)', type: 'string' }),
    defineField({ name: 'heroHeadlineYellow', title: 'Hero Headline (yellow)', type: 'string' }),
    defineField({ name: 'heroSubtext', title: 'Hero Subtext', type: 'text', rows: 2 }),
    defineField({
      name: 'stats',
      title: 'Stats Grid (2×2)',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'value', type: 'string', title: 'Value (e.g. 50+)' }),
            defineField({ name: 'label', type: 'string', title: 'Label' }),
          ],
        },
      ],
    }),
    defineField({ name: 'storyEyebrow', title: 'Story Section Eyebrow', type: 'string' }),
    defineField({ name: 'storyParagraphs', title: 'Story Paragraphs', type: 'array', of: [{ type: 'text' }] }),
    defineField({ name: 'storyQuote', title: 'Story Blockquote', type: 'string' }),
    defineField({
      name: 'guarantees',
      title: 'Guarantee Items',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'label', type: 'string', title: 'Guarantee Label' }),
            defineField({ name: 'detail', type: 'text', title: 'Detail Text', rows: 2 }),
          ],
        },
      ],
    }),
  ],
  preview: { prepare: () => ({ title: 'About Page' }) },
})
