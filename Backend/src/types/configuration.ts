//This is a generic configuration what it is and its characteristics.

export type Configuration = {
  id: number;
  name: string;
  author: string;
  price: number;
  parts: Record<string, string>;
};
