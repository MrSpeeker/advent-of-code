import { Component, inject, OnInit } from '@angular/core';
import { TestDataService } from '../../services/test-data.service';

@Component({
  selector: 'app-day-1',
  standalone: true,
  imports: [],
  templateUrl: './day-1.component.html',
  styleUrl: './day-1.component.scss'
})
export class Day1Component implements OnInit {
  private readonly testDataService = inject(TestDataService);

  public listOne: number[] = [];
  public listTwo: number[] = [];

  public locationIdPartOne = 0;
  public locationIdPartTwo = 0;

  async ngOnInit() {
    await this.splitDataIntoArrays();
    this.orderList();

    const [differenceArray, similarityDifferenceArray] = this.calculateDifferencesAndSimilarities();
    this.locationIdPartOne = this.getSumOfArray(differenceArray);
    this.locationIdPartTwo = this.getSumOfArray(similarityDifferenceArray);
  }

  private async splitDataIntoArrays() {
    // Get the test data from the api.
    const apiDataArray = await this.testDataService.fetchTestData('2024', '1');

    // This will populate listOne and listTwo with the proper values.
    const tempArray = apiDataArray.split('\n');
    tempArray.forEach(value => {
      let result = value.split(/\s+/).map(Number);
      if (result && result.length !== 1) {
        this.listOne.push(result[0]);
        this.listTwo.push(result[1]);
      }
    });
  }

  // Order list from smallest to largest
  private orderList() {
    this.listOne.sort((a: number, b: number) => {
      return a - b;
    });
    this.listTwo.sort((a: number, b: number) => {
      return a - b;
    });
  }

  private calculateDifferencesAndSimilarities(): [number[], number[]] {
    const differenceArray = [];
    for (let i = 0; i < this.listOne.length; i++) {
      const valueOne = this.listOne[i];
      const valueTwo = this.listTwo[i];

      differenceArray.push(Math.abs(valueOne - valueTwo));
    }

    const similarityDifferenceArray = [];
    for (let i = 0; i < this.listOne.length; i++) {
      const valueOne = this.listOne[i];
      similarityDifferenceArray.push(valueOne * this.listTwo.filter((x: number) => x === valueOne).length);
    }

    return [differenceArray, similarityDifferenceArray];
  }

  // Get sums of values.
  private getSumOfArray(differenceArray: number[]) {
    return differenceArray.reduce((previous, current) => previous + current, 0);
  }
}


