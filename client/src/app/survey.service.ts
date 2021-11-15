import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SurveyService {

  uri = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  getSurveys() {
    return this.http.get(`${this.uri}/surveys`);
  }

  getSurveyById(id: any) {
    return this.http.get(`${this.uri}/surveys/${id}`);
  }

  addSurvey(surveyName: string, author: string, expirationDate: string) {
    const survey = {
      surveyName: surveyName,
      author: author,
      expirationDate: expirationDate
    };
    return this.http.post(`${this.uri}/surveys/add`, survey);
  }

  updateSurvey(id: any, surveyName: string, author: string, expirationDate: string) {
    const survey = {
      surveyName: surveyName,
      author: author,
      expirationDate: expirationDate
    };
    return this.http.post(`${this.uri}/surveys/update/${id}`, survey);
  }

  deleteSurvey(id: any) {
    return this.http.get(`${this.uri}/surveys/delete/${id}`);
  }
}
