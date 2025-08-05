# What is a "Type"?

source: chatGPT

**Purpose:** Define the *shape* or *structure* of data.

* **What they contain:**
  TypeScript interfaces and types that describe objects, function signatures, props, etc.

* **Used for:**
  Type checking, autocompletion, and catching bugs at compile time.

* **Example:**

  ```ts
  // types/Part.ts
  export type Part = {
    name: string;
    manufacturer: string;
    price: number;
  };
  ```

* **Usage in code:**

  ```ts
  import type { Part } from '@/types/Part';

  const part: Part = { name: 'Cooler', manufacturer: 'Noctua', price: 59.99 };
  ```
