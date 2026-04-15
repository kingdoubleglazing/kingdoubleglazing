import { pgTable, serial, varchar, integer, text, timestamp } from 'drizzle-orm/pg-core'

export const leads = pgTable('leads', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 100 }).notNull(),
  email: varchar('email', { length: 255 }).notNull(),
  phone: varchar('phone', { length: 20 }).notNull(),
  suburb: varchar('suburb', { length: 100 }),
  message: text('message'),
  preferredTime: varchar('preferred_time', { length: 20 }), // morning | afternoon | evening
  source: varchar('source', { length: 50 }).default('contact_form'),
  createdAt: timestamp('created_at').defaultNow(),
})

export const quotes = pgTable('quotes', {
  id: serial('id').primaryKey(),
  // Contact details (captured at confirmation step)
  name: varchar('name', { length: 100 }).notNull(),
  email: varchar('email', { length: 255 }).notNull(),
  phone: varchar('phone', { length: 20 }).notNull(),
  // Calculator inputs
  propertyType: varchar('property_type', { length: 50 }),    // house | apartment | townhouse
  windowCount: integer('window_count'),
  glassType: varchar('glass_type', { length: 50 }),           // standard | lowe | acoustic
  orientation: varchar('orientation', { length: 50 }),        // north | east | west | south | mixed
  storeys: integer('storeys').default(1),
  frameCondition: varchar('frame_condition', { length: 50 }), // good | needs-work
  priority: varchar('priority', { length: 50 }),              // noise | warmth | both
  // Calculated estimate
  estimateLow: integer('estimate_low'),
  estimateHigh: integer('estimate_high'),
  // Workflow
  status: varchar('status', { length: 30 }).default('pending'), // pending | confirmed | cancelled
  confirmToken: varchar('confirm_token', { length: 64 }),
  confirmedAt: timestamp('confirmed_at'),
  createdAt: timestamp('created_at').defaultNow(),
})
