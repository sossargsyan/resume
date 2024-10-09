import { Component, input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';

import { About } from '../../types';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [MatCardModule, MatDividerModule, MatIconModule, MatExpansionModule],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
})
export class AboutComponent {
  data = input.required<About>();

  openCertificate(image: string) {
    window.open(`/assets/images/certificates/${image}`, '_blank');
  }
}
