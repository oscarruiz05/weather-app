import { CommonModule, JsonPipe } from '@angular/common';
import { WeatherService } from './../../services/weather.service';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { District } from '../../interfaces/district';
import { options } from '../../constants/options';
import { ChartConfiguration, ChartOptions, ChartType } from 'chart.js';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-weather',
  standalone: true,
  imports: [JsonPipe, CommonModule],
  templateUrl: './weather.component.html',
  styleUrl: './weather.component.css'
})
export class WeatherComponent implements OnInit {

  @ViewChild('canvas', { static: false }) canvas!: ElementRef<any>;
  @Input() identifier!: string;

  weatherForecast: any;
  errorMessage: string = '';
  district!: District | undefined;
  chart: any = [];

  // Config chart
  lineChartData: ChartConfiguration['data'] = {
    datasets: [],
    labels: []
  };
  lineChartOptions: ChartOptions = {
    responsive: true,
  };
  lineChartType: ChartType = 'line';

  constructor(
    private weatherService: WeatherService
  ) { }

  ngOnInit(): void {
    this.getWeather();
  }

  getWeather(): void {
    this.weatherService.getWeather(this.identifier).subscribe((data: any) => {
      console.log("🚀 ~ WeatherComponent ~ this.weatherService.getWeather ~ data:", data)
      this.weatherForecast = data.properties;
      this.district = options.find(item => item.identifier == this.identifier);
      this.prepareChartData();
    });
  }

  prepareChartData(): void {
    const labels = this.weatherForecast.periods.map((period: any) => period.name);
    const temperatures = this.weatherForecast.periods.map((period: any) => period.temperature);
    const precipitation = this.weatherForecast.periods.map((period: any) => period.probabilityOfPrecipitation.value);

    this.chart = new Chart(this.canvas.nativeElement, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [
          {
            data: temperatures,
            label: 'Temperature (°F)',
            borderColor: 'rgba(75, 192, 192, 1)',
            fill: false,
            tension: 0.1
          },
          {
            data: precipitation,
            label: 'Precipitation (%)',
            borderColor: 'rgba(255, 99, 132, 1)',
            fill: false,
            tension: 0.1
          }
        ]
      },
      options: {
        plugins: {

        }
      }
    });
  }
}
