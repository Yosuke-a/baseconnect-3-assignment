"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { addJobToDB } from "@/components/actions";
import { Dropdown } from "@/components/dropdown";
import { job_categories } from "@/components/job_categories";

export default function Post() {
  const [title, setTitle] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(job_categories[0]);  
  const [income, setIncome] = useState(0);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("category", selectedCategory);
    formData.append("income", String(income));

    const response = await addJobToDB(formData);

    if (!response.success) {
      console.error("求人投稿エラー:", response.message);
      return;
    }

    setTitle("");
    setSelectedCategory(job_categories[0]);
    setIncome(0);
    router.push("/");
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold mb-4">求人投稿</h1>
      <form onSubmit={handleSubmit} className="space-y-4"> 
        <Dropdown selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
        <input type="number" value={income} onChange={(e) => setIncome(Number(e.target.value))} />
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        <button type="submit">投稿する</button> 
      </form>
    </div>
  );
}
