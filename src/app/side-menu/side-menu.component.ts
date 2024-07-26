import { Component } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { MenuItem } from '../types';
import { sections } from '../constants';

@Component({
  selector: 'app-side-menu',
  standalone: true,
  imports: [MatListModule, MatButtonModule, MatIconModule],
  templateUrl: './side-menu.component.html',
  styleUrl: './side-menu.component.scss',
})
export class SideMenuComponent {
  sections: MenuItem[] = sections;

  onItemClicked(item: MenuItem) {
    this.sections = this.sections.map((section) => {
      if (section.name === item.name) {
        return { ...section, isActive: true };
      }
      return { ...section, isActive: false };
    });
  }
}
