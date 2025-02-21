"use server";

import { supabaseServer } from "./clientComponents";

export async function getJobs() {
  const { data, error } = await supabaseServer.from("jobs").select("*");
  if (error) {
    console.error("データ取得エラー:", error);
    return [];
  }
  return data;
}

export async function addJobToDB(title: string, category: string, income: number) {
    const newJob = { title, category, income };
  
    const { error } = await supabaseServer.from("jobs").insert([newJob]);
  
    if (error) {
      throw new Error(`Supabaseエラー: ${error.message}`);
    }
  }
