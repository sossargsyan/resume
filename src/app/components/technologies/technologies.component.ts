import { Component, input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

import { Technology } from '../../types';

@Component({
  selector: 'app-technologies',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './technologies.component.html',
  styleUrl: './technologies.component.scss',
})
export class TechnologiesComponent {
  data = input.required<Technology[]>();
}
