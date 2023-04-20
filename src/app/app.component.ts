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
  
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        const requestUrl = `${this.apiUrl}?lat=${latitude}&lon=${longitude}&appid=${this.apiKey}&units=imperial`;
  
        this.http.get(requestUrl).subscribe(data => {
          this.weatherData = data;
          console.log(this.weatherData);
        }, error => {
          console.error('Error fetching weather data:', error);
        });
      }, (error) => {
        console.error('Error getting user location:', error);
      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }
}
