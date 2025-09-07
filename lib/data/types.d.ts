type DataAboutPhrase = {
  value: string;
  highlight?: boolean;
  bold?: boolean;
  href?: string;
  noRightMargin?: boolean;
};

type Socials = "bluesky" | "github" | "instagram" | "linkedin" | "twitter";

type DataAbout = {
  title: string;
  caption: string;
  description: string;
  about: DataAboutPhrase[][];
  recentTechnologies: string[];
  handles: Record<Socials, string>;
};

type DataTechnology = {
  icon: React.ElementType;
  name: string;
};

type DataExperience = {
  role: string;
  company: string;
  description: string[];
  technologies: string[];
  from: string;
  to: string;
};

type DataProject = {
  id: string;
  name: string;
  featured: boolean;
  description: string[];
  technologies: string[];
  image: string;
  live_url?: string;
  github_url?: string;
  created_at: string;
};

type DataService = {
  icon: React.ElementType;
  title: string;
  description: string;
};
