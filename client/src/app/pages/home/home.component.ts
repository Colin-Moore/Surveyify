import { Component, OnInit } from '@angular/core';
import { SurveyService } from 'src/app/survey.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private surveyService: SurveyService) { }

  ngOnInit(): void {
    this.surveyService.getSurveys().subscribe((surveys) => {
      console.log(surveys);
    })
  }

}
