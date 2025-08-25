"use strict";
// this is the generic query used by the page to buy configurations to fetch them.
Object.defineProperty(exports, "__esModule", { value: true });
exports.FetchConfigs = FetchConfigs;
const supabaseClient_1 = require("../lib/supabaseClient");
/**
 * Fetch configurations along with its parts, authors etc.
 * @returns Flattened array of configurations with their parts.
 */
async function FetchConfigs() {
    const { data, error } = await supabaseClient_1.supabase
        .from('configurations')
        .select(`
      config_id,
      config_name,
      config_price,
      config_author,
      approved,
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
    `)
        .eq('approved', true);
    if (error) {
        console.error('Supabase fetch error:', error);
        throw error;
    }
    const configMap = new Map();
    data.forEach((item) => {
        if (!configMap.has(item.config_name)) {
            configMap.set(item.config_name, {
                id: item.config_id,
                name: item.config_name,
                author: item.config_author,
                price: Number(item.part_price),
                parts: {},
            });
        }
        const config = configMap.get(item.config_name);
        item.configurations_parts.forEach((spec) => {
            if (spec.parts) {
                config.parts[spec.parts.parts_types.part_label] = spec.parts.part_name;
            }
        });
    });
    return Array.from(configMap.values());
}
;
