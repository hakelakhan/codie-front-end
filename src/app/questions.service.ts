import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { CodeEvaluationRequest } from './code-evaluation-request-payload';
import { CodeEvaluationResponse } from './code-evaluation-response-payload';
import { QuestionsResponse } from './home-page/questions-response.payload';



@Injectable({
  providedIn: 'root'
})
export class QuestionsService {
  baseUrl:string = environment.baseUrl;
  getNextUnsolvedQuestionId(questionId: number): number {
    const nextQuestionId:number = ++questionId;
    return nextQuestionId;
  }  
  //headers:HttpHeaders = new HttpHeaders()
    //                    .set('Authorization', authService.getJwtToken());                        

  constructor(private http:HttpClient) { }

  getListOfQuestions():Observable<QuestionsResponse[]> {    
    //return this.http.get<QuestionsResponse[]>(baseUrl + 'api/questions/coding-question/get', { 'headers': this.headers });
    return this.http.get<QuestionsResponse[]>(this.baseUrl + 'api/questions/coding-question/get');
  }
  getQuestionById(questionId:number):Observable<QuestionsResponse> {
    //return this.http.get<QuestionsResponse>(baseUrl + 'api/questions/coding-question/get/' + questionId, { 'headers': this.headers });
    return this.http.get<QuestionsResponse>(this.baseUrl + 'api/questions/coding-question/get/' + questionId);
  }

  submitCodeForEvaluation(codeEvaluationRequest:CodeEvaluationRequest):Observable<CodeEvaluationResponse> {
    return this.http.post<CodeEvaluationResponse>(this.baseUrl + 'api/submissions/problem', codeEvaluationRequest).pipe(map(response => {
      console.log(response);
      return response;
    }));      
  }  
}
