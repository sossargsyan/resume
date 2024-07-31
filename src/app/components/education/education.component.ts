import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';

import { Education } from '../../types';

@Component({
  selector: 'app-education',
  standalone: true,
  imports: [MatCardModule, MatDividerModule],
  templateUrl: './education.component.html',
  styleUrl: './education.component.scss',
})
export class EducationComponent {
  @Input() data!: Education[];
}
