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
  iceCreamRecommendation: string = '';
  iceCreamIcon: string = '';
  weatherIcon: string = '';
  walkIcon: string = '';
  currentMood: string = '';
  rodeMotorcycle: string = '';
  alertTitle: string = '';
  alertMessage: string = '';
  showAlert = false;
  showDropdowns= true;
  isLoading = false;
  isPlaying = false;

  hideAlertModal() {
    this.showAlert = false;
  }

  private apiKey: string = '20d3501773a839af3857d2b0374101f6';
  private apiUrl: string = 'https://api.openweathermap.org/data/2.5/weather';

  constructor(private http: HttpClient) {}

  changeUser() {
    this.stopSound();
    this.showDropdowns = true;
    this.selectedUser = '';
    this.weatherData = null;
    this.currentMood = '';
    this.rodeMotorcycle = '';
  }

  isWalkOClockForAlex(temp: number, windSpeed: number, description: string): boolean {
    if(temp < 45){
      return false;
    }else if(temp >= 45 && temp < 65 && windSpeed >= 10){
      return false;
    }else if(temp >= 95){
      return false;
    }else if (Object.values(description).includes('rain')){
      return false;
    }
    else{
      return true;
    }
  }
  isWalkOClockForIan(temp: number, motorcycle: string): boolean {
    temp = 96;
    if(this.rodeMotorcycle === 'yes'){
      return true;
    }else if(temp < 45 || temp > 95){
      return false;
    }else{
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
    }else if (Object.values(description).includes('moderate rain') || Object.values(description).includes('heavy rain')){
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
    } else if(this.selectedUser === 'Ian'){
      return this.isWalkOClockForIan(temp,this.rodeMotorcycle);
    }else if (this.selectedUser === 'Not a weather wimp') {
      return this.isWalkOClockForNotAWeatherWimp();
    }
    return false;
  }

  isIceCreamWeather(): boolean {
    return this.weatherData.main.temp >= 70;
  }

  audio!: HTMLAudioElement;

  playSound(): void {
    this.audio = new Audio("assets/sounds/didgeridoo.mp3");
    this.audio.load();
    this.audio.play();
    this.isPlaying = true;
  }

  stopSound(): void {
    if (this.audio) {
      this.audio.pause();
      this.audio.currentTime = 0;
      this.isPlaying = false;
    }
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
      return 'assets/icons/sun32.png';
    } else if (description.includes('clear sky')) {
      return 'assets/icons/sun32.png';
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
      this.alertMessage = 'Please select a Corey mood.';
      this.showAlert = true;
      return;
    }
    if (this.selectedUser === 'Ian' && !this.rodeMotorcycle) {
      this.alertTitle = 'Error';
      this.alertMessage = 'Did Ian ride his motorcycle?';
      this.showAlert = true;
      return;
    }

    this.showDropdowns = false;

    try {
      this.isLoading = true;
      const position: any = await this.getUserLocation();
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      const requestUrl = `${this.apiUrl}?lat=${latitude}&lon=${longitude}&appid=${this.apiKey}&units=imperial`;

      this.http.get(requestUrl).subscribe(data => {
        this.weatherData = data;
        console.log(this.weatherData);

        if (this.isIceCreamWeather()) {
          this.iceCreamRecommendation = "It's a great day for ice cream!";
          this.iceCreamIcon = 'assets/icons/pixel-ice.png'
        } else {
          this.iceCreamRecommendation = "Ice cream not recommended, grab a different snack";
          this.iceCreamIcon = 'assets/icons/tear.png'
        }

        this.recommendation = this.isWalkOClock() ? "It's Walk-O-Clock!" : "It's NOT Walk-O-Clock";
        this.walkIcon = this.isWalkOClock() ? 'assets/icons/icons8-walking-32.png' : 'assets/icons/icons8-armchair-32.png';
        this.weatherIcon = this.getWeatherIcon();

        setTimeout(() => {
          this.isLoading = false;
        }, 3000);
      }, (error: any) => {
        console.error('Error fetching weather data:', error);
      });
    } catch (error) {
      console.error('Error getting user location:', error as Error);
      alert((error as Error).message);
      this.isLoading = false;
    }
  }
}
