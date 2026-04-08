export const heritageFaq = [
  {
    q: 'Can I double glaze heritage windows without council approval?',
    a: "In almost all cases, yes. A glass-only retrofit — where the existing frame is kept and only the glazing is replaced — is classified as maintenance, not alteration, under most Victorian Heritage Overlays. Planning permits are not required because the fabric of the building (frame, reveals, architraves) is unchanged. Full window replacement, by contrast, does require a permit in most heritage zones because the frames form part of the assessed character. This is the single biggest practical advantage of retrofit for period homes.",
  },
  {
    q: 'Will double glazing change how my windows look from the street?',
    a: "No. The frame, glazing bars, sash profiles, and reveals are all unchanged. The only internal difference is a small aluminium or warm-edge spacer bar around the glass perimeter — recessed into the rebate and invisible from street level. Heritage officers who have inspected completed King retrofit jobs have found no grounds for objection. If your council requires written confirmation, we can provide a statement of works for your records.",
  },
  {
    q: 'Is retrofit glazing suitable for Victorian and Edwardian timber sashes?',
    a: "Yes — these are the most common heritage homes we work on in Melbourne's inner suburbs. The retrofit method suits double-hung sash windows, casement windows, and fixed lights equally. Sash windows require the glazing rebate to be at least 28 mm deep; most pre-1940 Victorian and Edwardian sashes are 32–42 mm, giving ample room. Our technician checks rebate depth at measure-up and confirms suitability before any glass is ordered.",
  },
  {
    q: 'My frames are in poor condition — can they still be retrofitted?',
    a: "It depends on the extent. Surface paint deterioration, minor weathering, and old putty glazing are not problems — we clean the rebate and re-bed the unit in the appropriate compound. Active rot that has compromised the structural integrity of the sash stile or rail is a problem: a double-glazed unit (which is heavier than the original pane) needs a sound frame to sit in. We assess frame condition honestly at measure-up. If repair is needed first, we can refer you to a heritage joiner before proceeding.",
  },
  {
    q: 'What heritage overlays apply in Melbourne and how do they affect this work?',
    a: "The main control is the Heritage Overlay (HO), which applies to approximately 44,000 properties in metropolitan Melbourne. A few inner suburbs also apply the Significant Landscape Overlay (SLO) to garden plantings, which does not affect windows. Under the HO, internal alterations (including glass replacement where the frame is unchanged) are exempt from the permit requirement under Clause 43.01-2 of the Victorian Planning Provisions. If you are on the Victorian Heritage Register (a small subset of HO properties), a higher level of scrutiny applies — we advise you to confirm directly with Heritage Victoria, and we can assist with documentation.",
  },
  {
    q: 'Do I need a heritage consultant before I proceed?',
    a: "For a standard Heritage Overlay property where you are doing a glass-only retrofit: no. The work is permit-exempt and does not require a heritage assessment. If you are on the Victorian Heritage Register, or if your council has raised specific concerns about previous works on the property, a brief heritage consultant letter of support (typically $300–$600 from a registered heritage advisor) provides additional cover. We can flag this at enquiry stage based on your address.",
  },
  {
    q: 'Can you retrofit double-hung sash windows — the kind that slide up and down?',
    a: "Yes. Double-hung sash windows are the most common window type in Melbourne heritage homes and the majority of our heritage retrofit work. Each sash is removed individually, the single pane is replaced with a double-glazed unit, and the sash is re-hung. The counterweight mechanism is adjusted if required by the increased weight of the double-glazed unit. The window operates identically after installation — it slides, locks, and ventilates the same way.",
  },
  {
    q: "Will the heavier double-glazed unit affect how my sash windows operate?",
    a: "A standard 24 mm double-glazed unit weighs approximately 60% more than the equivalent single pane. For cord-and-weight sash windows (pre-1950 construction), we re-balance the counterweights to match the new glass weight — this is included in the installation. For spring-balance sashes (post-1950 renovation), we adjust the balance tension. In both cases, the window should operate with the same effort as before after re-balancing. If a sash mechanism is already faulty, we flag it before installation.",
  },
  {
    q: 'What documentation can you provide if my council asks questions?',
    a: "We provide a written statement of works confirming the scope (glass replacement only, no frame alteration), the glass specification, and the installation method. This is sufficient for the large majority of Heritage Overlay enquiries. For properties where a council officer has formally requested documentation, we can also provide product data sheets and photographic evidence of the completed installation showing the unchanged frame.",
  },
  {
    q: 'Is the price the same for heritage homes as standard properties?',
    a: "Yes — from $495/m² for standard clear double glazing, regardless of whether your home has a Heritage Overlay. The only scenario where heritage adds cost is if your frames require joinery repair before the glass can be installed (not our work — referred out) or if scaffolding is required for upper-storey windows with no external access. Both are identified and quoted separately before any work begins.",
  },
] as const

export type HeritageFaqItem = (typeof heritageFaq)[number]
