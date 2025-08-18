import { StaticImport } from "next/dist/shared/lib/get-img-props";
import { ReactNode } from "react";

export type TProject = {
  id: string;
  name: string;
  featured: boolean;
  description: string[];
  technologies: string[];
  image: string | StaticImport;
  live_url?: string;
  github_url?: string;
  created_at: string;
};

export type Service = {
  icon: ReactNode | string;
  title: string;
  description: string;
};

export type IExperience = {
  role: string;
  company: string;
  description: string[];
  technologies: string[];
  from: string;
  to: string;
};
