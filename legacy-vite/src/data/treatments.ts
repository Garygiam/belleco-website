export type SkinConcern = "Acne" | "Pigmentation" | "Aging" | "Dullness" | "Sensitivity" | "Texture";

export type Treatment = {
  id: string;
  name: string;
  concerns: SkinConcern[];
  duration: string;
  intensity: "Gentle" | "Balanced" | "Targeted";
  outcomes: string[];
  highlights: string[];
};

export const concerns: { key: SkinConcern; blurb: string }[] = [
  { key: "Acne", blurb: "Breakouts, clogged pores, inflamed spots, post-acne marks." },
  { key: "Pigmentation", blurb: "Uneven tone, sun spots, melasma-like patches, dull shadows." },
  { key: "Aging", blurb: "Fine lines, laxity, dehydration lines, loss of bounce." },
  { key: "Dullness", blurb: "Tired skin, roughness, slow turnover, low radiance." },
  { key: "Sensitivity", blurb: "Redness, fragile barrier, reactivity, stingy skin days." },
  { key: "Texture", blurb: "Bumps, visible pores, uneven surface, makeup sitting poorly." },
];

export const treatments: Treatment[] = [
  {
    id: "signature-diagnosis",
    name: "Signature Skin Diagnosis",
    concerns: ["Acne", "Pigmentation", "Aging", "Dullness", "Sensitivity", "Texture"],
    duration: "45–60 min",
    intensity: "Gentle",
    outcomes: ["Understand your skin pattern", "A personalised session plan", "Homecare direction"],
    highlights: ["Skin history intake", "Barrier + hydration check", "Plan your next 3–6 sessions"],
  },
  {
    id: "clarity-reset",
    name: "Clarity Reset Facial",
    concerns: ["Acne", "Texture", "Dullness"],
    duration: "75–90 min",
    intensity: "Balanced",
    outcomes: ["Less congestion", "Calmer appearance", "Smoother-looking texture"],
    highlights: ["Pore-comfort cleanse", "Targeted extraction (as suitable)", "Soothing finish"],
  },
  {
    id: "tone-bright",
    name: "Tone + Bright Program",
    concerns: ["Pigmentation", "Dullness", "Texture"],
    duration: "75–90 min",
    intensity: "Balanced",
    outcomes: ["More even-looking tone", "Brighter surface glow", "Refined appearance"],
    highlights: ["Gentle resurfacing", "Hydration layering", "Barrier-first brightening"],
  },
  {
    id: "age-reversal",
    name: "Age-Reversal Lift Ritual",
    concerns: ["Aging", "Dullness", "Sensitivity"],
    duration: "90 min",
    intensity: "Targeted",
    outcomes: ["Plumper-looking skin", "Lifted feel", "Softer fine line look"],
    highlights: ["Collagen-support focus", "Massage + contour work", "Comfort-first actives"],
  },
];

