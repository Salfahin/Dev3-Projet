// This is the generic query used by the pages to buy parts.
// They inject their custom requirements into it.
// This does not work with the others page as they do not have entries into the parts_specifications table.

import { Part } from "../types/part";
import { supabase } from "../lib/supabaseClient";

/**
 * Fetch parts of a specific type with filtered specifications.
 * @param partType Number representing part_type filter
 * @param specifications List of part_specification strings to filter specifications
 * @returns Flattened array of parts with matching specifications
 */
export async function FetchParts(
  partType: number,
  specifications: string[]
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

  const parts: Part[] = [];

  data?.forEach((part: any) => {
    part.parts_specifications
      .filter((spec: any) => specifications.includes(spec.part_specification))
      .forEach((spec: any) => {
        parts.push({
          part_id: part.part_id,
          part_type: part.part_type,
          part_name: part.part_name,
          part_manufacturer: part.part_manufacturer,
          part_price: part.part_price,
          part_specification: spec.part_specification,
          part_specification_value: spec.part_specification_value,
        });
      });
  });

  return parts;
};
