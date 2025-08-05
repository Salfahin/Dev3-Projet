# What is a "Component"?

source: chatGPT

**Purpose:** Encapsulate **reusable UI logic and presentation**.

* **What they contain:**
  React functional components (e.g., buttons, cards, forms, modals).

* **Used for:**
  Rendering parts of the UI. Components may receive props (which can use types from the `types/` directory).

* **Example:**

  ```tsx
  // components/PartCard.tsx
  import { Part } from '@/types/Part';

  type Props = {
    part: Part;
  };

  export default function PartCard({ part }: Props) {
    return (
      <div className="border p-4">
        <h2>{part.name}</h2>
        <p>{part.manufacturer}</p>
        <p>{part.price} €</p>
      </div>
    );
  }
  ```
