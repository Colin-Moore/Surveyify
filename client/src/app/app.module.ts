import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './partials/header/header.component';
import { FooterComponent } from './partials/footer/footer.component';
import { HomeComponent } from './pages/home/home.component';
import { AddSurveyComponent } from './pages/add-survey/add-survey.component';
import { MySurveysComponent } from './pages/my-surveys/my-surveys.component';

import { SurveyService } from './survey.service'; 

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    AddSurveyComponent,
    MySurveysComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [SurveyService],
  bootstrap: [AppComponent]
})
export class AppModule { }
