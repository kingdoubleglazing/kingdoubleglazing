export const retrofitFaq = [
  {
    q: 'What exactly is retrofit double glazing?',
    a: 'Retrofit double glazing replaces only the glass unit inside your existing window frame — the timber or aluminium surround stays in place. A glazier removes the original single-pane glass and installs a sealed, factory-made double-glazed unit (two panes of glass separated by an inert gas cavity) in its place. You get the full thermal and acoustic benefit of double glazing without touching the frame, architraves, or surrounding wall.',
  },
  {
    q: 'Can any window be retrofitted?',
    a: 'Most standard timber and aluminium frames in Melbourne homes are suitable, provided the rebate (the groove the glass sits in) is deep enough to accept a double-glazed unit — typically 28–36 mm. Casement, awning, sliding, and fixed windows are all compatible. Very thin heritage sashes may need a slightly thinner unit; our technician confirms suitability at measure-up.',
  },
  {
    q: 'How long does installation take?',
    a: 'A standard Melbourne home with 8–14 windows is typically completed in one day. We remove the old glass, install the new double-glazed units, re-seal, and clean up before we leave. There is no structural work and no plaster damage.',
  },
  {
    q: 'Will the windows look different from the outside?',
    a: 'No. The frame stays identical. From street level — and from inside — retrofitted windows are visually indistinguishable from the originals. The only change visible if you look closely is a small aluminium or warm-edge spacer bar around the glass perimeter, which is recessed into the rebate.',
  },
  {
    q: 'Is retrofit double glazing eligible for Victorian government rebates?',
    a: 'Yes. Retrofit double glazing qualifies for the Victorian Energy Upgrades (VEU) program. Depending on your home\'s heating zone and the glass specification chosen, the rebate can offset $300–$900 per typical home. We handle the paperwork — you just sign.',
  },
  {
    q: 'How does the thermal performance compare to full window replacement?',
    a: 'Identically, glass for glass. Both retrofit and full-replacement windows use the same factory-sealed double-glazed units. The U-value and SHGC of the glass — which determine thermal performance — are set by the glass specification, not by the frame type. You get the same Low-E coating, the same gas fill, the same spacer, and the same performance at roughly half the price.',
  },
  {
    q: 'What U-value and acoustic rating can I expect?',
    a: 'U-value depends on the glass tier you choose: standard clear double glazing achieves around 2.0 W/m²K; Low-E double glazing reaches 1.1–1.4 W/m²K; triple glazing can reach 0.8 W/m²K. Acoustic Rw ratings range from 32 dB (clear double) to 52 dB (laminated acoustic). Our glass options page shows the full specs for each tier.',
  },
  {
    q: 'Can I retrofit heritage or period windows?',
    a: 'Yes — this is one of retrofit\'s main advantages over full replacement. Because the original frame is preserved, most heritage overlay overlays and council requirements are unaffected. We regularly work on Victorian and Edwardian timber sashes across inner Melbourne suburbs. If your property is on the Heritage Overlay we recommend confirming with your council first, but in almost all cases retrofit glazing is permitted without a planning permit.',
  },
  {
    q: 'How much noise reduction will I actually notice?',
    a: 'Objectively: our standard laminated acoustic unit achieves Rw 38, cutting perceived loudness by roughly half compared to a single-pane window (Rw 26). In practice, customers near tram lines or arterial roads describe the difference as "dramatic" — the low-frequency rumble that travels through single glazing is the first thing to disappear. Acoustic laminated glass performs significantly better than standard double glazing for noise.',
  },
  {
    q: 'What warranty do you provide?',
    a: 'King provides a 10-year written warranty covering the sealed glass unit (against seal failure and fogging), the installation workmanship, and all associated hardware. The warranty is transferable to a new owner if you sell your home. Glass breakage is not covered — that is covered under your building insurance.',
  },
] as const

export type RetrofitFaqItem = (typeof retrofitFaq)[number]
