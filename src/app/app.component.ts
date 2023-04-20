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
  recommendation: string = '';
  weatherIcon: string = '';
  walkIcon: string = '';


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
  
          // Set the recommendation message based on the user and weather criteria
          if (this.selectedUser === 'Alex' && this.weatherData.main.temp >= 60 && this.weatherData.main.temp <= 79) {
            this.recommendation = "It's Walk-O-Clock!";
            this.walkIcon = '../assets/icons/icons8-walking-64.png'
          } else if (this.selectedUser === 'Corey' && this.weatherData.main.temp >= 70 && this.weatherData.main.temp <= 79) {
            this.recommendation = "Get up Corey, It's Walk-O-Clock!";
            this.walkIcon = '../assets/icons/icons8-walking-64.png'
          } else if (this.selectedUser === 'Not a weather wimp') {
            this.recommendation = "It's always Walk-O-Clock!";
            this.walkIcon = '../assets/icons/icons8-walking-64.png'
          } else {
            this.recommendation = "It's NOT Walk-O-Clock";
            this.walkIcon = '../assets/icons/icons8-armchair-64.png'
          }
          if (this.weatherData.weather[0].description.includes('clouds')) {
            this.weatherIcon = '../assets/icons/icons8-cloud-32.png';
          }
          if (this.weatherData.weather[0].description.includes('rain')) {
            this.weatherIcon = '../assets/icons/icons8-rain-32.png';
          }
          if (this.weatherData.weather[0].description.includes('haze')) {
            this.weatherIcon = '../assets/icons/icons8-haze-32.png';
          }
          if (this.weatherData.weather[0].description.includes('storm')) {
            this.weatherIcon = '../assets/icons/icons8-storm-32.png';
          }
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