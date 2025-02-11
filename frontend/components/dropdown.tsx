'use client';
import { job_categories } from "@/app/page";

interface DropdownProps {
  selectedCategory: string;
  setSelectedCategory: React.Dispatch<React.SetStateAction<string>>; 
}

export const Dropdown = ({ selectedCategory, setSelectedCategory }: DropdownProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value); 
  };

  return (
    <select value={selectedCategory} onChange={handleChange}>
      <option value="" disabled>カテゴリを選択</option> 
      {job_categories.map((job_category) => (
        <option key={job_category} value={job_category}>
          {job_category}
        </option>
      ))}
    </select>
  );
};
