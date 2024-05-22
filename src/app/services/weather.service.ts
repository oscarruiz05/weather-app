import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(
    private http: HttpClient
  ) { }

  getWeather(identifier: 'TOP' | 'LWX'): Observable<any> {
    return this.http.get<any>(`https://api.weather.gov/gridpoints/${identifier}/31,80/forecast`);
  }
}
