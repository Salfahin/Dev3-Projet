"use strict";
// This is the generic query used by the pages to buy parts.
Object.defineProperty(exports, "__esModule", { value: true });
exports.FetchParts = FetchParts;
const supabaseClient_1 = require("../lib/supabaseClient");
/**
 * Fetch parts of a specific type with filtered specifications.
 * @param partType Number representing part_type filter
 * @returns Flattened array of parts with their specifications
 */
async function FetchParts(partType) {
    const { data, error } = await supabaseClient_1.supabase
        .from('parts')
        .select(`
      part_id,
      part_type,
      part_name,
      part_manufacturer,
      part_price,
      approved,
      parts_specifications (
        part_specification,
        part_specification_value
      )
    `)
        .eq('part_type', partType)
        .eq('approved', true);
    if (error) {
        console.error('Supabase fetch error:', error);
        throw error;
    }
    const partMap = new Map();
    data.forEach((item) => {
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
        const part = partMap.get(item.part_name);
        item.parts_specifications.forEach((spec) => {
            part.specifications[spec.part_specification] = spec.part_specification_value;
        });
    });
    return Array.from(partMap.values());
}
;
