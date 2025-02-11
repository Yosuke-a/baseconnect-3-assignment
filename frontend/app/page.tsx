'use client'

import { IncomeSelect } from "@/components/Income";
import { CategorySelect } from "@/components/category";
import { JobCard } from "@/components/jobcard";
import { useEffect, useState, useRef } from "react";
import { useJobs } from "@/components/jobprovider";

export const job_categories = [
  "事務", "エンジニア", "営業", "デザイン", "マーケティング", "財務・経理", "人事", "カスタマーサポート", "製造", "医療・介護"
];

interface Job {
  title: string;
  category: string;
  income: number;
}

export default function App() {
  const { jobs, addJobs } = useJobs();
  const [income, setIncome] = useState(0);
  const [categories, setCategories] = useState(job_categories.map((category, id) => ({
    id: id + 1, category: category, state: false
  })));

  const fetchJobs = async () => {
    try {
      const response = await fetch('http://localhost:3001/jobs');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data: Job[] = await response.json();
      addJobs(data);
    } catch (error) {
      console.error('データ取得エラー:', error);
    }
  };

  const isFetched = useRef(false);

  useEffect(() => {
    if (isFetched.current) return;
    isFetched.current = true;
    fetchJobs();
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-100 p-6">
      <div className="w-1/4 bg-white shadow-lg p-4 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">求人カテゴリ</h2>
        <CategorySelect categories={categories} setCategories={setCategories} />
        
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
