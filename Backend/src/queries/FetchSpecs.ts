// src/queries/FetchSpecs.ts
import { supabase } from '../lib/supabaseClient';

export const fetchSpecsByPartName = async (partName: string) => {
  const { data, error } = await supabase
    .from('parts')
    .select(`part_id, parts_specifications (part_specification, part_specification_value)`)
    .eq('part_name', partName)
    .single();

  if (error) throw error;
  if (!data) return [];

  const specs: Record<string, string> = {};
  data.parts_specifications.forEach((spec: any) => {
    specs[spec.part_specification] = spec.part_specification_value;
  });

  return specs;
};
