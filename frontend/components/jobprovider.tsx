"use client";

import { createContext, useContext, useState } from "react";

interface Job {
  title: string;
  category: string;
  income: number;
}

interface JobsContextType {
  jobs: Job[];
  addJobs: (newJobs: Job[]) => void;
  addJob: (newJob: Job) => void; 
}

const JobsContext = createContext<JobsContextType | undefined>(undefined);

export function JobsProvider({ children }: { children: React.ReactNode }) {
  const [jobs, setJobs] = useState<Job[]>([]);

  const addJobs = (newJobs: Job[]) => {
    setJobs(newJobs);
  };

  const addJob = (newJob: Job) => {
    setJobs((prevJobs) => [...prevJobs, newJob]);
  };

  return (
    <JobsContext.Provider value={{ jobs, addJobs, addJob }}>
      {children}
    </JobsContext.Provider>
  );
}

export function useJobs() {
  const context = useContext(JobsContext);
  if (!context) {
    throw new Error("useJobs must be used within a JobsProvider");
  }
  return context;
}
