import type { SkinConcern } from "@/data/treatments";

export type Story = {
  id: string;
  title: string;
  concern: SkinConcern;
  timeline: string[];
  quote: string;
  note: string;
};

export const stories: Story[] = [
  {
    id: "calm-acne-cycle",
    title: "From flare-ups to a calmer cycle",
    concern: "Acne",
    timeline: ["Week 0: diagnosis + reset plan", "Week 2: congestion easing", "Week 6: fewer inflamed days"],
    quote: "I finally understood what my skin was reacting to. The plan felt realistic and my skin looked calmer.",
    note: "Individual results vary. We focus on comfort and consistency, not instant extremes.",
  },
  {
    id: "tone-return",
    title: "Tone returns without irritation",
    concern: "Pigmentation",
    timeline: ["Session 1: barrier-first brightening", "Session 3: surface glow", "Session 6: steadier tone days"],
    quote: "My skin looked brighter, but more importantly, it felt less sensitive than before.",
    note: "We keep expectations realistic and avoid medical claims.",
  },
  {
    id: "bounce-back",
    title: "A softer, bouncier look",
    concern: "Aging",
    timeline: ["Session 1: hydration + lift ritual", "Session 4: improved suppleness", "Maintenance: every 4–6 weeks"],
    quote: "My skin looked more rested. Makeup sat better and I felt more confident.",
    note: "Aging care is a long game: hydration, barrier health, and consistent sessions.",
  },
];

