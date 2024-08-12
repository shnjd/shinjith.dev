import { StaticImport } from "next/dist/shared/lib/get-img-props";
import { ReactNode } from "react";

export interface TProject {
  id: string;
  name: string;
  featured: boolean;
  description: string[];
  technologies: string[];
  image: string | StaticImport;
  live_url: string;
  github_url: string;
}

export interface Service {
  icon: ReactNode | string;
  title: string;
  description: string;
}
