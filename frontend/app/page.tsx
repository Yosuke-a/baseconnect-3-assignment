"use client";

import { useState, useEffect } from "react";
import { getJobs } from "@/components/actions";
import { JobCard } from "@/components/jobcard";
import { IncomeSelect } from "@/components/Income";
import { CategorySelect } from "@/components/category";
import { job_categories } from "@/components/job_categories";

interface Job {
  id: number;
  title: string;
  category: string;
  income: number;
}

export default function JobsPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [income, setIncome] = useState(0);
  const [categories, setCategories] = useState(
    job_categories.map((category, id) => ({
      id: id + 1,
      category: category,
      state: false,
    }))
  );

  useEffect(() => {
    async function fetchJobs() {
      const jobData = await getJobs();
      setJobs(jobData);
    }
    fetchJobs();
  }, []);

  const filteredJobs = jobs.filter((job) => {
    const incomeCondition = income === 0 || job.income >= income;
    const categoryCondition =
      categories.every((cat) => !cat.state) ||
      categories.some((cat) => cat.state && cat.category === job.category);
    return incomeCondition && categoryCondition;
  });

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
          該当件数: {filteredJobs.length}件
        </h2>

        <div className="flex flex-col gap-4">
          {filteredJobs.map((job) => (
            <JobCard key={job.id} job={job} className="shadow-md bg-white p-4 rounded-lg" />
          ))}
        </div>
      </div>
    </div>
  );
}
