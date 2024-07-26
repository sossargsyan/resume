import { Component, HostBinding } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';

import { ThemeType } from './types';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    MatSidenavModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'Resume';
  @HostBinding('class')
  currentTheme: ThemeType =
    (localStorage.getItem('theme') as ThemeType) || ThemeType.Dark;

  isDarkMode: boolean = this.currentTheme === ThemeType.Dark;

  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
    if (this.isDarkMode) {
      localStorage.setItem('theme', ThemeType.Dark);
      this.currentTheme = ThemeType.Dark;
    } else {
      localStorage.setItem('theme', ThemeType.Light);
      this.currentTheme = ThemeType.Light;
    }
  }
}
