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
  currentMood: string = '';
  alertTitle: string = '';
  alertMessage: string = '';
  showAlert = false;

  hideAlertModal() {
    this.showAlert = false;
  }

  private apiKey: string = '20d3501773a839af3857d2b0374101f6';
  private apiUrl: string = 'https://api.openweathermap.org/data/2.5/weather';

  constructor(private http: HttpClient) {}

  isWalkOClockForAlex(temp: number, windSpeed: number, description: string): boolean {
    if(temp < 45){
      return false;
    }else if(temp >= 45 && temp < 65 && windSpeed >= 10){
      return false;
    }else if(temp >= 95){
      return false;
    }else if (description.includes('rain')){
      return false;
    }
    else{
      return true;
    }
  }
  
  isWalkOClockForCorey(temp: number, description: string, mood: string): boolean {
    if (mood === 'happy') {
      return temp >= 60 && temp <= 79;
    } else if (mood === 'sad') {
      return temp >= 70 && temp <= 79;
    } else if (mood === 'sheldonYelled') {
      return temp >= 70 && temp <= 79;
    }else if (description.includes('light rain')){
      return false;
    } else { //this is the neatral mood logic
      return temp >= 68 && temp <= 79;
    }
  }
  
  isWalkOClockForNotAWeatherWimp(): boolean {
    return true;
  }
  
  isWalkOClock() {
    const temp = Math.round(this.weatherData.main.temp);
    const windSpeed = this.weatherData.wind.speed;
    const description = this.weatherData.weather[0].description;

    if (this.selectedUser === 'Alex') {
      return this.isWalkOClockForAlex(temp, windSpeed,description);
    } else if (this.selectedUser === 'Corey') {
      return this.isWalkOClockForCorey(temp, windSpeed, this.currentMood);
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
    }  else if (description.includes('snow')) {
      return 'assets/icons/icons8-snow-32.png';
    } else if (description.includes('sun')) {
      return 'assets/icons/icons8-haze-32.png';
    } else if (description.includes('clear sky')) {
      return 'assets/icons/icons8-haze-32.png';
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
      this.alertTitle = 'Error';
      this.alertMessage = 'Please select a user.';
      this.showAlert = true;
      return;
    }
  
    if (this.selectedUser === 'Corey' && !this.currentMood) {
      this.alertTitle = 'Error';
      this.alertMessage = 'Please select a mood.';
      this.showAlert = true;
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
