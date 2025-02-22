"use server";

import { Pool } from "pg";

const pool = new Pool ({
    connectionString: process.env.POSTGRES_URL,
})

export async function getJobs() {
    try {
        const client = await pool.connect();
        const result = await client.query("SELECT * FROM jobs");
        client.release();
    
        return result.rows;
      } catch (error) {
        console.error("データ取得エラー:", error);
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

    const client = await pool.connect();
    await client.query("INSERT INTO jobs (title, category, income) VALUES ($1, $2, $3)", [title, category, income]);
    client.release();

    return { success: true };
  } catch (error) {
    console.error("求人投稿エラー:", error);
    return { success: false, message: "エラーが発生しました" };
  }
}