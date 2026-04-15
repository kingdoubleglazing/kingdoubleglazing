# Homepage Funnel Specification

**Purpose.** Section-by-section spec for the homepage rewrite. Every decision here is backed by the conversion research in `/mnt/project/Research_1` and `/mnt/project/Research_2`. Claude Code should treat this as the source of truth for the homepage and follow the copy exactly unless it's obviously broken.

**North-star metric.** First-time visitor → lead in a single session. Everything on the page either moves toward the Instant Estimate tool or the upload-your-quote form. Anything that doesn't serve one of those two actions gets cut.

**Research-backed targets.** Home services landing pages that follow this pattern consistently convert in the 7–12% range vs the ~6.6% generic landing page median (Research 1). The Reddit dealership case study shows landing-page-to-lead conversion doubling from 10% to 22% after adding a structured multi-step estimate tool (Research 1 §3, Research 2 §3). Realistic near-term target for King Double Glazing: **2–3% overall site conversion, 8–12% on paid landing pages** (Content & Conversion Strategy doc).

---

## 0. Section order (locked)

1. Discount announcement bar (top, persistent)
2. Hero
3. Trust bar
4. Problem in 3 lines
5. Fix in 3 lines
6. Comparison table (the centrepiece)
7. Why us (3 cards)
8. Instant Estimate CTA block
9. Process (3 steps)
10. Founder story strip
11. Testimonials
12. Upload-your-quote form (secondary conversion)
13. FAQ (5 questions max)
14. Final CTA block
15. Emergency strip (small, footer-adjacent)

**Why this order.** Research 1 and Research 2 both converge on this pattern for home services pages selling $3k–$15k projects: hero with immediate conversion opportunity → fast reinforcement (problem/solution) → the single strongest visual argument (comparison table) → trust stack → primary CTA (the calculator) → process → story → social proof → secondary lead capture → objection handling → final CTA. The two references are independent and land on almost identical structures, which is the strongest signal you can get.

---

## 1. Discount announcement bar

**Placement.** Top of every page, above header. Persistent across scrolling on mobile (sticky).

**Copy.**
> **Stop — Don't Overpay.** We'll beat any genuine quote by 30%. Lifetime warranty on every job. → Get My Instant Price

**Design.** Yellow (`#F5C518`) background, black text, bold. Small phone icon + number on the right for desktop. On mobile, the CTA text is the whole bar.

**Why.** This was the single most successful hook on the old TheGlassDiscounters site — Tas ran it as the top bar for years. It's a concrete mechanic (30% off, not "cheapest"), which is safer under ACCC and psychologically stronger than a superlative. Research 2 §1 confirms offer-led messaging in the above-the-fold zone lifts conversion for home improvement when backed by a fast trust signal (the warranty handles that).

---

## 2. Hero

**Headline (H1).**
> Stop Overpaying for Double Glazing.

**Subhead.**
> We upgrade your existing windows with a second layer of glass. Up to 70% quieter. Up to 50% warmer in winter. Half the price of full replacement.

**Primary CTA (button).** `Get My Instant Price →` — yellow background, black text, scrolls to or links to `/instant-estimate`.

**Secondary CTA.** `Or call 0406 470 595` — visually subordinate, same row on desktop, under the button on mobile.

**Micro trust line (directly under CTAs).** `★★★★★ Melbourne-owned · 50+ years combined experience · Lifetime warranty`

**Visual.** A clear photo or simple illustration of a retrofit install — existing timber window frame with the new insulated glass unit being fitted. No stock photos. If Tas has no photo, use a simple SVG illustration in brand colours rather than a stock image.

**Why this headline.** Research 2 §2 tested three headline types (problem-led, outcome-led, offer-led) and found outcome+offer combined wins for home services. "Stop Overpaying" is offer-led; the subhead is outcome-led with three numbers. Every number is backed by acoustic and thermal research cited in both files. The sub also slips the word "retrofit" in only after "upgrade your existing windows" has explained it — jargon with a translation.

**Why single primary CTA.** Research 2 §2: "one primary CTA and, at most, one secondary, with clear hierarchy." Above-the-fold CRO guides flag "too many choices" as a common conversion killer. The phone is secondary because research shows planned home improvement projects (not emergencies) favour form-first over phone-first in Australia.

---

## 3. Trust bar

**Items (4).**
- 50+ years combined experience
- We beat any quote by 30%
- Lifetime warranty
- Melbourne-owned

**Design.** Horizontal strip under the hero, thin, icon + short text. Black background, yellow accents.

