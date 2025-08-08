// This is the generic query used by the pages to buy parts.

import { Part } from "../types/part";
import { supabase } from "../lib/supabaseClient";

/**
 * Fetch parts of a specific type with filtered specifications.
 * @param partType Number representing part_type filter
 * @returns Flattened array of parts with their specifications
 */
export async function FetchParts(
  partType: number,
): Promise<Part[]> {
  const { data, error } = await supabase
    .from('parts')
    .select(`
      part_id,
      part_type,
      part_name,
      part_manufacturer,
      part_price,
      parts_specifications (
        part_specification,
        part_specification_value
      )
    `)
    .eq('part_type', partType);

  if (error) {
    console.error('Supabase fetch error:', error);
    throw error;
  }

  const partMap = new Map<string, Part>();

  data.forEach((item: any) => {
    if (!partMap.has(item.part_name)) {
      partMap.set(item.part_name, {
        id: item.part_id,
        type: item.part_type,
        name: item.part_name,
        manufacturer: item.part_manufacturer,
        price: Number(item.part_price),
        specifications: {},
      });
    }

    const part = partMap.get(item.part_name)!;

    item.parts_specifications.forEach((spec: any) => {
      part.specifications[spec.part_specification] = spec.part_specification_value;
    });
  });

  return Array.from(partMap.values());
};
