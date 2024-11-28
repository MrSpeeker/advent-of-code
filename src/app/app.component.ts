import { Component, OnInit } from '@angular/core';
import { Day1Component } from './2023/day-1/day-1.component';
import { CalendarModule } from 'primeng/calendar';
import { FormsModule } from '@angular/forms';
import { Day2Component } from './2023/day-2/day-2.component';
import { CommonModule, NgSwitch } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CalendarModule, FormsModule, Day1Component, Day2Component],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'advent-of-code';
  selectedDate: Date = new Date(2023, 11, 1);
  sanitizedUrl!: SafeResourceUrl;

  constructor(private sanitizer: DomSanitizer) { }

  getUrl() {
    // const url = `https://adventofcode.com/${this.selectedDate.getFullYear()}/day/${this.selectedDate.getDate()}`;
    // return this.sanitizer.bypassSecurityTrustResourceUrl(url);
    // how to cache this value
    // return `https://adventofcode.com/${this.selectedDate.getFullYear()}/day/${this.selectedDate.getDate()}`;
  }
}
