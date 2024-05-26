import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { options } from '../../constants/options';

interface District {
  name: string;
  description: string;
  identifier: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  options: District[] = options;
}
