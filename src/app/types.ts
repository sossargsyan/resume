export enum ThemeType {
  Light = 'light-theme',
  Dark = 'dark-theme',
}

export interface MenuItem {
  name: string;
  icon: string;
  route: string;
}

export interface Certificate {
  name: string;
  source: string;
  image: string;
}

export interface About {
  fullName: string;
  profession: string;
  email: string;
  phone: string;
  addresses: string[];
  summary: string;
  certificates?: Certificate[];
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
  startDate: string;
  endDate: string;
}

export interface Language {
  name: string;
  level: string;
}

export interface Interest {
  name: string;
  description?: string;
  humorousDescription?: string;
  icon?: string;
}

export interface ConnectItem {
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
  interests: Interest[];
  connect: ConnectItem[];
}
