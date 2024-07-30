export enum ThemeType {
  Light = 'light-theme',
  Dark = 'dark-theme',
}

export interface MenuItem {
  name: string;
  icon: string;
  route: string;
}

export interface About {
  fullName: string;
  profession: string;
  email: string;
  phone: string;
  addresses: string[];
  summary: string;
}

export interface TechItem {
  name: string;
  icon: string;
}
export interface Technology {
  name: string;
  items: TechItem[];
}

export interface Experience {
  title: string;
  startDate: string;
  endDate: string;
  sphere: string;
  description: string;
  roles: string[];
  technologies: string[];
}

export interface Education {
  degree: string;
  major: string;
  school: string;
  location: string;
  startDate: string;
  endDate: string;
}

export interface Language {
  name: string;
  level: string;
}

export interface Contact {
  name: string;
  icon: string;
  link: string;
}

export interface Resume {
  title: string;
  about: About;
  technologies: Technology[];
  experience: Experience[];
  education: Education[];
  languages: Language[];
  interests: string[];
  contacts: Contact[];
}
