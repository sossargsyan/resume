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
