"use server";

import { supabaseServer } from "./clientComponents";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseAnonKey);


export async function getJobs() {
  const { data, error } = await supabaseServer.from("jobs").select("*");
  if (error) {
    console.error("データ取得エラー:", error);
    return [];
  }
  return data;
}

export async function addJobToDB(formData: FormData) {
    try {
      const title = formData.get("title") as string;
      const category = formData.get("category") as string;
      const income = Number(formData.get("income"));
  
      if (!title || !category || isNaN(income)) {
        throw new Error("入力データが正しくありません");
      }
  
      const { error } = await supabase
        .from("jobs")
        .insert([{ title, category, income }]);
  
      if (error) {
        throw new Error(`Supabase エラー: ${error.message}`);
      }
  
      return { success: true };
    } catch (error) {
      if (error instanceof Error) {
        console.error("Server Action 内でエラー:", error.message);
        return { success: false, message: error.message };
      } else {
        console.error("予期しないエラー:", error);
        return { success: false, message: "不明なエラーが発生しました。" };
      }
    }
  }