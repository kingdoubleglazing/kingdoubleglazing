import { defineArrayMember, defineField, defineType } from 'sanity'

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
    defineField({ name: 'whyRetrofitEyebrow', title: 'Why Retrofit Eyebrow', type: 'string' }),
    defineField({ name: 'whyRetrofitHeading1', title: 'Why Retrofit Heading Line 1 (white)', type: 'string' }),
    defineField({ name: 'whyRetrofitHeading2', title: 'Why Retrofit Heading Line 2 (yellow)', type: 'string' }),
    defineField({
      name: 'whyRetrofitItems',
      title: 'Why Retrofit Items',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'iconKey',
              title: 'Icon',
              type: 'string',
              options: {
                list: [
                  { title: 'Hammer', value: 'hammer' },
                  { title: 'Layers', value: 'layers' },
                  { title: 'Zap / Lightning', value: 'zap' },
                  { title: 'Volume / Sound', value: 'volume2' },
                  { title: 'Thermometer', value: 'thermometer' },
                  { title: 'Badge Percent', value: 'badgePercent' },
                  { title: 'Clock', value: 'clock' },
                  { title: 'Shield Check', value: 'shieldCheck' },
                  { title: 'Star', value: 'star' },
                  { title: 'Wrench', value: 'wrench' },
                ],
              },
            }),
            defineField({ name: 'headline', title: 'Headline', type: 'string' }),
            defineField({ name: 'sub', title: 'Sub Text', type: 'text', rows: 2 }),
          ],
          preview: { select: { title: 'headline', subtitle: 'sub' } },
        }),
      ],
    }),
  ],
  preview: { prepare: () => ({ title: 'Home Page' }) },
})
