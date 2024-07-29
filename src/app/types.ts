export enum ThemeType {
  Light = 'light-theme',
  Dark = 'dark-theme',
}

export interface MenuItem {
  name: string;
  icon: string;
  route: string;
  isActive?: boolean;
}

export interface About {
  fullName: string;
  profession: string;
  email: string;
  phone: string;
  addresses: string[];
  summary: string;
}

export interface Technology {
  name: string;
  items: string[];
}

export interface Experience {
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface Education {
  degree: string;
  major: string;
  school: string;
  location: string;
  startDate: string;
  endDate: string;
}

export interface Skill {
  name: string;
  level: string;
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
  skills: Skill[];
  languages: Language[];
  interests: string[];
  contacts: Contact[];
}
