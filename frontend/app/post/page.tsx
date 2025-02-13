'use client';

import { Dropdown } from "@/components/dropdown";
import { job_categories } from "@/components/job_categories";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useJobs } from "@/components/jobprovider";

export default function Post() {
    const {addJob} = useJobs();
    const [title, setTitle] = useState("");
    const [selectedCategory, setSelectedCategory] = useState(job_categories[0]);  
    const [income, setIncome] = useState(0);
    const router = useRouter();

    const handleSubmit = async(e: React.FormEvent) => {
        e.preventDefault();
        try {
            const newJob = {
              title,
              category: selectedCategory,
              income,
            };

            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/jobs`
              , {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(newJob),
            });

            if (response.ok) {
                addJob(newJob);  
                setTitle("");
                setSelectedCategory(job_categories[0] || "");  
                setIncome(0);
                router.push("/");
            } else {
                console.error("求人投稿に失敗しました");
            }
        } catch (error) {
            console.error("エラー:", error);
        }
    };

    return (
        <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
          <h1 className="text-2xl font-bold mb-4">求人投稿</h1>
          <form onSubmit={handleSubmit} className="space-y-4"> 
            <div>
              <h2 className="text-lg font-medium">求人カテゴリ</h2>
              <Dropdown selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
            </div>
    
            <div>
              <h2 className="text-lg font-medium">年収(万円)</h2>
              <input
                type="number"
                className="w-full p-2 border border-gray-300 rounded"
                value={income}
                onChange={(e) => setIncome(Number(e.target.value))}
                placeholder="年収を入力"
                required
              />
            </div>
    
            <div>
              <h2 className="text-lg font-medium">求人タイトル</h2>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="求人タイトルを入力"
                required
              />
            </div>
    
            <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">投稿する</button> 
          </form>
        </div>
      );
}
