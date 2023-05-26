import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-splash-screen',
  templateUrl: './splash-screen.component.html',
  styleUrls: ['./splash-screen.component.css']
})
export class SplashScreenComponent implements OnInit {
  constructor(private router: Router) { }
  
  ngOnInit(): void {
    setTimeout(() => {
      this.router.navigate(['/app']);
    }, 5000);  // Set a timeout for 5 seconds
  }
}
