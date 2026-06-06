export type Testimonial = {
  id: string;
  name: string;
  line: string;
  highlight: string;
};

export const testimonials: Testimonial[] = [
  {
    id: "t1",
    name: "Client, KL",
    line: "Not a quick-fix vibe. More like a plan that makes sense.",
    highlight: "Diagnosis-first guidance",
  },
  {
    id: "t2",
    name: "Client, Kuchai",
    line: "My skin felt calmer after sessions. The approach is gentle but effective.",
    highlight: "Comfort-led care",
  },
  {
    id: "t3",
    name: "Client, Mid Valley",
    line: "The routine and sessions finally felt consistent. My tone looked brighter.",
    highlight: "Consistency wins",
  },
];

