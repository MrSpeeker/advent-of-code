import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { Day1Component } from './2024/day-1/day-1.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CalendarModule, FormsModule, Day1Component],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'advent-of-code';
  selectedDate: Date = new Date(2023, 11, 1);
}
