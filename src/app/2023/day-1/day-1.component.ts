import { Component, inject, OnInit } from '@angular/core';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { TestDataService } from '../../services/test-data.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-day-1',
  standalone: true,
  imports: [ToggleButtonModule, FormsModule],
  templateUrl: './day-1.component.html',
  styleUrl: './day-1.component.scss',
})
export class Day1Component implements OnInit {
  private testDataService = inject(TestDataService);
  private readonly stringValues: Record<string, number> = {
    one: 1,
    two: 2,
    three: 3,
    four: 4,
    five: 5,
    six: 6,
    seven: 7,
    eight: 8,
    nine: 9,
  };

  public valueTotal = 0;
  public part1 = true;

  async ngOnInit() {
    this.init();
  }

  extractDigitsPartOne(calibrationValue: string): number {
    const result = calibrationValue.match(/\d/g);
    if (result) {
      const first = result[0];
      const last = result[result.length - 1];
      return Number(first + last);
    }

    return 0;
  }

  extractDigitsPartTwo(calibrationValue: string): number {
    const regex = /(\d)|(?=(one|two|three|four|five|six|seven|eight|nine))/g;
    let m;
    let result = [];
    while ((m = regex.exec(calibrationValue)) !== null) {
      // This is necessary to avoid infinite loops with zero-width matches
      if (m.index === regex.lastIndex) {
        regex.lastIndex++;
      }

      // The result can be accessed through the m-variable.
      for (let groupIndex = 0; groupIndex < m.length; groupIndex++) {
        const match = m[groupIndex];
        if (match) {
          result.push(match);
          break;
        }
      }
    }

    if (result) {
      const firstIndex = result[0];
      const lastIndex = result[result.length - 1];
      const first =
        isNaN(Number(firstIndex))
          ? this.covertStringToNumber(firstIndex)
          : firstIndex;
      const last =
        isNaN(Number(lastIndex))
          ? this.covertStringToNumber(lastIndex)
          : lastIndex;
      return Number(first.toString() + last.toString());
    }
    return 0;
  }

  covertStringToNumber(stringNumber: string): number {
    return this.stringValues[stringNumber] || 0;
  }

  sumOfAllDigits(calibratedList: number[]) {
    this.valueTotal = calibratedList.reduce((previousValue, currentValue) => {
      return previousValue + currentValue;
    });
  }

  async init() {
    let digitArray: number[] = [];
    const apiDataArray = await this.testDataService.fetchTestData('2023', '1');

    apiDataArray.forEach((calibrationValue: string) => {
      digitArray.push(
        this.part1
          ? this.extractDigitsPartOne(calibrationValue)
          : this.extractDigitsPartTwo(calibrationValue)
      );
    });

    this.sumOfAllDigits(digitArray);
  }

  changePart() {
    this.part1 = !this.part1;
    this.init();
  }
}