# What is the `lib/` directory for?

source: chatGPT

The `lib/` directory (short for **library**) in a Next.js or general TypeScript/JavaScript project traditionally contains **utility modules** and **non-UI logic** that doesn't belong to a specific component or page.

---

### ✅ **What goes in `lib/`:**

| Purpose                          | Examples                                                   |
| -------------------------------- | ---------------------------------------------------------- |
| **API clients**                  | `lib/supabaseClient.ts`, `lib/api.ts`, `lib/axios.ts`      |
| **Helper functions / utilities** | `lib/formatDate.ts`, `lib/sortParts.ts`, `lib/currency.ts` |
| **Database logic**               | `lib/db.ts`, `lib/prisma.ts`                               |
| **Third-party service config**   | `lib/firebase.ts`, `lib/stripe.ts`, `lib/algolia.ts`       |
| **Business logic**               | `lib/calculatePowerDraw.ts`, `lib/filterParts.ts`          |

---

### 🧱 **lib/** vs other folders:

| Folder             | Contains                           | Example                                     |
| ------------------ | ---------------------------------- | ------------------------------------------- |
| `components/`      | UI elements                        | Buttons, Cards, Forms                       |
| `types/`           | TypeScript interfaces & types      | Part, User, Product, etc.                   |
| `lib/`             | Generic logic & utilities (non-UI) | API clients, utilities, business rules      |
| `hooks/`           | React custom hooks                 | `useDebounce`, `useWindowSize`, etc.        |
| `app/` or `pages/` | Routes and layout logic            | `/cpu/page.tsx`, `/configurator/layout.tsx` |

---

### 📦 Example: `lib/supabaseClient.ts`

```ts
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createClient(supabaseUrl, supabaseAnonKey);
export default supabase;
```

You would then import this in pages like:

```ts
import supabase from '@/lib/supabaseClient';
```

---

### Summary:

> Use `lib/` to group all non-UI, reusable **logic** or **external service clients** that are needed across multiple components or pages.

If you’d like, I can help you audit your current `lib/` directory and suggest which utilities belong there and which do not.
