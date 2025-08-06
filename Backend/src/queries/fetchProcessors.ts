// This is the query to get the processors for the processors buying page.

import { Processor } from "../types/processor";
import { supabase } from "../lib/supabaseClient";

export async function FetchProcessors(): Promise<Processor[]> {
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
    .eq('part_type', 0)
    .in('parts_specifications.part_specification', ['Core Count', 'Thread Count', 'Series', 'Socket']);

  if (error) {
    console.error('Supabase fetch error:', error);
    throw error;
  }

  // Flatten the results into a list of Processor, with one specification per row.
  const processors: Processor[] = [];

  data?.forEach((part: any) => {
    part.parts_specifications.forEach((spec: any) => {
      processors.push({
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

  return processors;
};