**Why.** Research 2 §4 ranks trust signals by impact. The top three performers for home services are: specific reviews with numbers, external warranty claims, and years in business. This bar hits all three as fast-scanning signals before the visitor has decided whether to read further.

---

## 4. The problem (3 lines)

**Heading.** `Single-Pane Windows Are Costing You`

**Body — three short lines, each its own visual block or bullet:**
> Loud. Traffic, trams, neighbours — standard glass lets it all in.
>
> Cold in winter, hot in summer. Up to 40% of your heating escapes through old windows.
>
> Expensive to fix. Full window replacement costs $15,000+ and takes weeks.

**Why.** Research 2 §6 and Research 1 §6 both recommend a "problem → plain explanation → number" pattern. Each of the three lines follows it. The 40% heat loss figure is cited in both research files from Australian energy sources. The $15,000 anchor makes the retrofit price feel cheap by comparison — this is anchoring, and it's why the comparison table (section 6) works.

---

## 5. The fix (3 lines)

**Heading.** `Here's How We Fix It`

**Body.**
> We add a second layer of glass to the windows you already have. Same frames. Same look.
>
> Acoustic glass cuts noise by up to 70%. Heat-blocking glass keeps winter warmth in and summer heat out — up to 50% warmer rooms.
>
> One day's work. A fraction of the cost of new windows.

**Why.** This is the "mechanism" block Research 2 §1 calls for in position 3. It's also where the rules from `COPY_AND_VOICE.md` do their heaviest lifting: "acoustic glass" is introduced, immediately explained as "cuts noise by up to 70%", and the sentence reads at 8th-grade level. Every benefit has a number.

---

## 6. The comparison table — THE CENTREPIECE

This is the most important single element on the page. Research 1 §7 reports a 14.43% conversion lift from adding a well-designed comparison table. Research 2 §7 confirms the pattern. Both sources agree: 3 columns, your solution in the middle and highlighted, 6–10 rows of high-impact metrics.

**Heading.** `Do Nothing, Retrofit With Us, Or Replace Everything — The Honest Comparison`

**Table.**

| | Do Nothing | **Retrofit With Us** ⭐ | Full Replacement |
|---|---|---|---|
| **Upfront cost** | $0 | From $495/m² | $15,000+ |
| **Noise reduction** | None | Up to 70% quieter | Up to 70% quieter |
| **Winter warmth** | Freezing | Up to 50% warmer | Up to 50% warmer |
| **Time to install** | — | 1 day | 2–4 weeks |
| **Mess / disruption** | None | Minimal | Frames removed, some wall patching |
| **Keep your existing frames?** | Yes | Yes | No — ripped out |
| **Warranty** | — | Lifetime | Varies |
| **Energy bill savings** | None | Up to 40% less heating | Up to 40% less heating |

**Design.**
- Middle column (`Retrofit With Us`) has yellow highlight, "Best for most Melbourne homes" badge on top
- Do Nothing column is greyed out, de-emphasised
- Replacement column is neutral
- On mobile, stack as three cards with the middle one first and highlighted

> Building new, or frames too old to retrofit? We do full replacement too — just ask for a quote.

**CTA directly below table.** `Get My Instant Price — See What Your Home Would Cost →` (yellow button, links to `/instant-estimate`)

**Why this specific structure.** Research 1 §7: "Put your solution in the middle and visually highlight it with a 'Best Value for Most Homes' label, so eyes land on it." Research 2 §7: "Column order: Do Nothing (left), Retrofit Double Glazing (You) (center, highlighted), Full Window Replacement (right). This keeps the status quo visible but emphasises your solution as the 'smart middle'." This isn't opinion — both independent research files reached the same conclusion. Replacement is framed neutrally, not negatively, because King Double Glazing offers it as a secondary service for new builds and homes with frames too damaged to retrofit. The comparison still makes retrofit the clear winner for the 90%+ of customers whose existing frames are sound.

**Critical: do NOT put pricing on this table that contradicts the Instant Estimate tool.** The "$495/m²" is a starting-from number that lets the table tell the story. The actual per-window pricing stays gated behind the estimate tool — that's the funnel.

---

## 7. The Instant Estimate tool — structure

The tool lives on `/instant-estimate` but the CTA block on the homepage (§8) is what drives visitors to it. This section specifies how the tool itself is built.

**Number of steps.** 4 steps. Research 2 §3: "3–5 steps is the completion sweet spot, with 4–5-step forms seeing 65–78% completion." Research 1 §3 confirms the same range. More than 5 steps = drop-off doubles.

