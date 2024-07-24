import { StaticImport } from "next/dist/shared/lib/get-img-props";

export interface TProject {
  id: string;
  name: string;
  description: string[];
  technologies: string[];
  image: string | StaticImport;
  live_url: string;
  github_url: string;
}
