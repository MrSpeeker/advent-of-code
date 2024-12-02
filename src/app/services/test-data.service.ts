import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class TestDataService {
    constructor(private http: HttpClient) { }

    public async fetchTestData(year: string, day: string): Promise<string> {
        // Get the test data from local storage if it exists.
        const result = localStorage.getItem(`${year} - ${day}`);
        if (result) {
            return result;
        }

        // Get the test data from web site.
        const url = `http://localhost:3000/fetch-data?year=${year}&day=${day}`;
        const response = await this.http
            .get(url, { responseType: 'text' })
            .toPromise();

        // Covert text to array and save it to local storage.

        if (response) {
            localStorage.setItem(`${year} - ${day}`, response);
            return response;
        }

        return '';
    }
}

