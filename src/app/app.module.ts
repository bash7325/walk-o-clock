import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms'; 

import { AppComponent } from './app.component';
import { APP_BASE_HREF } from '@angular/common';
import { CapitalizePipe } from './capitalize.pipe';
import { AlertModalComponent } from './modal.component';
import { SplashScreenComponent } from './splash-screen/splash-screen.component';
import { RouterModule, Routes } from '@angular/router';
import { RootComponent } from './root/root.component';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';

const appRoutes: Routes = [
  { path: 'app', component: AppComponent },
  { path: '', component: SplashScreenComponent, pathMatch: 'full' },
  { path: '**', redirectTo: '/' }
];


@NgModule({
  declarations: [
    AppComponent,
    CapitalizePipe,
    AlertModalComponent,
    SplashScreenComponent,
    RootComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    FormsModule 
  ],
  providers: [
    { provide: APP_BASE_HREF, useValue: '!' },
    {provide: LocationStrategy, useClass: HashLocationStrategy}
  ],
  bootstrap: [RootComponent]
})
export class AppModule { }
