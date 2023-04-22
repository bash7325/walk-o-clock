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

  isWalkOClockForAlex(temp: number): boolean {
    return temp >= 60 && temp <= 79;
  }
  
  isWalkOClockForCorey(temp: number, windSpeed: number): boolean {
    return temp >= 70 && temp <= 79 && windSpeed < 10;
  }
  
  
  isWalkOClockForNotAWeatherWimp(): boolean {
    return true;
  }
  
  isWalkOClock() {
    const temp = Math.round(this.weatherData.main.temp);
    const windSpeed = this.weatherData.wind.speed;
  
    if (this.selectedUser === 'Alex') {
      return this.isWalkOClockForAlex(temp);
    } else if (this.selectedUser === 'Corey') {
      return this.isWalkOClockForCorey(temp, windSpeed);
    } else if (this.selectedUser === 'Not a weather wimp') {
      return this.isWalkOClockForNotAWeatherWimp();
    }
    return false;
  }
  

  getWeatherIcon() {
    const description = this.weatherData.weather[0].description;

    if (description.includes('clouds')) {
      return 'assets/icons/icons8-cloud-32.png';
    } else if (description.includes('rain')) {
      return 'assets/icons/icons8-rain-32.png';
    } else if (description.includes('haze')) {
      return 'assets/icons/icons8-haze-32.png';
    } else if (description.includes('storm')) {
      return 'assets/icons/icons8-storm-32.png';
    }
    return '';
  }

  getUserLocation() {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      } else {
        reject(new Error("Geolocation is not supported by this browser."));
      }
    });
  }

  async getWeather() {
    if (!this.selectedUser) {
      alert('Please select a user.');
      return;
    }

    try {
      const position: any = await this.getUserLocation();
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      const requestUrl = `${this.apiUrl}?lat=${latitude}&lon=${longitude}&appid=${this.apiKey}&units=imperial`;

      this.http.get(requestUrl).subscribe(data => {
        this.weatherData = data;
        console.log(this.weatherData);

        this.recommendation = this.isWalkOClock() ? "It's Walk-O-Clock!" : "It's NOT Walk-O-Clock";
        this.walkIcon = this.isWalkOClock() ? 'assets/icons/icons8-walking-32.png' : 'assets/icons/icons8-armchair-32.png';
        this.weatherIcon = this.getWeatherIcon();
      }, error => {
        console.error('Error fetching weather data:', error);
      });
    } catch (error) {
      console.error('Error getting user location:', error as Error);
      alert((error as Error).message);
    }
  }
}
