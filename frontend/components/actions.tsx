"use server";

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!; 
const supabase = createClient(supabaseUrl, supabaseServiceKey, { auth: { persistSession: false } });

export async function getJobs() {
  try {
    const { data, error } = await supabase.from("jobs").select("*");

    if (error) {
      throw new Error(`データ取得エラー: ${error.message}`);
    }

    return data ?? []; 
  } catch (error) {
    console.error("getJobs() のエラー:", error);
    return [];
  }
}


export async function addJobToDB(formData: FormData) {
  try {
    const title = formData.get("title") as string;
    const category = formData.get("category") as string;
    const income = Number(formData.get("income"));

    if (!title || !category || isNaN(income)) {
      throw new Error("入力データが正しくありません");
    }

    const { error } = await supabase.from("jobs").insert([{ title, category, income }]);

    if (error) {
      throw new Error(`Supabase エラー: ${error.message}`);
    }

    return { success: true };
  } catch (error) {
    console.error("addJobToDB() のエラー:", error);
    return { success: false, message: error instanceof Error ? error.message : "不明なエラーが発生しました" };
  }
}
