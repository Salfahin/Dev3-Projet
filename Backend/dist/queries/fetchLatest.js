"use strict";
// This is the query performed to the database to fetch the five latest products of a specified kind.
Object.defineProperty(exports, "__esModule", { value: true });
exports.FetchLatest = FetchLatest;
const supabaseClient_1 = require("../lib/supabaseClient");
/**
 * Fetch the five latest products (of a specified type).
 * @param partType Number representing part_type filter. If no value specified, configurations will be returned instead of parts.
 * @returns Flattened array of the five latest products of the specified type.
 */
async function FetchLatest(partType) {
    if (partType === undefined || partType === null) {
        // Query to return configurations
        const { data, error } = await supabaseClient_1.supabase
            .from('configurations')
            .select('*')
            .order('config_id', { ascending: false })
            .limit(5);
        if (error) {
            console.error(':(\nError fetching configurations:', error);
            return [];
        }
        return data || [];
    }
    else {
        // Query to return parts
        const { data, error } = await supabaseClient_1.supabase
            .from('parts')
            .select('*')
            .eq('part_type', partType)
            .order('part_id', { ascending: false })
            .limit(5);
        if (error) {
            console.error(`:(\nError fetching latest parts of type ${partType}.`);
            return [];
        }
        return data || [];
    }
}
