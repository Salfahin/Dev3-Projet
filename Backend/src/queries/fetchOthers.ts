// This is the query used by the others page.
// As the others type has no entries in parts_specifications,
// the generic fetchParts.ts query could not be used here.

import { Part } from "../types/part";
import { supabase } from "../lib/supabaseClient";

/**
 * Fetch parts where part_type = 9 (others), without specifications.
 * @returns Array of parts matching the filter.
 */
export async function FetchOthers(): Promise<Part[]> {
  const { data, error } = await supabase
    .from('parts')
    .select('part_id, part_name, part_manufacturer, part_price')
    .eq('part_type', 9);

  if (error) {
    console.error('Supabase fetch error:', error);
    throw error;
  }

  // Supabase returns data with type any[], cast it to Part[]
  return data as Part[];
};
