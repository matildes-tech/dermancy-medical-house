/* ============================================
   Treatment page data — all copy from approved brief
   ============================================ */

export interface Treatment {
  slug: string;
  name: string;
  tagline: string;
  body: string[];
  closingLine: string;
  img: string;
  sub: string;
  metaTitle: string;
  metaDescription: string;
}

export const treatments: Treatment[] = [
  {
    slug: 'botox',
    name: 'Botox',
    sub: 'Botulinum Toxin Therapy',
    tagline: 'Smooth. Rested. Still expressive.',
    img: 'https://images.unsplash.com/photo-1594824476967-48c8b964f137?w=600&q=80',
    metaTitle: 'Botox | Dermancy Medical House',
    metaDescription: 'Botox treatments at Dermancy Medical House, Rhodes. Precise, natural-looking results by Dr. Ioannis Michalakis.',
    body: [
      'Lines and wrinkles are part of life — but they do not have to define how rested or confident you feel. Botox works by gently relaxing the muscles responsible for dynamic wrinkles, the ones that form when you frown, squint, or raise your brows. The result is not a frozen face. It is a softer, more refreshed version of the one you already have.',
      'At Dermancy Medical House, Botox is never applied by formula. Dr. Michalakis assesses each patient\u2019s facial movement, muscle strength, and skin quality before determining the precise placement and dosage. This is what separates a natural result from an obvious one.',
      'The procedure takes no more than fifteen minutes. Discomfort is minimal — most patients describe it as a light pinch. Results begin to appear within three to five days, with full effect visible at two weeks. The refreshed appearance typically lasts four to six months, depending on individual muscle activity and skin type.',
      'Common treatment areas include forehead lines, frown lines between the brows, and crow\u2019s feet around the eyes. In experienced hands, Botox can also be used to subtly lift the brow, soften a gummy smile, or slim the jawline.',
    ],
    closingLine: 'No downtime. No guesswork. Just precise, considered care.',
  },
  {
    slug: 'fillers',
    name: 'Fillers',
    sub: 'Dermal Filler Treatments',
    tagline: 'Define. Restore. Enhance — without excess.',
    img: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600&q=80',
    metaTitle: 'Fillers | Dermancy Medical House',
    metaDescription: 'Dermal filler treatments at Dermancy Medical House, Rhodes. Architectural approach to natural facial restoration.',
    body: [
      'Volume loss is one of the earliest and most visible signs of ageing. As the face loses fat, bone density, and collagen, features that once felt defined can begin to appear hollow, flat, or tired. Dermal fillers restore what time has taken — not by adding excess, but by returning structure and balance where it is needed most.',
      'At Dermancy Medical House, we use hyaluronic acid-based fillers, a substance naturally found in the skin. Hyaluronic acid not only restores volume but also attracts moisture, improving skin texture and hydration over time. The result is not just fuller — it is healthier.',
      'Dr. Michalakis approaches every filler treatment architecturally. Before any injection, he evaluates bone structure, tissue depth, and facial proportions to determine exactly where volume will have the greatest impact. This level of assessment is what prevents the overfilled, unnatural results that have given fillers an undeserved reputation.',
      'Lips are treated with particular care — not simply to add size, but to refine the shape, define the borders, and restore a natural fullness that looks effortless. Cheeks are lifted, not inflated. Jawlines are contoured, not exaggerated.',
      'The procedure takes approximately thirty minutes. Results are immediate, with final settling over the following two weeks. Depending on the area and product used, results last between six and eighteen months.',
    ],
    closingLine: 'One consultation. One clear plan. Results that look like they were always yours.',
  },
  {
    slug: 'body-treatments',
    name: 'Body Treatments',
    sub: 'Medical Body Contouring',
    tagline: 'Contour. Firm. Refine.',
    img: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=600&q=80',
    metaTitle: 'Body Treatments | Dermancy Medical House',
    metaDescription: 'Medical body contouring at Dermancy Medical House, Rhodes. Precision body treatments supervised by Dr. Michalakis.',
    body: [
      'Aesthetic care does not end at the face. The body deserves the same level of precision, assessment, and medical rigour. At Dermancy Medical House, body treatments are approached with the same philosophy that guides every facial procedure — understand first, treat with intention, and never promise what cannot be delivered.',
      'Our body contouring protocols target localised fat deposits, cellulite, and skin laxity through controlled lipolysis, microcirculation stimulation, and collagen remodelling. These are not cosmetic shortcuts. They are medically supervised interventions designed to improve texture, firmness, and tone over a structured course of treatment.',
      'Each protocol begins with a detailed consultation. Dr. Michalakis evaluates skin condition, tissue quality, and body type before recommending a treatment plan. What works for one patient will not work for another — and an honest assessment is always more valuable than an easy promise.',
    ],
    closingLine: 'Results develop progressively over multiple sessions. The pace is deliberate, the improvements are real, and the outcome is a body that feels as cared for as it looks.',
  },
  {
    slug: 'mesotherapy',
    name: 'Mesotherapy',
    sub: 'Microinjection Therapy',
    tagline: 'Nourish. Regenerate. Glow.',
    img: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=600&q=80',
    metaTitle: 'Mesotherapy | Dermancy Medical House',
    metaDescription: 'Mesotherapy treatments at Dermancy Medical House, Rhodes. Customised microinjection therapy for skin renewal.',
    body: [
      'Healthy skin begins beneath the surface. Mesotherapy delivers a tailored blend of hyaluronic acid, vitamins, peptides, and antioxidants directly into the mesodermal layer of the skin — where cell renewal and hydration actually occur. This is not a topical solution. It is a targeted intervention that works where creams and serums cannot reach.',
      'The treatment addresses dehydration, dullness, fine lines, loss of elasticity, and sun damage at their source. By stimulating the skin\u2019s own regenerative processes, mesotherapy restores radiance and resilience from within — gradually, naturally, and with lasting effect.',
      'At Dermancy Medical House, every mesotherapy cocktail is customised. Dr. Michalakis selects and adjusts the active ingredients based on each patient\u2019s skin type, condition, and specific concerns. There is no standard formula — because no two skins are the same.',
      'Treatment areas include the face, neck, d\u00e9collet\u00e9, and hands. Sessions are brief, well-tolerated, and require minimal downtime. A course of treatments is typically recommended, with visible improvement in skin quality, texture, and tone building progressively with each session.',
    ],
    closingLine: 'Skin that is cared for from within does not need to be concealed. It speaks for itself.',
  },
  {
    slug: 'skin-boosters',
    name: 'Skin Boosters',
    sub: 'Hyaluronic Skin Renewal',
    tagline: 'Hydrate. Illuminate. Transform the texture.',
    img: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=600&q=80',
    metaTitle: 'Skin Boosters | Dermancy Medical House',
    metaDescription: 'Skin booster treatments at Dermancy Medical House, Rhodes. Deep hydration and collagen stimulation for radiant skin.',
    body: [
      'Not every skin concern is about wrinkles or volume. Sometimes the issue is simpler and more fundamental — the skin has lost its quality. It looks tired, dry, uneven. It has lost the luminosity it once had. Skin boosters address exactly this.',
      'Through micro-injections of soft, stabilised hyaluronic acid, skin boosters work at a deeper level than any serum or cream can reach. They do not add volume or reshape the face. Instead, they flood the skin with lasting hydration, stimulate collagen production, and restore the plump, even texture that is the foundation of genuinely healthy-looking skin.',
      'This is one of the most important distinctions patients should understand: skin boosters are not fillers. They do not change how you look. They change how your skin feels, responds to light, and ages over time.',
      'At Dermancy Medical House, skin booster treatments are tailored to each patient\u2019s level of dehydration, skin type, and lifestyle factors. Common areas include the face, neck, d\u00e9collet\u00e9, and hands — anywhere the skin has lost its resilience.',
      'A course of two to three sessions is typically recommended, spaced several weeks apart, with results building progressively. Many patients return seasonally to maintain the effect. Downtime is minimal — mild redness may occur and resolves within hours.',
    ],
    closingLine: 'The best foundation is not something you apply. It is the skin itself.',
  },
  {
    slug: 'biostimulator',
    name: 'Biostimulators',
    sub: 'Collagen Regeneration Therapy',
    tagline: 'Rebuild. Restore. Rejuvenate from within.',
    img: 'https://images.unsplash.com/photo-1598524374912-6b0b0bdd29a0?w=600&q=80',
    metaTitle: 'Biostimulators | Dermancy Medical House',
    metaDescription: 'Biostimulator treatments at Dermancy Medical House, Rhodes. Long-term collagen regeneration for structural skin renewal.',
    body: [
      'There is a fundamental difference between adding volume and rebuilding structure. Fillers do the first. Biostimulators do the second. Rather than introducing a substance that fills space, biostimulators activate the body\u2019s own collagen production — prompting the skin to regenerate its firmness, density, and elasticity from within.',
      'The most established biostimulators use poly-L-lactic acid (PLLA) or calcium hydroxyapatite (CaHA), both clinically proven to stimulate fibroblast activity and restore connective tissue. These are not quick fixes. They are long-term investments in the structural integrity of the skin.',
      'This makes biostimulators particularly effective for concerns that fillers alone cannot fully address — volume loss in the mid-face, skin laxity along the jawline and neck, and the gradual thinning that comes with age. The results are not immediate, and that is precisely the point. Improvement develops over weeks and continues for months, producing a natural lift and renewed texture that looks earned, not injected.',
      'At Dermancy Medical House, Dr. Michalakis recommends biostimulators for patients who value a progressive, regenerative approach. A treatment plan is designed after careful assessment of skin quality, tissue depth, and the patient\u2019s long-term aesthetic goals. Typically, two to three sessions are recommended, spaced several weeks apart.',
    ],
    closingLine: 'The strongest results are the ones your own body builds.',
  },
  {
    slug: 'prp-face-scalp-rejuvenation',
    name: 'PRP Face & Scalp Rejuvenation',
    sub: 'Platelet-Rich Plasma Therapy',
    tagline: 'Your biology. Your treatment. Your results.',
    img: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&q=80',
    metaTitle: 'PRP Face & Scalp Rejuvenation | Dermancy Medical House',
    metaDescription: 'PRP therapy at Dermancy Medical House, Rhodes. Regenerative face and scalp rejuvenation using your own biology.',
    body: [
      'PRP therapy is regenerative medicine in its purest form. There are no synthetic substances, no foreign compounds — only the concentrated healing power of your own blood, redirected to where your skin or scalp needs it most.',
      'The process begins with a small blood draw. The sample is placed in a specialised centrifuge that separates and concentrates the platelets and growth factors — the components responsible for tissue repair and cellular renewal. This platelet-rich plasma is then reinjected with fine micro-needles into the treatment area.',
      'For the face, PRP stimulates collagen and elastin production, improving texture, radiance, and elasticity. The skin does not just look younger — it behaves younger, responding and recovering the way it once did. For the scalp, PRP enhances microcirculation around hair follicles, nourishes dormant roots, reduces thinning, and promotes new growth.',
      'The treatment is minimally invasive, well-tolerated, and requires no downtime. Results develop gradually as the body\u2019s own regenerative processes take effect — typically over a period of four to six weeks, with continued improvement over subsequent months.',
      'At Dermancy Medical House, PRP is recommended as part of a considered treatment plan. Dr. Michalakis assesses each patient\u2019s skin or scalp condition and determines whether PRP is the right intervention — alone or in combination with other treatments.',
    ],
    closingLine: 'The most natural result comes from the most natural source — you.',
  },
  {
    slug: 'hyperhidrosis-treatment',
    name: 'Hyperhidrosis Treatment',
    sub: 'Excessive Sweating Therapy',
    tagline: 'Control. Comfort. Confidence restored.',
    img: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&q=80',
    metaTitle: 'Hyperhidrosis Treatment | Dermancy Medical House',
    metaDescription: 'Hyperhidrosis treatment at Dermancy Medical House, Rhodes. Medical-grade excessive sweating therapy by Dr. Michalakis.',
    body: [
      'Excessive sweating is not a cosmetic inconvenience. It is a medical condition — one that affects daily comfort, professional interactions, and personal confidence in ways that those who do not experience it rarely understand. Hyperhidrosis causes the sweat glands to overreact, producing perspiration far beyond what the body needs to regulate temperature. It most commonly affects the underarms, palms, soles, and forehead.',
      'At Dermancy Medical House, hyperhidrosis is treated with the same clinical seriousness as any other condition. The solution is precise, proven, and remarkably simple: targeted microinjections of botulinum toxin into the affected area. The toxin temporarily blocks the nerve signals that trigger the sweat glands, reducing excessive perspiration without affecting the body\u2019s natural ability to regulate heat.',
      'The procedure takes approximately thirty minutes. There is no downtime, no recovery period, and no visible trace of treatment. Most patients notice a significant reduction in sweating within the first week, with full results lasting six to nine months.',
      'This is not a treatment patients seek for vanity. It is one they seek for relief. And at Dermancy Medical House, that distinction matters. Every consultation begins with a thorough assessment — understanding the severity, the affected areas, and the impact on the patient\u2019s daily life — before recommending a course of action.',
    ],
    closingLine: 'A life without the constant awareness of perspiration is not a luxury. It is a reasonable expectation.',
  },
];

export function getTreatmentBySlug(slug: string): Treatment | undefined {
  return treatments.find(t => t.slug === slug);
}
