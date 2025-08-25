"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchSpecsByPartName = void 0;
// src/queries/FetchSpecs.ts
const supabaseClient_1 = require("../lib/supabaseClient");
const fetchSpecsByPartName = async (partName) => {
    const { data, error } = await supabaseClient_1.supabase
        .from('parts')
        .select(`part_id, parts_specifications (part_specification, part_specification_value)`)
        .eq('part_name', partName)
        .single();
    if (error)
        throw error;
    if (!data)
        return [];
    const specs = {};
    data.parts_specifications.forEach((spec) => {
        specs[spec.part_specification] = spec.part_specification_value;
    });
    return specs;
};
exports.fetchSpecsByPartName = fetchSpecsByPartName;
