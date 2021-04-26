import { Component, Input, OnInit } from '@angular/core';
import { QuestionsService } from '../questions.service';
import { CodeEvaluationRequest} from '../code-evaluation-request-payload';
import { CodeEvaluationResponse} from '../code-evaluation-response-payload';
import { QuestionsResponse } from '../home-page/questions-response.payload';

@Component({
  selector: 'app-code-submission-result',
  templateUrl: './code-submission-result.component.html',
  styleUrls: ['./code-submission-result.component.css']
})
export class CodeSubmissionResultComponent implements OnInit {

  
  @Input() questionId:number;  
  response:CodeEvaluationResponse | null;
  constructor(private questionsService:QuestionsService) { }

  ngOnInit(): void {    
  }
  submitCodeForEvaluation(){    
    this.response = null;   
    var codeEvaluationRequest:CodeEvaluationRequest = {
      'questionId' : this.questionId,
      'lang' : 'c',
      'source' : '#include <stdio.h>\n int main() { printf("Hello World Lakhan "); return 0;}'
    }  
    this.questionsService.submitCodeForEvaluation(codeEvaluationRequest).subscribe(response => this.response = response);    
  }
}
