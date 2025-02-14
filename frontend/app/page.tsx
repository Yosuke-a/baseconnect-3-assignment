'use client'

import { IncomeSelect } from "@/components/Income";
import { CategorySelect } from "@/components/category";
import { JobCard } from "@/components/jobcard";
import { useEffect, useState, useRef } from "react";
import { useJobs } from "@/components/jobprovider";
import { job_categories } from "@/components/job_categories";
import { createClient } from "@supabase/supabase-js";


export default function App() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
  const supabase = createClient(supabaseUrl, supabaseAnonKey);
  const { jobs, addJobs } = useJobs();
  const [income, setIncome] = useState(0);
  const [categories, setCategories] = useState(job_categories.map((category, id) => ({
    id: id + 1, category: category, state: false
  })));
  const isFetched = useRef(false);

  const fetchJobs = async () => {
    try {
      const { data, error } = await supabase.from("jobs").select("*");
      if (error) {
        throw new Error(`Supabase error: ${error.message}`);
      }
      addJobs(data);
    } catch (error) {
      console.error("データ取得エラー:", error);
    }
  };

  useEffect(() => {
    if (isFetched.current) return;
    isFetched.current = true;
    fetchJobs();
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-100 p-6">
      <div className="w-1/4 bg-white shadow-lg p-4 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">求人カテゴリ</h2>
        <div className="grid gap-2">
        <CategorySelect categories={categories} setCategories={setCategories} />
        </div>
        <h2 className="text-xl font-semibold mt-6 mb-4">年収フィルター</h2>
        <IncomeSelect income={income} setIncome={setIncome} />
      </div>

      <div className="w-3/4 ml-6">
        <h1 className="text-2xl font-bold mb-4">求人一覧</h1>
        <h2 className="text-lg mb-4">
          該当件数: {
            jobs.filter(job => 
              (income === null || job.income >= income) &&
              (categories.every(cat => !cat.state) || categories.find(cat => cat.category === job.category)?.state)
            ).length
          }件
        </h2>

        <div className="flex flex-col gap-4">
          {jobs.filter(job =>
            (income === null || job.income >= income) &&
            (categories.every(cat => !cat.state) || categories.find(cat => cat.category === job.category)?.state)
          ).map((job, index) => (
            <JobCard key={index} job={job} className="shadow-md bg-white p-4 rounded-lg" />
          ))}
        </div>
      </div>
    </div>
  );
}
