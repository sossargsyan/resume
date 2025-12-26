import { Component, input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';

import { Language } from '../../types';

@Component({
    selector: 'app-languages',
    imports: [MatCardModule, MatDividerModule],
    templateUrl: './languages.component.html',
    styleUrl: './languages.component.scss'
})
export class LanguagesComponent {
  data = input.required<Language[]>();
}
