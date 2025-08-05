// This Utility Function is used by the pages to buy parts to fetch/query the parts stored in the database.

import supabase from "@/lib/supabaseClient";
import { Part } from "@/types/Parts";

export async function fetchParts(partType: string, specKeys: string[]): Promise<Part[]> {
  const { data, error } = await supabase
    .from("parts")
    .select(`
      part_name,
      part_manufacturer,
      part_price,
      parts_specifications (
        part_specification,
        part_specification_value
      )
    `)
    .eq("part_type", partType);

  if (error || !data) {
    console.error("Erreur Supabase:", error);
    return [];
  }

  const partMap = new Map<string, Part>();

  data.forEach((item: any) => {
    if (!partMap.has(item.part_name)) {
      partMap.set(item.part_name, {
        name: item.part_name,
        manufacturer: item.part_manufacturer,
        price: Number(item.part_price),
        specs: {},
      });
    }

    const part = partMap.get(item.part_name)!;

    item.parts_specifications.forEach((spec: any) => {
      if (specKeys.includes(spec.part_specification)) {
        part.specs[spec.part_specification] = spec.part_specification_value;
      }
    });
  });

  return Array.from(partMap.values());
}