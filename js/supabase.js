const SUPABASE_URL =
  "https://aszdwaivuaiwzslgttgr.supabase.co";

const SUPABASE_PUBLIC_KEY =
  "sb_publishable_LCNOHaj_NxWaSZwzkjU_7w_c086mDeS";

const supabaseClient = supabase.createClient(
  SUPABASE_URL,
  SUPABASE_PUBLIC_KEY
);
console.log("Supabase connected:", supabaseClient);
