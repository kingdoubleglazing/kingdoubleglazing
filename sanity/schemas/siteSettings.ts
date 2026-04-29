import { defineArrayMember, defineField, defineType } from 'sanity'

export const siteSettingsSchema = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Business Name', type: 'string' }),
    defineField({ name: 'legalName', title: 'Legal Name', type: 'string' }),
    defineField({ name: 'domain', title: 'Domain (with https)', type: 'string' }),
    defineField({ name: 'phone', title: 'Phone (display)', type: 'string' }),
    defineField({ name: 'phoneTel', title: 'Phone E.164 (+61...)', type: 'string' }),
    defineField({ name: 'phoneHref', title: 'Phone href (tel:...)', type: 'string' }),
    defineField({ name: 'email', title: 'Email', type: 'string' }),
    defineField({ name: 'abn', title: 'ABN', type: 'string' }),
    defineField({ name: 'licenseNumber', title: 'License Number', type: 'string' }),
    defineField({ name: 'notificationEmail', title: 'Lead Notification Email', type: 'string' }),
    defineField({
      name: 'address',
      title: 'Address',
      type: 'object',
      fields: [
        defineField({ name: 'street', type: 'string', title: 'Street' }),
        defineField({ name: 'suburb', type: 'string', title: 'Suburb' }),
        defineField({ name: 'state', type: 'string', title: 'State' }),
        defineField({ name: 'postcode', type: 'string', title: 'Postcode' }),
        defineField({ name: 'country', type: 'string', title: 'Country Code (AU)' }),
        defineField({ name: 'display', type: 'string', title: 'Full Display Address' }),
      ],
    }),
    defineField({
      name: 'geo',
      title: 'Geo Coordinates',
      type: 'object',
      fields: [
        defineField({ name: 'latitude', type: 'number', title: 'Latitude' }),
        defineField({ name: 'longitude', type: 'number', title: 'Longitude' }),
      ],
    }),
    defineField({
      name: 'social',
      title: 'Social Links',
      type: 'object',
      fields: [
        defineField({ name: 'facebook', type: 'string', title: 'Facebook URL' }),
        defineField({ name: 'instagram', type: 'string', title: 'Instagram URL' }),
        defineField({ name: 'google', type: 'string', title: 'Google Business Profile URL' }),
      ],
    }),
    defineField({
      name: 'logos',
      title: 'Logo Paths',
      type: 'object',
      fields: [
        defineField({ name: 'light', type: 'string', title: 'Light Logo Path (/logo-light.png)' }),
        defineField({ name: 'dark', type: 'string', title: 'Dark Logo Path (/logo-dark.png)' }),
        defineField({ name: 'icon', type: 'string', title: 'Icon Path (/icon-small.png)' }),
      ],
    }),
    defineField({
      name: 'pricing',
      title: 'Pricing Display',
      type: 'object',
      fields: [
        defineField({ name: 'retrofitFromPerSqm', type: 'number', title: 'From price ($/m²)' }),
        defineField({ name: 'retrofitFromDisplay', type: 'string', title: 'Display string (e.g. From $595/m²)' }),
      ],
    }),
    defineField({
      name: 'trustBarItems',
      title: 'Trust Bar Items',
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
                  { title: 'Clock', value: 'clock' },
                  { title: 'Star', value: 'star' },
                  { title: 'Shield Check', value: 'shieldCheck' },
                  { title: 'Wrench', value: 'wrench' },
                  { title: 'Hammer', value: 'hammer' },
                  { title: 'Zap / Lightning', value: 'zap' },
                  { title: 'Badge Percent', value: 'badgePercent' },
                  { title: 'Thermometer', value: 'thermometer' },
                ],
              },
            }),
            defineField({ name: 'label', title: 'Label', type: 'string' }),
          ],
          preview: { select: { title: 'label', subtitle: 'iconKey' } },
        }),
      ],
    }),
    defineField({
      name: 'paymentTerms',
      title: 'Payment Terms Section',
      type: 'object',
      fields: [
        defineField({ name: 'depositTitle', title: 'Deposit Block Title', type: 'string' }),
        defineField({ name: 'depositBody', title: 'Deposit Block Body', type: 'text', rows: 2 }),
        defineField({ name: 'completionTitle', title: 'Completion Block Title', type: 'string' }),
        defineField({ name: 'completionBody', title: 'Completion Block Body', type: 'text', rows: 2 }),
        defineField({ name: 'warrantyTitle', title: 'Warranty Footer Title', type: 'string' }),
        defineField({ name: 'warrantyBody', title: 'Warranty Footer Body', type: 'text', rows: 3 }),
      ],
    }),
    defineField({
      name: 'adaptorDisclosure',
      title: 'Adaptor Disclosure Section',
      type: 'object',
      fields: [
        defineField({ name: 'heading', title: 'Heading', type: 'string' }),
        defineField({ name: 'mobileSubtitle', title: 'Mobile Subtitle (tap to expand)', type: 'string' }),
        defineField({ name: 'body1', title: 'Body Paragraph 1', type: 'text', rows: 3 }),
        defineField({ name: 'body2', title: 'Body Paragraph 2', type: 'text', rows: 2 }),
      ],
    }),
    defineField({
      name: 'freeAdviceBlock',
      title: 'Free Advice Block',
      type: 'object',
      fields: [
        defineField({ name: 'eyebrow', title: 'Eyebrow Label', type: 'string' }),
        defineField({ name: 'headingLine1', title: 'Heading Line 1 (white)', type: 'string' }),
        defineField({ name: 'headingLine2', title: 'Heading Line 2 (yellow)', type: 'string' }),
        defineField({ name: 'body', title: 'Body Text', type: 'text', rows: 2 }),
        defineField({ name: 'buttonLabel', title: 'Button Label (appears before phone number)', type: 'string' }),
      ],
    }),
  ],
  preview: { select: { title: 'name' } },
})
