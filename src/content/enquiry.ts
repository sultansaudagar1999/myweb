import { services } from "./services";

export const serviceOptions = [
  ...services.map((s) => ({ value: s.slug, label: s.title })),
  { value: "other", label: "Something else / not sure yet" },
];

export const industryOptions = [
  "Retail / local shop",
  "Restaurant / café / hospitality",
  "Education / coaching institute",
  "Driving school",
  "Healthcare / clinic",
  "Professional services",
  "Startup / technology",
  "E-commerce / online brand",
  "Real estate / construction",
  "Other",
];

export const budgetOptions = [
  "Not sure yet",
  "Under ₹25,000",
  "₹25,000 – ₹50,000",
  "₹50,000 – ₹1,00,000",
  "₹1,00,000 – ₹2,50,000",
  "Above ₹2,50,000",
];

export const timelineOptions = ["As soon as possible", "Within 1 month", "1 – 3 months", "3+ months", "Flexible / not sure"];
