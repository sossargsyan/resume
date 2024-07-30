import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatChipsModule } from '@angular/material/chips';

import { Experience } from '../../types';

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [MatCardModule, MatDividerModule, MatChipsModule],
  templateUrl: './experience.component.html',
  styleUrl: './experience.component.scss',
})
export class experienceComponent {
  @Input() data!: Experience[];
}
