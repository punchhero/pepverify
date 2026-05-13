"use server";

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;

export async function submitWaitlist(email: string, xAccount: string, role: string) {
  try {
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
    
    if (!supabaseUrl || !supabaseKey) {
        console.warn("Supabase credentials missing, skipping DB insert for now.");
        return { success: true };
    }
    
    const supabase = createClient(supabaseUrl, supabaseKey);

    const { error } = await supabase
      .from('waitlist')
      .insert([
        { email, x_account: xAccount, role }
      ]);

    if (error) {
      console.error("Waitlist insert error:", error);
      return { success: false, error: "Failed to save. Email might already be registered." };
    }

    return { success: true };
  } catch (e) {
    console.error("Unexpected error:", e);
    return { success: false, error: "Unexpected error occurred." };
  }
}
