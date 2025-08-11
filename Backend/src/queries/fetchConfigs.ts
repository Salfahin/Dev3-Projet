// this is the generic query used by the page to buy configurations to fetch them.

import { Configuration } from "../types/configuration";
import { supabase } from "../lib/supabaseClient";

/**
 * Fetch configurations along with its parts, authors etc.
 * @returns Flattened array of configurations with their parts.
 */
export async function FetchConfigs(
): Promise<Configuration[]> {
  const { data, error } = await supabase
    .from('configurations')
    .select(`
      config_id,
      config_name,
      config_price,
      config_author,
      configurations_parts (
        parts (
          part_id,
          part_name,
          part_type,
          parts_types (
            part_label
          )
        )
      )
    `);

  if (error) {
    console.error('Supabase fetch error:', error);
    throw error;
  }

  const configMap = new Map<string, Configuration>();

  data.forEach((item: any) => {
    if (!configMap.has(item.config_name)) {
      configMap.set(item.config_name, {
        id: item.config_id,
        name: item.config_name,
        author: item.config_author,
        price: Number(item.part_price),
        parts: {},
      });
    }

    const config = configMap.get(item.config_name)!;

    item.configurations_parts.forEach((spec: any) => {
      if (spec.parts) {
        config.parts[spec.parts.parts_types.part_label] = spec.parts.part_name;
      }
    });
  });

  return Array.from(configMap.values());
};
