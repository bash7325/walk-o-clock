import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Walk-O-Clock?';
  selectedUser: string = '';
  weatherData: any;

  private apiKey: string = '20d3501773a839af3857d2b0374101f6';
  private apiUrl: string = 'https://api.openweathermap.org/data/2.5/weather';

  constructor(private http: HttpClient) {}

  getWeather() {
    if (!this.selectedUser) {
      alert('Please select a user.');
      return;
    }

    // Add your desired city name or coordinates
    const city = 'London';
    const requestUrl = `${this.apiUrl}?q=${city}&appid=${this.apiKey}&units=metric`;

    this.http.get(requestUrl).subscribe(data => {
      this.weatherData = data;
      console.log(this.weatherData);
    }, error => {
      console.error('Error fetching weather data:', error);
    });
  }
}

