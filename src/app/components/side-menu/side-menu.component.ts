import { Component, OnInit, signal } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router } from '@angular/router';

import { sections } from '../../constants';
import { MenuItem } from '../../types';

@Component({
  selector: 'app-side-menu',
  standalone: true,
  imports: [MatListModule, MatButtonModule, MatIconModule],
  templateUrl: './side-menu.component.html',
  styleUrl: './side-menu.component.scss',
})
export class SideMenuComponent implements OnInit {
  menuList = signal<MenuItem[]>(sections);
  activeSection = signal<string>(sections[0].route);

  constructor(private _route: ActivatedRoute, private _router: Router) {}

  onItemClicked(item: MenuItem) {
    this.scrollToSection(item.route);
  }

  scrollToSection(route: string) {
    const element = document.getElementById(route);
    if (element) {
      this.activeSection.set(route);
      element.scrollIntoView({ behavior: 'smooth' });
      this._router.navigate([], {
        fragment: route,
      });
    }
  }

  ngOnInit(): void {
    this._route.fragment.subscribe((fragment) => {
      if (fragment) {
        this.scrollToSection(fragment);
      }
    });
  }
}
