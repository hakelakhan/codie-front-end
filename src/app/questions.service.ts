import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { baseUrl } from 'src/environments/environment';
import { QuestionsResponse } from './home-page/questions-response.payload';
import { HttpHeaders } from '@angular/common/http';
import { AuthenticationService } from './authentication.service';


@Injectable({
  providedIn: 'root'
})
export class QuestionsService {  
  //headers:HttpHeaders = new HttpHeaders()
    //                    .set('Authorization', authService.getJwtToken());                        

  constructor(private http:HttpClient) { }

  getListOfQuestions():Observable<QuestionsResponse[]> {    
    //return this.http.get<QuestionsResponse[]>(baseUrl + 'api/questions/coding-question/get', { 'headers': this.headers });
    return this.http.get<QuestionsResponse[]>(baseUrl + 'api/questions/coding-question/get');
  }
  getQuestionById(questionId:number):Observable<QuestionsResponse> {
    //return this.http.get<QuestionsResponse>(baseUrl + 'api/questions/coding-question/get/' + questionId, { 'headers': this.headers });
    return this.http.get<QuestionsResponse>(baseUrl + 'api/questions/coding-question/get/' + questionId);
  }
}
