// This is a generic type for a part.
// It is used in the pages to buy parts to define "what" a part actually is.

export type Part = {
  name: string;
  manufacturer: string;
  price: number;
  specs: Record<string, string>;
};