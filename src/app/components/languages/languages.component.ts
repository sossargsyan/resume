import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';

import { Language } from '../../types';

@Component({
  selector: 'app-languages',
  standalone: true,
  imports: [MatCardModule, MatDividerModule],
  templateUrl: './languages.component.html',
  styleUrl: './languages.component.scss',
})
export class LanguagesComponent {
  @Input() data!: Language[];
}
