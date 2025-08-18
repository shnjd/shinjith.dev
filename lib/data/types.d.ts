type DataAboutPhrase = {
  value: string;
  highlight?: boolean;
  bold?: boolean;
  href?: string;
  noRightMargin?: boolean;
};

type DataAbout = {
  title: string;
  caption: string;
  description: string;
  about: DataAboutPhrase[][];
  recentTechnologies: string[];
};

type Technology = {
  icon: React.ElementType;
  name: string;
};
