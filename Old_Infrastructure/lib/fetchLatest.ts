// This file contains all the utility functions used by the home page to fetch the latest products.

import supabase from "./supabaseClient";

// Fetch the latest processors.
export async function fetchProcessors() {
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
    .eq("part_type", 0);

  if (error) {
    throw error;
  }

  // Flatten and transform data to match the frontend needs
  const flattened = data.flatMap((part: any) =>
    part.parts_specifications.map((spec: any) => ({
      part_name: part.part_name,
      part_manufacturer: part.part_manufacturer,
      part_price: part.part_price,
      part_specification: spec.part_specification,
      part_specification_value: spec.part_specification_value,
    }))
  );

  return flattened;
}