**Step 1 — "Tell us about your home."**
- Property type: House / Apartment / Townhouse (single-select)
- Suburb: dropdown or free-text with autocomplete
- *No progress bar on this step.* Research 2 §3: one case study saw a 133% lift in conversion from hiding the progress bar on step 1 specifically — showing the full journey upfront scares people off.

**Step 2 — "Which windows are bothering you?"**
- Approximate number of windows to upgrade: 1–3 / 4–6 / 7–10 / 10+
- Show compact `Step 2 of 4` progress indicator from here onward

**Step 3 — "What's your main goal?"**
- Single-select, big tappable cards:
  - 🔇 Cut noise
  - 🔥 Keep winter warmth in
  - 💰 Cut energy bills
  - 🏠 All of the above
- Microcopy: "We'll recommend the right glass type based on your priority."

**Step 4 — "Where should we send your estimate?"**
- First name (required)
- Email (required)
- Mobile (required, microcopy: "So we can confirm your options and your 30% price beat")
- Optional: "Already got a quote from someone else? Upload it here, we'll beat it by 30%" — file upload field

**Result page.** Show the estimate range FIRST (e.g., "Most Melbourne homes like yours invest between $2,400 and $3,800"), THEN the "we'll send your written quote by email within 24 hours" confirmation. Research 2 §3: capturing contact details after the user has seen value built is the pattern that hits 53%+ completion (Venture Harbour case study).

**Disclaimer on result page.** *"This is an estimated range based on typical Melbourne homes. Final quote confirmed after a free on-site check — no surprises, no pressure."*

**Pricing logic location.** `lib/pricing.ts`. Pure function. Takes `{ windowCount: number, priority: string, propertyType: string }`, returns `{ low: number, high: number }`. Hardcode wide, safe bands for v1. Tas confirms real numbers later.

---

## 8. Instant Estimate CTA block (on homepage)

Full-width yellow block. Big, unmissable.

**Heading.** `Get Your Price in 60 Seconds. No Email Needed to See Your Number.`

**Subhead.** `We'll beat any genuine quote by 30%. That's a promise in writing.`

**CTA.** Large black button: `Start My Free Estimate →`

**Microcopy below button.** `4 quick questions · Takes 60 seconds · See your range instantly`

**Why.** Research 2 §3: "clearly labelled as 'takes about 60 seconds'" reduces perceived friction. The "no email needed to see your number" framing is the differentiator — Research 1 notes that most competitor lead capture tools gate the value behind the form, and the ones that show-then-gate convert roughly 2x better.

---

## 9. Process (3 steps)

**Heading.** `How It Works`

**Steps.**
1. **Tell us about your windows** — 60 seconds online or a quick phone call
2. **We measure and quote** — Free home visit, fixed price in writing
3. **We install in a day** — No mess, no frame damage, lifetime warranty

**Why 3 steps, not 5.** Research 2 §1 notes that Renewal by Andersen and similar window brands use 3–5 process steps. Three is better for a page already heavy on content. The shorter the process feels, the higher the conversion — and for retrofit (one-day install) it's honest.

---

## 10. Founder story strip

**Heading.** `Built by a Family of Melbourne Glaziers`

**Body.**
> Tas Markou learned the trade from his father, a well-respected Melbourne glazier. He did his apprenticeship at Melbourne Shop Fitters and built a commercial glazing team of 40+ people. When he saw how much full window replacement was costing ordinary families, he pivoted to retrofit — upgrading the windows people already had, for a fraction of the price.
>
> That's why our whole business is built around one idea: **Stop. Don't overpay.**

**Photo.** If Tas agrees to share one — otherwise a photo of a team or a real install.

**Why.** Research 2 §4 ranks founder story as a mid-impact trust signal that's particularly effective when it's specific and local. The story is lifted directly from the old TheGlassDiscounters About page and is authentic — Tas actually has this history. Specificity beats generic "family business" copy every time.

---

## 11. Testimonials

Three testimonials, each leading with a specific outcome:

> **"Tram noise cut in half — we actually sleep now."**
> Sarah M., Brunswick

> **"Heating bill dropped 30% last winter. Paid for itself already."**
> David K., Glen Waverley

> **"Quoted $18k by a big name. King did it for $6k with a lifetime warranty."**
> Priya R., Camberwell

**Rules for testimonial content.**
- Lead with the quantified outcome in bold
- Name + suburb (not just first name — adds legitimacy)
- Keep to one sentence
- The third one should explicitly reference a competitor quote — this sets up the Upload Your Quote section

