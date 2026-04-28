import { defineField, defineType } from 'sanity'

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
      name: 'reviews',
      title: 'Review Aggregation',
      type: 'object',
      fields: [
        defineField({ name: 'totalCount', type: 'number', title: 'Total Review Count' }),
        defineField({ name: 'averageRating', type: 'number', title: 'Average Rating (e.g. 5.0)' }),
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
  ],
  preview: { select: { title: 'name' } },
})
