//This is a generic part what it is and its characteristics.

export type Part = {
  id: number;
  type: number;
  name: string;
  manufacturer: string;
  price: number;
  specifications: Record<string, string>;
};
