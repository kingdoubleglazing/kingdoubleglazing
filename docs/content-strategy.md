# Content & Conversion Strategy

## Brand positioning
"Stop. Don't Overpay." — transparent, anti-ripoff retrofit specialist. Lead with honest pricing, expose industry tricks, give value before asking for contact details.

## Content formats that rank

1. **Cost guides** — price ranges by window type, frame, whole-home scenarios. Tables.
2. **Buyer's guides** — benefits, options, how to compare quotes.
3. **Retrofit vs replacement comparisons** — pros/cons tables, Melbourne-specific.
4. **Myth-busting** — "only for cold climates", "doesn't help in summer", "makes homes airtight".
5. **Noise/comfort explainers** — quantified dB reduction, before/after, real streets.
6. **Climate-specific guides** — Melbourne weather, energy stats, NatHERS.
7. **Contract checklists** — what to ask, red flags, scope items.
8. **Case studies** — real Melbourne retrofits, before/after comfort + bills.

## Conversion benchmarks

- Website overall: target 2-3% conversion
- Search ad landing pages: target 8-12%
- Home services average (Google Ads): ~10%
- Calculator/estimate tools: ~287% more leads vs static forms (industry benchmark)

## CTA patterns

| Context | CTA | Variant |
|---|---|---|
| Service pages | "Get Instant Estimate" | primary |
| Emergency | "Call Now" | secondary (click-to-call) |
| Contact/about | "Book Free Consultation" | soft |
| Blog/guides | "See If Double Glazing Is Worth It" | inline |
| Anti-ripoff angle | "Get a Fair, No-Pressure Quote" | primary |
| Pricing pages | "See Real Melbourne Pricing" | primary |

## Instant Estimate Tool design

### Flow
1. Property & goal: house type, suburb, primary goal (noise/warmth/heat/mix)
2. Windows: count by type, frame material, condition, storey/access
3. Scope: retrofit vs replacement interest, heritage needs
4. **Show estimate range BEFORE lead capture** (this is the differentiator)
5. Lead capture: name, email, phone, optional photos via R2
6. Email PDF quote + confirmation via Resend, insert lead into Neon

### Pricing logic
Pure functions in `lib/pricing.ts`. Per-m² baselines by glass type. Modifiers for access, condition, suburb travel.

### Disclaimer (required)
"Indicative estimate only. Not a formal quote or contract. Final price depends on measurements, frame condition, access, and glass choices."

## 12-month content calendar

| Month | Angle | Flagship content |
|---|---|---|
| Jan | Summer heat, bill shock | "Double glazing in a Melbourne summer" |
| Feb | Heatwaves, rental comfort | "Why your apartment bakes in summer" |
| Mar | Lead-in to winter | "Where Melbourne homes really lose heat" |
| Apr | Autumn comfort | "Retrofit vs secondary glazing for Melbourne winters" |
| May | Peak search demand | Major cost guide update + Estimate Tool CTA |
| Jun | Deep winter, bill shock | "Is double glazing worth it? Honest payback maths" |
| Jul | Comfort and noise | "Can retrofit cut Melbourne traffic noise? Before/after" |
| Aug | Late-winter upgrades | "Condensation, mould and cold glass: fixes" |
| Sep | Spring renos | "Retrofit for Melbourne period homes" |
| Oct | Building trends | "What NCC 2025 means for Melbourne windows" |
| Nov | Pre-summer, bushfire/UV | "West-facing rooms and bushfire zones" |
| Dec | Year-end, noise | "Quiet Christmas: reclaim your home from noise" |

Cadence: 2-3 substantial pieces per month. Repurpose into FAQs, social, email.

## Video strategy (5-10 cornerstone videos)

1. Melbourne retrofit explainer (how it works)
2. Installation time-lapse
3. Before/after noise demo (with dB readings)
4. Myth-busting: "5 things glazing salespeople won't tell you"
5. 2-3 customer testimonial interviews
6. "Double glazing in summer vs winter" climate explainer

Embed on core landing pages. Keep under 5 minutes. Heavily localised to Melbourne.

## Top 30 AU questions to target

1. What is double glazing and how does it work?
2. How much do double glazed windows cost in Melbourne?
3. Is double glazing worth it in Australia's climate?
4. How much can double glazing save on energy bills?
5. Does double glazing reduce noise and by how much?
6. What is retrofit double glazing?
7. Is retrofit as good as new double glazed windows?
8. Difference between double glazing and secondary glazing?
9. How long do double glazed windows last?
10. Why is double glazing so expensive in Australia?
11. Pros and cons of uPVC vs aluminium vs timber frames?
12. Can I retrofit into existing timber windows?
13. How do I know if my windows are already double glazed?
14. Does double glazing help in summer or only winter?
15. Can double glazing stop condensation and mould?
16. What maintenance do double glazed windows need?
17. Does double glazing increase home value?
18. What is Low-E glass and do I need it?
19. How big should the air gap be?
20. What warranties should I expect?
21. Can you double glaze heritage homes without changing the look?
22. Is DIY double glazing a good idea?
23. Are there government rebates in Victoria?
24. Double glazing vs Low-E single glazing?
25. How much does retrofit cost per window / per m²?
26. How disruptive is installation?
27. Will double glazing make my home too airtight?
28. Can double glazing help with bushfire / BAL ratings?
29. Who is the best double glazing company in Melbourne?
30. What should I ask before signing a contract?
