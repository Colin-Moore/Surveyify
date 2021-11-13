import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddSurveyComponent } from './pages/add-survey/add-survey.component';
import { HomeComponent } from './pages/home/home.component';
import { MySurveysComponent } from './pages/my-surveys/my-surveys.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'add', component:AddSurveyComponent},
  {path: 'mySurveys', component:MySurveysComponent},
  {path: '', redirectTo:'/home', pathMatch:'full' }
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
