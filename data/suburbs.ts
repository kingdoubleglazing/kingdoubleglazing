export interface SuburbData {
  name: string
  slug: string
  postcode: string
  region: string
  /** 2–3 suburb-specific sentences for the SuburbIntro section and SEO copy. */
  intro: string
  /** Local landmark, street or feature used as a relevance signal. */
  landmark: string
}

export const suburbs: SuburbData[] = [
  {
    name: 'Balwyn',
    slug: 'balwyn',
    postcode: '3103',
    region: 'Inner East',
    intro:
      "Balwyn's leafy streets are lined with substantial Victorian and Edwardian brick homes — many under Heritage Overlay. Retrofit double glazing gives these period properties modern thermal performance without altering their street appearance or requiring a planning permit.",
    landmark: 'Balwyn Park and deep heritage precincts',
  },
  {
    name: 'Balwyn North',
    slug: 'balwyn-north',
    postcode: '3104',
    region: 'Inner East',
    intro:
      "Balwyn North's large post-war homes on generous blocks have a reputation for quality, but their original single-pane windows are no match for Melbourne's cold snaps. Retrofitting to double-glazed units brings insulation up to modern standards in a single day — no structural work, no mess.",
    landmark: 'Balwyn North Shopping Centre and Koonung Creek Trail',
  },
  {
    name: 'Box Hill',
    slug: 'box-hill',
    postcode: '3128',
    region: 'Inner East',
    intro:
      'Box Hill sits at the junction of the Belgrave and Lilydale rail lines and several major bus routes, meaning rail and road noise is a genuine daily annoyance for nearby residents. Acoustic laminated double glazing cuts the low-frequency rumble that single-pane glass lets straight through.',
    landmark: 'Box Hill Central and the Belgrave/Lilydale rail interchange',
  },
  {
    name: 'Brighton',
    slug: 'brighton',
    postcode: '3186',
    region: 'Bayside',
    intro:
      "Brighton's large homes face a swing between searing summer afternoons and cold, damp winters off Port Phillip Bay — both of which erode energy efficiency in properties with ageing single-pane windows. Low-E double glazing manages summer heat gain while cutting winter heat loss, reducing the load on air conditioning and heating alike.",
    landmark: 'Brighton Beach bathing boxes and Church Street retail strip',
  },
  {
    name: 'Burwood',
    slug: 'burwood',
    postcode: '3125',
    region: 'Inner East',
    intro:
      "Burwood's mix of 1960s brick veneer and period homes loses heat rapidly in winter through original single-glazed windows. A retrofit installation — typically completed in one day — can cut heat loss through glass by up to 60% without any structural work or permits.",
    landmark: 'Deakin University Burwood Campus and Burwood Highway',
  },
  {
    name: 'Camberwell',
    slug: 'camberwell',
    postcode: '3124',
    region: 'Inner East',
    intro:
      "Camberwell has one of Melbourne's most significant Heritage Overlay precincts, covering its Victorian and Edwardian streetscapes — and Camberwell Road carries tram and bus noise into period homes all day. Retrofit double glazing preserves the original frames entirely, making it both permit-free on heritage properties and effective against street noise.",
    landmark: 'Camberwell Junction and the Burke Road tram corridor',
  },
  {
    name: 'Canterbury',
    slug: 'canterbury',
    postcode: '3126',
    region: 'Inner East',
    intro:
      "Canterbury's prestigious Edwardian and inter-war homes command some of Melbourne's highest prices, yet most still carry single glazing that leaks heat and lets in street noise. Retrofit double glazing is the glass-only upgrade that brings performance up to the standard the homes themselves deserve — without touching heritage fabric.",
    landmark: 'Canterbury Road heritage precinct and the Maranoa Gardens',
  },
  {
    name: 'Caulfield',
    slug: 'caulfield',
    postcode: '3162',
    region: 'Bayside',
    intro:
      'Caulfield sits near two of Melbourne\'s busiest racing precincts and the Caulfield station corridor, making noise a practical priority for residents of the suburb\'s Art Deco and period homes. Acoustic laminated IGUs installed in existing frames deliver Rw 38+ ratings — a meaningful improvement over standard double glazing for tram and rail noise.',
    landmark: 'Caulfield Racecourse and the Caulfield station precinct',
  },
  {
    name: 'Doncaster',
    slug: 'doncaster',
    postcode: '3108',
    region: 'Outer East',
    intro:
      "Doncaster's suburban homes sit within earshot of the Eastern Freeway corridor, where traffic noise travels well beyond the visible lanes. Laminated acoustic double glazing can reduce that persistent freeway rumble by more than half, improving bedroom and living-room comfort without touching the exterior of the property.",
    landmark: 'Westfield Doncaster and the Eastern Freeway corridor',
  },
  {
    name: 'Eltham',
    slug: 'eltham',
    postcode: '3095',
    region: 'Outer East',
    intro:
      "Eltham's semi-rural setting means cooler overnight temperatures than most inner suburbs, yet many of its character homes — including timber and mudbrick constructions — still rely on single-pane glass. Retrofitting eliminates the condensation and draught problems that accelerate mould and heat loss in these distinctive properties.",
    landmark: 'Eltham township and the Nillumbik Green Wedge',
  },
  {
    name: 'Fitzroy',
    slug: 'fitzroy',
    postcode: '3065',
    region: 'Inner North',
    intro:
      "Fitzroy has Melbourne's highest tram network density, and its Victorian terrace houses conduct street noise directly into living spaces through thin single-pane windows. Acoustic laminated double glazing is consistently the highest-impact upgrade for Fitzroy residents — cutting tram bell and road noise in glass that installs into original timber sashes without altering the facade.",
    landmark: 'Smith Street tram corridor and Brunswick Street',
  },
  {
    name: 'Glen Iris',
    slug: 'glen-iris',
    postcode: '3146',
    region: 'Inner East',
    intro:
      "Glen Iris blends one of Melbourne's best-preserved Victorian streetscapes with genuine demand for 21st-century comfort — a combination that makes retrofit double glazing the right fit over full window replacement. The glass-only upgrade is typically permit-free on heritage-listed properties and works within the original timber frames that define the suburb's character.",
    landmark: 'Gardiner Creek Trail and the High Street tram route',
  },
  {
    name: 'Glen Waverley',
    slug: 'glen-waverley',
    postcode: '3150',
    region: 'Outer East',
    intro:
      "Glen Waverley winters are reliably cold, and the suburb's large stock of 1970s brick-veneer homes — built to the energy norms of that era — loses heat quickly through single-pane windows. Adding Low-E double-glazed units into existing frames cuts thermal loss through glass by up to 60% and is typically recovered through energy bills within five to seven years.",
    landmark: 'The Glen shopping centre and Syndal station',
  },
  {
    name: 'Hawthorn',
    slug: 'hawthorn',
    postcode: '3122',
    region: 'Inner East',
    intro:
      "Hawthorn's Victorian terraces and Edwardian homes line streets served by some of Melbourne's busiest tram routes on Glenferrie and Burwood Roads — meaning noise and energy performance are upgrade priorities simultaneously. Retrofit double glazing addresses both in a single visit: acoustic laminated glass for street-facing rooms, Low-E units for south and west-facing aspects.",
    landmark: 'Glenferrie Road and the Hawthorn Football Club precinct',
  },
  {
    name: 'Kew',
    slug: 'kew',
    postcode: '3101',
    region: 'Inner East',
    intro:
      "Kew's large period homes — the majority under Heritage Overlay — represent a long-term investment in a suburb where streetscape integrity is actively enforced. Retrofit double glazing is the only glass upgrade that preserves those original frames exactly as they are while delivering a U-value of 1.1 W/m²K or better.",
    landmark: 'Kew Junction and the Yarra Bend parklands',
  },
  {
    name: 'Malvern',
    slug: 'malvern',
    postcode: '3144',
    region: 'Inner East',
    intro:
      "Malvern concentrates some of Melbourne's finest Victorian and Edwardian housing stock in a suburb where heritage precincts are strictly enforced — yet single-pane glass remains the norm in most period homes. Retrofit installs into the existing timber rebate, requiring no planning permit and leaving the exterior appearance completely unchanged from the street.",
    landmark: "Glenferrie Road boutiques and St Joseph's Church precinct",
  },
  {
    name: 'Mitcham',
    slug: 'mitcham',
    postcode: '3132',
    region: 'Outer East',
    intro:
      'Mitcham sits on the Belgrave and Lilydale rail corridors, and for homes near the station, train noise through single-pane windows is a recurring complaint. Acoustic laminated double-glazed units in existing frames deliver Rw 38+ performance — enough to reduce rail noise to a background murmur rather than a bedroom disturbance.',
    landmark: 'Mitcham station and Whitehorse Road',
  },
  {
    name: 'Mont Albert',
    slug: 'mont-albert',
    postcode: '3127',
    region: 'Inner East',
    intro:
      "Mont Albert's tightly held Victorian and Edwardian homes are among Melbourne's most sought-after, and the Union Road tram corridor runs directly through the suburb's residential spine. Retrofit double glazing lets homeowners address tram noise without the Heritage Overlay complications that full frame replacement would involve.",
    landmark: 'Union Road tram terminus and Mont Albert Reserve',
  },
  {
    name: 'Nunawading',
    slug: 'nunawading',
    postcode: '3131',
    region: 'Outer East',
    intro:
      "Nunawading's Whitehorse Road carries heavy through-traffic all day, making acoustic glazing an effective upgrade for homes within a few streets of the arterial. Acoustic laminated units — which include a PVB interlayer engineered for sound damping — cut perceived loudness by roughly half compared to single pane.",
    landmark: 'Whitehorse Road arterial and Nunawading station',
  },
  {
    name: 'Richmond',
    slug: 'richmond',
    postcode: '3121',
    region: 'Inner Melbourne',
    intro:
      "Richmond has some of the highest tram and road traffic volumes of any residential suburb in Melbourne — Swan Street, Bridge Road and Victoria Street all carry constant traffic past Victorian terrace houses with single-pane windows. Acoustic laminated double glazing consistently produces the most dramatic before-and-after noise results of any suburb we service.",
    landmark: 'Swan Street and the MCG precinct',
  },
  {
    name: 'Ringwood',
    slug: 'ringwood',
    postcode: '3134',
    region: 'Outer East',
    intro:
      'Ringwood is a major outer-east activity centre where the Belgrave and Lilydale lines converge, and arterial traffic on Maroondah Highway runs past residential streets. Double glazing retrofits address both train and road noise sources, and the suburb\'s mix of period and 1970s homes means both timber and aluminium frames are serviced regularly.',
    landmark: 'Ringwood station and Eastland Shopping Centre',
  },
  {
    name: 'South Yarra',
    slug: 'south-yarra',
    postcode: '3141',
    region: 'Inner South',
    intro:
      "South Yarra's Victorian terrace streets sit immediately behind Chapel Street's commercial buzz, where nighttime noise from foot traffic and late venues is as much a quality-of-life issue as morning tram bells on Toorak Road. Acoustic laminated double glazing in the front rooms of period terraces delivers the quiet that the suburb's premium real estate values should have guaranteed from the start.",
    landmark: "Chapel Street and the Toorak Road tram corridor",
  },
  {
    name: 'Templestowe',
    slug: 'templestowe',
    postcode: '3106',
    region: 'Outer East',
    intro:
      "Templestowe's large suburban homes on elevated blocks experience cold easterly winds in winter and hot afternoon sun from the west in summer — conditions that push heating and cooling loads beyond what original single-pane windows manage. Low-E double glazing controls both summer heat gain and winter heat loss, reducing mechanical conditioning load year-round.",
    landmark: 'Templestowe Village and the Yarra River flats',
  },
  {
    name: 'Toorak',
    slug: 'toorak',
    postcode: '3142',
    region: 'Inner South',
    intro:
      "Toorak's period mansions and heritage houses represent Melbourne's most substantial residential investment, yet many still carry original single-pane glass from the Edwardian and inter-war eras. Retrofit double glazing installs into existing rebates without altering heritage fabric — delivering performance on par with new construction at a fraction of the cost, with zero planning permit risk.",
    landmark: "Toorak Road and Toorak Village",
  },
  {
    name: 'Vermont',
    slug: 'vermont',
    postcode: '3133',
    region: 'Outer East',
    intro:
      "Vermont's 1950s and 1960s brick and timber homes sit in one of Melbourne's colder outer-east pockets, where winter mornings regularly produce condensation on single-pane windows — a symptom of heat loss, not just cold weather. Retrofit double glazing eliminates condensation on the inner pane and can cut heating bills by up to 40% in homes of this era.",
    landmark: 'Vermont South shopping strip and Dandenong Creek Trail',
  },
  {
    name: 'Wantirna',
    slug: 'wantirna',
    postcode: '3152',
    region: 'Outer East',
    intro:
      "Wantirna's stock of 1970s and 1980s brick-veneer homes was built for the energy costs of that era — not today's electricity prices. Upgrading the glass unit inside existing aluminium frames to a double-glazed Low-E specification is the highest-impact, lowest-disruption thermal improvement available without a renovation.",
    landmark: 'Knox City Shopping Centre and Dandenong Creek parklands',
  },
  {
    name: 'Wheelers Hill',
    slug: 'wheelers-hill',
    postcode: '3150',
    region: 'Outer East',
    intro:
      "Wheelers Hill's established residential streets and family homes sit in one of Melbourne's outer south-east corridors where winter cold snaps are more pronounced than the inner suburbs. Retrofit double glazing installs into existing frames in a single day and delivers measurable reductions in heating bills and condensation without any structural work.",
    landmark: 'Wheelers Hill shopping centre and Jells Park',
  },
]

/** O(1) slug lookup for suburb detail pages */
export const suburbBySlug: Record<string, SuburbData> = Object.fromEntries(
  suburbs.map((s) => [s.slug, s]),
)
