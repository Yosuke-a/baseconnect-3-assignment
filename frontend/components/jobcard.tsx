interface Job {
  title: string;
  category: string;
  income: number;
}

interface JobCardProps {
  job: Job;
  className?: string;
}

export function JobCard({ job, className = "" }: JobCardProps) {
  return (
    <div className={`border border-gray-300 p-4 rounded-lg shadow-sm ${className}`}>
      <h3 className="text-lg font-semibold">{job.title}</h3>
      <p className="text-gray-600">カテゴリ: {job.category}</p>
      <p className="text-gray-800 font-medium">年収: {job.income}万円</p>
    </div>
  );
}