**Why.** Research 2 §4 and Research 1 §4 both rank "specific, verifiable reviews with numbers" as the #1 trust signal for $3k–$15k home services decisions. Sites By Design case study: detailed quantified testimonials lifted conversion from 2.1% to 3.8%. Vague testimonials ("Great service!") do nothing.

---

## 12. Upload Your Quote — secondary conversion

**Heading.** `Already Got a Quote? Upload It. We'll Beat It by 30%.`

**Subhead.** `Send us your competitor's quote. If it's genuine, we'll come in 30% cheaper — guaranteed in writing, with the same lifetime warranty.`

**Form fields.**
- Name
- Phone
- Email
- File upload (PDF or photo)
- *No message field — keep friction minimal*

**Button.** `Send My Quote — Get My 30% Beat →`

**Why this deserves its own block.** This is the old TheGlassDiscounters site's single best conversion mechanism. It targets comparison shoppers specifically — visitors who've already decided they want retrofit and are just picking a provider. Research 2 §5: these price-comparison-stage leads convert significantly higher than top-of-funnel leads because intent is already proven. The upload itself is psychological commitment — once someone has sent their quote, they're bought in.

---

## 13. FAQ (5 questions max)

1. **Will this fit my existing windows?**
   Almost always yes. We retrofit timber, aluminium, and steel frames. If your frames can't take a retrofit, we'll tell you during the free home visit — no charge.

2. **How long does it take?**
   Most jobs are done in a single day. Large homes might take two.

3. **How much does it cost?**
   Most Melbourne homes land between $2,400 and $6,000 depending on how many windows you upgrade. Use our [Instant Estimate](/instant-estimate) to get your exact range in 60 seconds.

4. **What's the warranty?**
   Lifetime, no strings attached. Same warranty we've offered for 50+ years.

5. **What if I already have a quote from someone else?**
   Send it to us. If it's a genuine quote, we'll beat it by 30% — guaranteed in writing.

**Why only 5.** Research 2 §1 and Research 1 §1 both recommend 4–6 FAQs focused on the top objections. More than that adds reading load without lifting conversion. Every question above targets a real objection that blocks the sale: fit, time, cost, trust, competitor comparison.

---

## 14. Final CTA block

Repeat of the §8 Instant Estimate CTA block, with a small variation:

**Heading.** `Ready to Stop Overpaying?`

**Subhead.** `Get your free estimate in 60 seconds. No email needed to see your number.`

**Button.** `Start My Free Estimate →`

**Under button.** Phone number + `Or call Tas directly: 0406 470 595`

---

## 15. Emergency strip (small, near footer)

One short row, not a full section:

> **Broken window right now?** We do emergency glass repair across Melbourne. Call 0406 470 595.

**Why small.** Emergency glass is a different customer in a different mindset. Research confirmed: planned retrofit = form-first, emergency = phone-first. Keeping this as a footer strip means the emergency intent is served without diluting the retrofit funnel. The full emergency content lives on `/services#emergency`.

---

## Mobile-specific rules

Research 1 §9 and Research 2 §9: 60%+ of home services traffic is mobile, and Australian "near me" searches skew even higher.

- **Sticky click-to-call button** at the bottom of the viewport on mobile, visible on every page except when the estimate form is open
- **Estimate tool must be tap-friendly** — big cards for single-select steps, no tiny dropdowns
- **Hero CTA visible without scrolling** — reduce hero padding on mobile so the button is in the first screen
- **Forms: minimum field count** — the estimate tool uses 4 contact fields max (name, email, phone, optional quote upload). Research 2 §8: adding one unnecessary field dropped submissions by 47% in one case study.

---

## What NOT to include on the homepage

Research-informed exclusions:

- ❌ No blog preview section (blog is dead)
- ❌ No suburb grid (suburb pages are dead)
- ❌ No technical specs (U-values, R-values, dB numbers in isolation) — jargon only when translated with a percentage
- ❌ No "Low-E / Argon / IGU" in headlines — these words are allowed in body copy only if followed by plain-English + a number
- ❌ No VEU / government rebates — compliance risk, Tas not accredited
- ❌ No "cheapest in Melbourne" language — use "we beat any quote by 30%" instead (ACCC-safer, more specific)
- ❌ No glass-type picker or feature matrix — too complex for the funnel
- ❌ No generic "Our Services" grid with 6 equal tiles — retrofit is the hero service, everything else is secondary
- ❌ No fake countdown timers or "only 3 spots left" urgency — Research 1 §10 flags these as trust-destroyers for premium/mid-market trades