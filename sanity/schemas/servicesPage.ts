import { defineField, defineType } from 'sanity'

const ctaField = (name: string, title: string) =>
  defineField({
    name,
    title,
    type: 'object',
    fields: [
      defineField({ name: 'label', type: 'string', title: 'Label' }),
      defineField({ name: 'href', type: 'string', title: 'Path' }),
    ],
  })

const serviceSectionFields = [
  defineField({ name: 'id', title: 'Anchor ID', type: 'string' }),
  defineField({ name: 'eyebrow', title: 'Eyebrow Label', type: 'string' }),
  defineField({ name: 'heading', title: 'Section Heading', type: 'string' }),
  defineField({ name: 'bodyText', title: 'Body Paragraph', type: 'text', rows: 3 }),
  defineField({ name: 'bullets', title: 'Bullet Points', type: 'array', of: [{ type: 'string' }] }),
  ctaField('primaryCta', 'Primary CTA'),
  ctaField('secondaryCta', 'Secondary CTA (optional)'),
]

export const servicesPageSchema = defineType({
  name: 'servicesPage',
  title: 'Services Page',
  type: 'document',
  fields: [
    defineField({ name: 'heroHeading', title: 'Hero Headline', type: 'string' }),
    defineField({ name: 'heroSubtext', title: 'Hero Subtext', type: 'text', rows: 2 }),
    defineField({
      name: 'serviceSections',
      title: 'Service Sections',
      type: 'array',
      of: [{ type: 'object', fields: serviceSectionFields }],
    }),
    defineField({ name: 'faqHeading', title: 'FAQ Heading', type: 'string' }),
    defineField({ name: 'faqSubheading', title: 'FAQ Subheading', type: 'string' }),
  ],
  preview: { prepare: () => ({ title: 'Services Page' }) },
})
