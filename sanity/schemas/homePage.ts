import { defineField, defineType } from 'sanity'

export const homePageSchema = defineType({
  name: 'homePage',
  title: 'Home Page',
  type: 'document',
  fields: [
    defineField({ name: 'badge', title: 'Hero Badge Text', type: 'string' }),
    defineField({ name: 'headlineWhite', title: 'Hero Headline (white)', type: 'string' }),
    defineField({ name: 'headlineYellow', title: 'Hero Headline (yellow)', type: 'string' }),
    defineField({ name: 'subtext', title: 'Hero Subtext', type: 'text', rows: 2 }),
    defineField({ name: 'primaryCtaLabel', title: 'Primary CTA Label', type: 'string' }),
    defineField({ name: 'adaptorCaption', title: 'Adaptor Caption', type: 'string' }),
    defineField({ name: 'estimateCtaHeadline', title: 'Estimate CTA Section Headline', type: 'string' }),
    defineField({ name: 'estimateCtaSubtext', title: 'Estimate CTA Subtext', type: 'string' }),
    defineField({ name: 'estimateCtaButtonLabel', title: 'Estimate CTA Button Label', type: 'string' }),
    defineField({ name: 'estimateCtaCaption', title: 'Estimate CTA Caption', type: 'string' }),
    defineField({ name: 'faqHeading', title: 'FAQ Section Heading', type: 'string' }),
    defineField({ name: 'faqSubheading', title: 'FAQ Section Subheading', type: 'string' }),
  ],
  preview: { prepare: () => ({ title: 'Home Page' }) },
})
