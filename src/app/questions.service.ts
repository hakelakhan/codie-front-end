import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { baseUrl } from 'src/environments/environment';
import { QuestionsResponse } from './home-page/questions-response.payload';
import { HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class QuestionsService {
  headers:HttpHeaders = new HttpHeaders()
                        .set('Authorization', 'Bearer eyJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJoYWtlbGFraGFuQHlhaG9vLmNvbSIsImlhdCI6MTYxOTA4OTEyNywiZXhwIjoxNjE5MDkzMTI3fQ.ea7aj9egTJqpUPAgrnN0JBZ-ufBGKtFKVpN19zYYhohxJQlyPmTV2L0jBmgQjLw_MYBuF76uen8Wk_90_1ZPstpGQuMkwVQloF8jbyIyVfFWjLIX5PJrEWJFFB0hl-JFfFuUcw2urSynfsxfF61tjkn9ByNqAi-FoCuhLwJPvHxsCld1l7Oa0zrekw9DMVlXkhkEUw2SzR6uhfyLWTsHcQ_zYp4fjsUD3ZQaJmSW084LLShrSapjI_mETviqWxrt6-_hrTUQtM_vMmNptsrl8bZJiJ8u9FQcmKExkeywWfokiWbpsIwmqiY52mCsDc9cruFWUIxOZke3GFobwBtU9A');                        

  constructor(private http:HttpClient) { }

  getListOfQuestions():Observable<QuestionsResponse[]> {    
    return this.http.get<QuestionsResponse[]>(baseUrl + 'api/questions/coding-question/get', { 'headers': this.headers });
  

  }
}
