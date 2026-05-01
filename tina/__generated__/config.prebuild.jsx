// tina/config.ts
import { defineConfig } from "tinacms";
var faqFields = [
  { name: "q", type: "string", label: "Question", ui: { component: "textarea" } },
  { name: "a", type: "string", label: "Answer", ui: { component: "textarea" } }
];
var faqListField = {
  name: "faqs",
  type: "object",
  list: true,
  label: "FAQs",
  ui: { itemProps: (item) => ({ label: item?.q?.slice(0, 60) ?? "FAQ" }) },
  fields: faqFields
};
var ctaFields = [
  { name: "label", type: "string", label: "Label" },
  { name: "href", type: "string", label: "URL" }
];
var config_default = defineConfig({
  branch: process.env.GITHUB_BRANCH || process.env.VERCEL_GIT_COMMIT_REF || "main",
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID || "",
  token: process.env.TINA_TOKEN || "",
  build: { outputFolder: "admin", publicFolder: "public" },
  media: { tina: { mediaRoot: "", publicFolder: "public" } },
  schema: {
    collections: [
      // ─── Global Settings (site + navigation combined) ─────────────────
      {
        name: "settings",
        label: "Settings",
        path: "content/settings",
        format: "json",
        match: { include: "settings" },
        ui: { allowedActions: { create: false, delete: false }, global: true },
        fields: [
          // ── Business ──────────────────────────────────────────────────
          { name: "name", type: "string", label: "Business Name" },
          { name: "legalName", type: "string", label: "Legal Name" },
          { name: "domain", type: "string", label: "Domain" },
          { name: "abn", type: "string", label: "ABN" },
          { name: "licenseNumber", type: "string", label: "Licence Number" },
          // ── Contact ───────────────────────────────────────────────────
          { name: "phone", type: "string", label: "Phone (display, e.g. 0406 470 595)" },
          { name: "phoneTel", type: "string", label: "Phone E.164 (e.g. +61406470595)" },
          { name: "phoneHref", type: "string", label: "Phone href (e.g. tel:+61406470595)" },
          { name: "email", type: "string", label: "Email" },
          { name: "notificationEmail", type: "string", label: "Notification Email (quote alerts)" },
          { name: "address", type: "object", label: "Address", fields: [
            { name: "street", type: "string", label: "Street" },
            { name: "suburb", type: "string", label: "Suburb" },
            { name: "state", type: "string", label: "State" },
            { name: "postcode", type: "string", label: "Postcode" },
            { name: "country", type: "string", label: "Country" },
            { name: "display", type: "string", label: "Full display address" }
          ] },
          { name: "social", type: "object", label: "Social Media", fields: [
            { name: "facebook", type: "string", label: "Facebook URL" },
            { name: "instagram", type: "string", label: "Instagram URL" },
            { name: "google", type: "string", label: "Google Business URL" }
          ] },
          // ── Branding ──────────────────────────────────────────────────
          { name: "logos", type: "object", label: "Logos", fields: [
            { name: "light", type: "image", label: "Logo \u2014 light background (header)" },
            { name: "dark", type: "image", label: "Logo \u2014 dark background (footer)" },
            { name: "icon", type: "image", label: "Icon / Crown mark" }
          ] },
          // ── Pricing ───────────────────────────────────────────────────
          { name: "pricing", type: "object", label: "Pricing Display", fields: [
            { name: "retrofitFromPerSqm", type: "number", label: "Price per m\xB2 (number)" },
            { name: "retrofitFromDisplay", type: "string", label: "Price display string" }
          ] },
          // ── Footer ────────────────────────────────────────────────────
          { name: "footerTagline", type: "string", label: "Footer: Tagline" },
          { name: "footerBio", type: "string", label: "Footer: Bio / descriptor", ui: { component: "textarea" } },
          { name: "warrantyBlurb", type: "string", label: "Footer: Warranty blurb (bottom bar)" },
          // ── Navigation ────────────────────────────────────────────────
          { name: "mainNav", type: "object", list: true, label: "Main Navigation", ui: { itemProps: (item) => ({ label: item?.label }) }, fields: [
            { name: "label", type: "string", label: "Label" },
            { name: "href", type: "string", label: "Path" }
          ] },
          { name: "ctaNav", type: "object", label: "Header CTA Button", fields: [
            { name: "label", type: "string", label: "Label" },
            { name: "href", type: "string", label: "Path" }
          ] },
          { name: "footerServicesHeading", type: "string", label: "Footer: Services column heading" },
          { name: "footerServicesNav", type: "object", list: true, label: "Footer: Services links", ui: { itemProps: (item) => ({ label: item?.label }) }, fields: [
            { name: "label", type: "string", label: "Label" },
            { name: "href", type: "string", label: "Path" }
          ] },
          { name: "footerCompanyHeading", type: "string", label: "Footer: Company column heading" },
          { name: "footerCompanyNav", type: "object", list: true, label: "Footer: Company links", ui: { itemProps: (item) => ({ label: item?.label }) }, fields: [
            { name: "label", type: "string", label: "Label" },
            { name: "href", type: "string", label: "Path" }
          ] },
          // ── Payment Terms (global — shared across all pages) ──────────────
          { name: "paymentTerms", type: "object", label: "Payment Terms", fields: [
            { name: "depositTitle", type: "string", label: "Deposit title" },
            { name: "depositBody", type: "string", label: "Deposit body", ui: { component: "textarea" } },
            { name: "completionTitle", type: "string", label: "Completion title" },
            { name: "completionBody", type: "string", label: "Completion body", ui: { component: "textarea" } },
            { name: "warrantyTitle", type: "string", label: "Warranty title" },
            { name: "warrantyBody", type: "string", label: "Warranty body", ui: { component: "textarea" } }
          ] }
        ]
      },
      // ─── Pages (block-based) ──────────────────────────────────────────
      {
        name: "page",
        label: "Pages",
        path: "content/pages",
        format: "json",
        ui: {
          allowedActions: { create: false, delete: false },
          router: ({ document }) => {
            const routes = {
              home: "/",
              about: "/about",
              services: "/services",
              contact: "/contact",
              warranty: "/warranty",
              estimate: "/instant-estimate"
            };
            return routes[document._sys.filename] ?? null;
          }
        },
        fields: [
          {
            name: "blocks",
            type: "object",
            list: true,
            label: "Page Sections",
            templates: [
              // ── Hero ────────────────────────────────────────────────
              {
                name: "hero",
                label: "Hero",
                ui: { itemProps: () => ({ label: "\u{1F3D4} Hero" }) },
                fields: [
                  { name: "variant", type: "string", label: "Style", options: [
                    { value: "overlay", label: "Overlay (full-image background)" },
                    { value: "split", label: "Split (dark left + image right)" },
                    { value: "centered", label: "Centered (dark, no side image)" }
                  ] },
                  { name: "badge", type: "string", label: "Badge Text" },
                  { name: "headlineWhite", type: "string", label: "Headline (white part)" },
                  { name: "headlineYellow", type: "string", label: "Headline (gold part)" },
                  { name: "subtext", type: "string", label: "Subtext", ui: { component: "textarea" } },
                  { name: "primaryCta", type: "object", label: "Primary CTA", fields: ctaFields },
                  { name: "secondaryCta", type: "object", label: "Secondary CTA (phone)", fields: ctaFields },
                  { name: "imageSrc", type: "image", label: "Image" },
                  { name: "imageAlt", type: "string", label: "Image Alt Text" },
                  { name: "showWarrantyBadge", type: "boolean", label: "Show Warranty Badge" },
                  { name: "adaptorCaption", type: "string", label: "Adaptor Caption (optional)" },
                  { name: "accentWord", type: "string", label: "Background Accent Word (e.g. TAS, COVERED)" }
                ]
              },
              // ── Trust Bar ────────────────────────────────────────────
              {
                name: "trustBar",
                label: "Trust Bar",
                ui: { itemProps: () => ({ label: "\u2B50 Trust Bar" }) },
                fields: [
                  { name: "items", type: "object", list: true, label: "Items", ui: { itemProps: (item) => ({ label: item?.label ?? "Item" }) }, fields: [
                    { name: "iconKey", type: "string", label: "Icon", options: [
                      { value: "alertTriangle", label: "Alert / Warning" },
                      { value: "award", label: "Award" },
                      { value: "badgePercent", label: "Badge / Percent" },
                      { value: "building2", label: "Building / Commercial" },
                      { value: "calendar", label: "Calendar" },
                      { value: "checkCircle", label: "Check Circle" },
                      { value: "clock", label: "Clock" },
                      { value: "dollarSign", label: "Dollar Sign" },
                      { value: "gauge", label: "Gauge / Performance" },
                      { value: "hammer", label: "Hammer" },
                      { value: "home", label: "Home / Residential" },
                      { value: "layers", label: "Layers" },
                      { value: "leaf", label: "Leaf / Eco" },
                      { value: "lock", label: "Lock / Security" },
                      { value: "mapPin", label: "Map Pin / Location" },
                      { value: "phone", label: "Phone" },
                      { value: "shieldCheck", label: "Shield / Check" },
                      { value: "star", label: "Star" },
                      { value: "sun", label: "Sun / Heat" },
                      { value: "thermometer", label: "Thermometer" },
                      { value: "thumbsUp", label: "Thumbs Up" },
                      { value: "truck", label: "Truck / Delivery" },
                      { value: "users", label: "Users / Team" },
                      { value: "volume2", label: "Volume / Sound" },
                      { value: "wind", label: "Wind / Draft" },
                      { value: "wrench", label: "Wrench" },
                      { value: "zap", label: "Zap / Fast" }
                    ] },
                    { name: "label", type: "string", label: "Label" }
                  ] }
                ]
              },
              // ── Why Retrofit ─────────────────────────────────────────
              {
                name: "whyRetrofit",
                label: "Why Retrofit Grid",
                ui: { itemProps: () => ({ label: "\u{1FA9F} Why Retrofit" }) },
                fields: [
                  { name: "eyebrow", type: "string", label: "Eyebrow" },
                  { name: "heading1", type: "string", label: "Heading Line 1" },
                  { name: "heading2", type: "string", label: "Heading Line 2 (gold)" },
                  {
                    name: "items",
                    type: "object",
                    list: true,
                    label: "Items",
                    ui: { itemProps: (item) => ({ label: item?.headline ?? "Item" }) },
                    fields: [
                      { name: "iconKey", type: "string", label: "Icon", options: [
                        { value: "hammer", label: "Hammer" },
                        { value: "layers", label: "Layers" },
                        { value: "zap", label: "Zap" },
                        { value: "volume2", label: "Volume / Sound" },
                        { value: "thermometer", label: "Thermometer" },
                        { value: "badgePercent", label: "Badge / Percent" },
                        { value: "clock", label: "Clock" },
                        { value: "shieldCheck", label: "Shield / Check" },
                        { value: "star", label: "Star" },
                        { value: "wrench", label: "Wrench" }
                      ] },
                      { name: "headline", type: "string", label: "Headline" },
                      { name: "sub", type: "string", label: "Subtext", ui: { component: "textarea" } }
                    ]
                  }
                ]
              },
              // ── Process Steps ─────────────────────────────────────────
              {
                name: "processSteps",
                label: "Process Steps",
                ui: { itemProps: () => ({ label: "\u{1F4CB} Process Steps" }) },
                fields: [
                  { name: "heading", type: "string", label: "Heading" },
                  { name: "subheading", type: "string", label: "Subheading", ui: { component: "textarea" } },
                  { name: "cta", type: "object", label: "CTA Button", fields: ctaFields },
                  {
                    name: "steps",
                    type: "object",
                    list: true,
                    label: "Steps",
                    ui: { itemProps: (item) => ({ label: item?.title ?? "Step" }) },
                    fields: [
                      { name: "title", type: "string", label: "Step Title" },
                      { name: "body", type: "string", label: "Step Body", ui: { component: "textarea" } },
                      { name: "callout", type: "string", label: "Callout (optional)" },
                      { name: "imageSrc", type: "image", label: "Image" },
                      { name: "imageAlt", type: "string", label: "Image Alt" }
                    ]
                  }
                ]
              },
              // ── Estimate CTA ──────────────────────────────────────────
              {
                name: "estimateCta",
                label: "Estimate CTA",
                ui: { itemProps: () => ({ label: "\u{1F4B0} Estimate CTA" }) },
                fields: [
                  { name: "headline", type: "string", label: "Headline" },
                  { name: "subtext", type: "string", label: "Subtext", ui: { component: "textarea" } },
                  { name: "cta", type: "object", label: "CTA Button", fields: ctaFields },
                  { name: "caption", type: "string", label: "Caption" }
                ]
              },
              // ── FAQ ───────────────────────────────────────────────────
              {
                name: "faq",
                label: "FAQ",
                ui: { itemProps: () => ({ label: "\u2753 FAQ" }) },
                fields: [
                  { name: "heading", type: "string", label: "Heading" },
                  { name: "subheading", type: "string", label: "Subheading" },
                  faqListField
                ]
              },
              // ── Service Section ───────────────────────────────────────
              {
                name: "serviceSection",
                label: "Service Section",
                ui: { itemProps: (item) => ({ label: `\u{1F527} ${item?.heading ?? "Service"}` }) },
                fields: [
                  { name: "id", type: "string", label: "Anchor ID (e.g. retrofit, emergency)" },
                  { name: "eyebrow", type: "string", label: "Eyebrow" },
                  { name: "heading", type: "string", label: "Heading" },
                  { name: "bodyText", type: "string", label: "Body Text", ui: { component: "textarea" } },
                  { name: "bullets", type: "string", list: true, label: "Bullet Points" },
                  { name: "variant", type: "string", label: "Visual Style", options: [
                    { value: "default", label: "Default" },
                    { value: "featured", label: "Featured (gold border)" },
                    { value: "dark", label: "Dark" },
                    { value: "danger", label: "Danger (red)" }
                  ] },
                  { name: "imageSrc", type: "image", label: "Image (optional)" },
                  { name: "imageAlt", type: "string", label: "Image Alt" },
                  { name: "primaryCta", type: "object", label: "Primary CTA", fields: ctaFields },
                  { name: "secondaryCta", type: "object", label: "Secondary CTA (optional)", fields: ctaFields }
                ]
              },
              // ── Story With Stats (About page) ─────────────────────────
              {
                name: "storyWithStats",
                label: "Story + Stats",
                ui: { itemProps: () => ({ label: "\u{1F4D6} Story + Stats" }) },
                fields: [
                  { name: "eyebrow", type: "string", label: "Eyebrow" },
                  { name: "paragraphs", type: "string", list: true, label: "Story Paragraphs" },
                  { name: "quote", type: "string", label: "Pull Quote", ui: { component: "textarea" } },
                  {
                    name: "stats",
                    type: "object",
                    list: true,
                    label: "Stats",
                    ui: { itemProps: (item) => ({ label: item?.value ?? "Stat" }) },
                    fields: [
                      { name: "value", type: "string", label: "Value (e.g. 50+)" },
                      { name: "label", type: "string", label: "Label" }
                    ]
                  }
                ]
              },
              // ── Warranty Coverage ─────────────────────────────────────
              {
                name: "warrantyCoverage",
                label: "Warranty Coverage",
                ui: { itemProps: () => ({ label: "\u{1F6E1} Warranty Coverage" }) },
                fields: [
                  {
                    name: "coveredItems",
                    type: "object",
                    list: true,
                    label: "What's Covered",
                    ui: { itemProps: (item) => ({ label: item?.item }) },
                    fields: [
                      { name: "item", type: "string", label: "Item Name" },
                      { name: "detail", type: "string", label: "Detail", ui: { component: "textarea" } }
                    ]
                  },
                  {
                    name: "notCoveredItems",
                    type: "object",
                    list: true,
                    label: "What's Not Covered",
                    ui: { itemProps: (item) => ({ label: item?.item }) },
                    fields: [
                      { name: "item", type: "string", label: "Item Name" },
                      { name: "detail", type: "string", label: "Detail", ui: { component: "textarea" } }
                    ]
                  },
                  { name: "claimSteps", type: "string", list: true, label: "Claim Steps" }
                ]
              },
              // ── Contact Cards ─────────────────────────────────────────
              {
                name: "contactCards",
                label: "Contact Cards",
                ui: { itemProps: () => ({ label: "\u{1F4DE} Contact Cards" }) },
                fields: [
                  { name: "phoneSublabel", type: "string", label: "Phone sublabel" },
                  { name: "emailSublabel", type: "string", label: "Email sublabel" },
                  { name: "areaSublabel", type: "string", label: "Service Area sublabel" },
                  { name: "emergencySublabel", type: "string", label: "Emergency sublabel" }
                ]
              },
              // ── Contact Form ──────────────────────────────────────────
              {
                name: "contactForm",
                label: "Contact Form",
                ui: { itemProps: () => ({ label: "\u{1F4DD} Contact Form" }) },
                fields: [
                  { name: "heading", type: "string", label: "Form Heading" }
                ]
              },
              // ── CTA Banner ────────────────────────────────────────────
              {
                name: "ctaBanner",
                label: "CTA Banner",
                ui: { itemProps: (item) => ({ label: `\u{1F4E3} CTA: ${item?.heading?.slice(0, 30) ?? ""}` }) },
                fields: [
                  { name: "heading", type: "string", label: "Heading" },
                  { name: "subtext", type: "string", label: "Subtext", ui: { component: "textarea" } },
                  { name: "primaryCta", type: "object", label: "Primary CTA", fields: ctaFields },
                  { name: "secondaryCta", type: "object", label: "Secondary CTA (phone)", fields: ctaFields },
                  { name: "trustItems", type: "string", label: "Trust footnotes", list: true }
                ]
              },
              // ── Glass Comparison (Estimate page) ──────────────────────
              {
                name: "glassComparison",
                label: "Glass Comparison & Estimate Tool",
                ui: { itemProps: () => ({ label: "\u{1F52C} Glass Comparison + Tool" }) },
                fields: [{ name: "placeholder", type: "string", label: "Static section \u2014 no options", ui: { component: "hidden" } }]
              },
              // ── Glass Tech Specs ──────────────────────────────────────
              {
                name: "glassTechSpecs",
                label: "Glass Tech Specs",
                ui: { itemProps: () => ({ label: "\u2697\uFE0F Glass Tech Specs" }) },
                fields: [{ name: "placeholder", type: "string", label: "Static section \u2014 no options", ui: { component: "hidden" } }]
              },
              // ── Adaptor Disclosure ────────────────────────────────────
              {
                name: "adaptorDisclosure",
                label: "Adaptor Disclosure",
                ui: { itemProps: () => ({ label: "\u{1F4CF} Adaptor Disclosure" }) },
                fields: [
                  { name: "heading", type: "string", label: "Heading" },
                  { name: "mobileSubtitle", type: "string", label: "Mobile subtitle" },
                  { name: "body1", type: "string", label: "Body paragraph 1", ui: { component: "textarea" } },
                  { name: "body2", type: "string", label: "Body paragraph 2", ui: { component: "textarea" } }
                ]
              },
              // ── Payment Terms ─────────────────────────────────────────
              {
                name: "paymentTerms",
                label: "Payment Terms",
                ui: { itemProps: () => ({ label: "\u{1F4B3} Payment Terms" }) },
                fields: [
                  { name: "eyebrow", type: "string", label: "Eyebrow" },
                  { name: "heading", type: "string", label: "Heading" },
                  { name: "depositTitle", type: "string", label: "Deposit title" },
                  { name: "depositBody", type: "string", label: "Deposit body", ui: { component: "textarea" } },
                  { name: "completionTitle", type: "string", label: "Completion title" },
                  { name: "completionBody", type: "string", label: "Completion body", ui: { component: "textarea" } },
                  { name: "warrantyTitle", type: "string", label: "Warranty title" },
                  { name: "warrantyBody", type: "string", label: "Warranty body", ui: { component: "textarea" } }
                ]
              },
              // ── Free Advice CTA ───────────────────────────────────────
              {
                name: "freeAdvice",
                label: "Free Advice CTA",
                ui: { itemProps: () => ({ label: "\u{1F4A1} Free Advice" }) },
                fields: [
                  { name: "eyebrow", type: "string", label: "Eyebrow" },
                  { name: "headingLine1", type: "string", label: "Heading line 1" },
                  { name: "headingLine2", type: "string", label: "Heading line 2 (gold)" },
                  { name: "body", type: "string", label: "Body", ui: { component: "textarea" } },
                  { name: "buttonLabel", type: "string", label: "Button label" }
                ]
              },
              // ── What Else Strip ───────────────────────────────────────
              {
                name: "whatElseStrip",
                label: "What Else We Do Strip",
                ui: { itemProps: () => ({ label: "\u{1F4CC} What Else Strip" }) },
                fields: [
                  { name: "eyebrow", type: "string", label: "Eyebrow" },
                  { name: "heading", type: "string", label: "Heading" },
                  { name: "cta", type: "object", label: "CTA Button", fields: ctaFields },
                  { name: "services", type: "object", list: true, label: "Service links", ui: { itemProps: (item) => ({ label: item?.label ?? "Service" }) }, fields: [
                    { name: "label", type: "string", label: "Label" },
                    { name: "href", type: "string", label: "URL" }
                  ] }
                ]
              },
              // ── Emergency Strip ───────────────────────────────────────
              {
                name: "emergencyStrip",
                label: "Emergency Strip",
                ui: { itemProps: () => ({ label: "\u{1F6A8} Emergency Strip" }) },
                fields: [
                  { name: "boldText", type: "string", label: "Bold text" },
                  { name: "text", type: "string", label: "Text after bold" },
                  { name: "cta", type: "object", label: "CTA Link", fields: ctaFields }
                ]
              }
            ]
          }
        ]
      },
      // ─── Gallery ──────────────────────────────────────────────────────
      {
        name: "gallery",
        label: "Gallery",
        path: "content/gallery",
        format: "json",
        fields: [
          { name: "src", type: "image", label: "Image" },
          { name: "alt", type: "string", label: "Alt Text" },
          { name: "category", type: "string", label: "Category", options: [
            { value: "retrofit", label: "Retrofit Glazing" },
            { value: "commercial", label: "Commercial" },
            { value: "shopfronts", label: "Shopfronts" },
            { value: "repairs", label: "Repairs" }
          ] },
          { name: "caption", type: "string", label: "Caption" },
          { name: "order", type: "number", label: "Display Order" }
        ]
      },
      // ─── Pricing ──────────────────────────────────────────────────────
      {
        name: "pricingOption",
        label: "Pricing Options",
        path: "content/pricing",
        format: "json",
        fields: [
          { name: "optionKey", type: "string", label: "Option Key \u2014 single uppercase letter, e.g. A, B, C \u2026 displayed on the card" },
          { name: "label", type: "string", label: "Label" },
          { name: "sublabel", type: "string", label: "Sublabel" },
          { name: "spec", type: "string", label: "Glass Spec" },
          { name: "pricePerSqm", type: "number", label: "Price per m\xB2" },
          { name: "heatPct", type: "number", label: "Heat Reduction %" },
          { name: "noisePct", type: "number", label: "Noise Reduction %" },
          { name: "tech", type: "object", label: "Technical Details", fields: [
            { name: "composition", type: "string", list: true, label: "Composition" },
            { name: "spacerMm", type: "number", label: "Spacer (mm)" },
            { name: "lowE", type: "boolean", label: "Low-E Coating" },
            { name: "acousticPVB", type: "boolean", label: "Acoustic PVB" },
            { name: "tinted", type: "boolean", label: "Tinted" },
            { name: "bestFor", type: "string", label: "Best For" },
            { name: "rwRating", type: "string", label: "Rw Rating" },
            { name: "notes", type: "string", label: "Notes", ui: { component: "textarea" } }
          ] }
        ]
      }
    ]
  }
});
export {
  config_default as default
};
