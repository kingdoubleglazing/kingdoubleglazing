'use client'

import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { schemas } from './sanity/schemas'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!

export default defineConfig({
  basePath: '/studio',
  projectId,
  dataset,
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            S.listItem().title('Site Settings').id('siteSettings')
              .child(S.document().schemaType('siteSettings').documentId('siteSettings')),
            S.listItem().title('Navigation').id('navigation')
              .child(S.document().schemaType('navigation').documentId('navigation')),
            S.divider(),
            S.listItem().title('Home Page').id('homePage')
              .child(S.document().schemaType('homePage').documentId('homePage')),
            S.listItem().title('Services Page').id('servicesPage')
              .child(S.document().schemaType('servicesPage').documentId('servicesPage')),
            S.listItem().title('About Page').id('aboutPage')
              .child(S.document().schemaType('aboutPage').documentId('aboutPage')),
            S.listItem().title('Contact Page').id('contactPage')
              .child(S.document().schemaType('contactPage').documentId('contactPage')),
            S.listItem().title('Warranty Page').id('warrantyPage')
              .child(S.document().schemaType('warrantyPage').documentId('warrantyPage')),
            S.listItem().title('Estimate Page').id('estimatePage')
              .child(S.document().schemaType('estimatePage').documentId('estimatePage')),
            S.divider(),
            S.documentTypeListItem('testimonial').title('Testimonials'),
            S.documentTypeListItem('galleryItem').title('Gallery'),
            S.documentTypeListItem('faqItem').title('FAQs'),
            S.documentTypeListItem('pricingOption').title('Pricing Options'),
            S.documentTypeListItem('processStep').title('Process Steps'),
          ]),
    }),
  ],
  schema: { types: schemas },
})
