export const energyFaq = [
  {
    q: 'What U-value should I aim for in Melbourne?',
    a: "Melbourne's climate zone (zone 6) benefits most from U-values below 2.0 W/m²K. Standard double glazing (U 2.7) is a meaningful improvement over single pane (U 5.8) but Tinted Low-E (U 1.8) is the sweet spot for Melbourne — you get 69% less heat loss than single glazing at a modest premium over standard double. Triple glazed (U 1.0) is warranted if you're in the Dandenong Ranges or running a high-efficiency home with a building envelope to match.",
  },
  {
    q: 'What is Low-E glass and how does it work?',
    a: "Low-E (low emissivity) glass has a microscopically thin metallic oxide coating applied to the inner face of the outer pane. This coating reflects long-wave infrared radiation — the heat radiating from warm surfaces — back into the room in winter, and reflects solar infrared back out in summer. The result: heat stays on the side of the glass where you want it. The coating is invisible to the eye and doesn't affect natural light transmission.",
  },
  {
    q: "What's the difference between U-value and SHGC?",
    a: "U-value measures how much heat conducts through the glass (in either direction) — lower is better. Solar Heat Gain Coefficient (SHGC) measures how much solar radiation passes through the glass — lower blocks more solar heat, which is usually what you want in west-facing or north-facing rooms. Low-E double glazing optimises both: U 1.8 and SHGC around 0.32, versus single pane at U 5.8 and SHGC 0.86. For south-facing rooms in Melbourne where passive solar gain is desirable in winter, a higher SHGC may be preferable — we can advise per elevation.",
  },
  {
    q: 'How much will energy efficient glazing reduce my heating and cooling bills?',
    a: "Our customer survey data shows 35–42% reduction in quarterly energy bills for Melbourne homes that replace all windows. Individual results depend on how much of your current heat loss is through glass (typically 40% in a poorly insulated home) versus ceiling and walls. The improvement is most dramatic in homes with large north or west-facing window areas, older single-pane sashes with no sealing, and those using electric resistance heating rather than a heat pump.",
  },
  {
    q: 'Is argon gas fill necessary, or is air sufficient?',
    a: "Argon fill improves the U-value of a standard double-glazed unit from roughly 2.8 (air-filled) to 2.7 (argon-filled) — a marginal improvement. The meaningful gains come from the Low-E coating, not the gas fill. All our standard units include argon as default because the cost difference is negligible at manufacturing stage. If you're specifying triple glazing, krypton fill can push the U-value to 0.7, which is worth discussing for whole-house passive-house level projects.",
  },
  {
    q: 'Which window orientation benefits most from Low-E glazing?',
    a: "West-facing windows benefit most from Low-E in Melbourne — afternoon summer sun at low angles drives extreme heat load into rooms that are already warm. North-facing windows also benefit in summer but ideally with a slightly higher SHGC to retain passive solar gain in winter. South-facing windows lose heat year-round with minimal solar gain, making U-value the dominant consideration — standard Low-E double glazing handles this well. East-facing windows are moderate; Low-E adds comfort without being critical.",
  },
  {
    q: 'Is energy efficient double glazing eligible for VEU rebates?',
    a: "Yes. Retrofit double glazing with a qualifying U-value qualifies for the Victorian Energy Upgrades program. Tinted Low-E (U 1.8) and Triple Glazed (U 1.0) both meet the threshold. The rebate is calculated per unit of energy saved and typically offsets $300–$900 on a standard Melbourne home. We manage the registration and paperwork — you receive a reduced invoice rather than a rebate you lodge separately.",
  },
  {
    q: "Will double glazing eliminate condensation on my windows?",
    a: "Yes — for interior condensation. Condensation forms when warm, moist interior air contacts a cold surface. Single-pane glass in Melbourne winter can reach 4–6°C, well below the indoor dew point. Double glazing with Low-E keeps the interior glass surface at 14–18°C in the same conditions, above the dew point. Interior condensation stops. Exterior condensation (on the outer pane on clear winter mornings) can actually increase slightly with energy efficient glass — because the outer pane stays colder than before. This is normal and indicates the glass is working.",
  },
  {
    q: "How does triple glazing compare to Low-E double for Melbourne's climate?",
    a: "For most Melbourne homes, Low-E double glazing (U 1.8) captures 85–90% of the energy benefit of triple glazing (U 1.0) at roughly 65% of the cost. Triple glazing makes strong economic sense if you're building or renovating to a 7+ NatHERS star target, if you have a very large glass area, or if your home is in the Hills or Yarra Ranges where heating degree days are significantly higher than metropolitan Melbourne. For inner and middle suburbs, Low-E double is the right call on ROI.",
  },
  {
    q: 'How long before energy efficient windows pay for themselves?',
    a: "For a typical Melbourne home installing Tinted Low-E double glazing: the energy saving is $150–$200 per quarter on average, giving a payback period of 5–7 years on the net-of-rebate cost. Triple glazing typically runs 8–10 years to payback on energy savings alone. Both figures improve if energy prices rise (which they have consistently) and if you account for comfort value and resale premium — Victorian property research consistently shows double glazing adds more than its installed cost to assessed property value in inner and middle suburbs.",
  },
] as const

export type EnergyFaqItem = (typeof energyFaq)[number]
