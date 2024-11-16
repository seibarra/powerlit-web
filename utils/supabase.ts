
import { createClient } from "@supabase/supabase-js";
import { type Database } from "~/types/database.types";

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
console.log("supabaseUrl", supabaseUrl);
console.log("supabaseKey", supabaseKey);

export const supabase = createClient<Database>(supabaseUrl as string, supabaseKey as string);
        