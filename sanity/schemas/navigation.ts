import { defineField, defineType } from 'sanity'

const navLinkFields = [
  defineField({ name: 'label', title: 'Label', type: 'string' }),
  defineField({ name: 'href', title: 'Path', type: 'string' }),
]

export const navigationSchema = defineType({
  name: 'navigation',
  title: 'Navigation',
  type: 'document',
  fields: [
    defineField({
      name: 'mainNav',
      title: 'Main Navigation',
      type: 'array',
      of: [{ type: 'object', fields: navLinkFields }],
    }),
    defineField({
      name: 'ctaNav',
      title: 'CTA Button',
      type: 'object',
      fields: navLinkFields,
    }),
    defineField({
      name: 'footerServicesNav',
      title: 'Footer — Services Column',
      type: 'array',
      of: [{ type: 'object', fields: navLinkFields }],
    }),
    defineField({
      name: 'footerCompanyNav',
      title: 'Footer — Company Column',
      type: 'array',
      of: [{ type: 'object', fields: navLinkFields }],
    }),
  ],
  preview: { prepare: () => ({ title: 'Navigation' }) },
})
