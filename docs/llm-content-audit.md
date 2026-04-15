# LLM/AI Search Content Audit

Generated: 2026-04-15. Audits answer-first content quality for AI Overview / Perplexity / ChatGPT citation suitability.

---

### Homepage — `/`

**H1:** "Stop Overpaying for Double Glazing." (split across two spans in HeroSection — headlineWhite + headlineYellow)
**First paragraph word count:** 46 words
**Answer-first?** Yes — immediately states the value proposition: "We upgrade your existing windows with a second layer of glass. Up to 70% quieter. Up to 50% warmer. Half the price of full replacement."
**H2 headings found:** "Get Your Price in 60 Seconds.", "We're glaziers. We do the lot."
**Recommendation:** Strong. Add "retrofit double glazing Melbourne" verbatim in the first paragraph or subtext — currently describes the product without naming it explicitly, which limits citation matching for that query.

---

### Services — `/services/`

**H1:** "One Team. Every Job."
**First paragraph word count:** 42 words
**Answer-first?** Partially — the opening paragraph describes the business but doesn't lead with a direct answer to "what is this page?" or "what is retrofit double glazing?". The content is descriptive but not definitional.
**H2 headings found:** "Retrofit Double Glazing", "Emergency Glass Repair", "Shower Screens", "Kitchen Glass Splashbacks", "Custom Mirrors", "Commercial Glazing", "Service Questions"
**Recommendation:** H1 is too generic for LLM citation. Consider updating H1 to include a primary keyword (e.g., "Glazing Services Melbourne" or "Retrofit Double Glazing & More"). Add a one-sentence definition of retrofit double glazing in the first visible paragraph.

---

### About — `/about/`

**H1:** "Built by a Family of Melbourne Glaziers"
**First paragraph word count:** 33 words
**Answer-first?** Partially — focuses on Tas Markou's background rather than answering "what is King Double Glazing?" or "why choose them?". Good for E-E-A-T signals but not answer-first.
**H2 headings found:** "Stop. Don't Overpay." (origin story section), "What We Guarantee"
**Recommendation:** Prepend a one-sentence entity statement to the first paragraph: "King Double Glazing is a Melbourne-based retrofit double glazing company founded by Tas Markou." This gives LLMs a clean entity definition to cite.

---

### Contact — `/contact/`

**H1:** "Get a Quote. No Pressure."
**First paragraph word count:** 27 words
**Answer-first?** Yes — immediately tells users how to act and sets expectations ("we respond within one business day").
**H2 headings found:** "Send It In. We'll Beat It By 30%.", "Send Us a Message", "Common Questions", "Want the Number First?"
**Recommendation:** Good answer-first structure. Add "Melbourne" and "double glazing" in the first paragraph to reinforce geo/topic relevance for queries like "how do I contact a Melbourne double glazing company".

---

### Instant Estimate — `/instant-estimate/`

**Status:** Not audited (tool/calculator page — different optimisation priorities).

---

## Cross-page observations

| Signal | Status |
|---|---|
| Primary keyword in first 100 words | Homepage ✓, Services needs improvement, About partial |
| "Melbourne" in first paragraph | Homepage ✓, Services ✓, About ✓, Contact ✗ |
| Direct entity definition on about page | Missing — add one sentence |
| FAQ content with question/answer pairs | Homepage ✓, Services ✓, Contact ✓, About ✓ (guarantees) |
| Consistent 30% quote-beat claim phrasing | ✓ (uses "genuine, like-for-like" qualifier throughout) |
| Warranty stated consistently | ✓ (10-year everywhere) |
