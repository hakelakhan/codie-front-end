import { Component, OnInit } from '@angular/core';
import { QuestionsService } from '../questions.service';
import {CodeEvaluationRequest} from '../code-evaluation-request-payload';
declare const ace:any;
@Component({
  selector: 'app-ace-editor',
  templateUrl: './ace-editor.component.html',
  styleUrls: ['./ace-editor.component.css']
})
export class AceEditorComponent implements OnInit {

  codeEvaluationrequest:CodeEvaluationRequest;
  constructor(private questionsService:QuestionsService) {

    this.codeEvaluationrequest = {      
      lang  : 'C',
      input : '',
      source: '#include <stdio.h> int main() { printf("Hello WOrld"); }',      
      memory_limit: 100000,
      time_limit: '5',
      context: '454545445',
      callback:'5'
    };

   }

  ngOnInit(): void {    
    ace.config.set('basePath', './');    
    var editor = ace.edit("editor");
    //editor.setTheme("ace/theme/monokai");    
    //editor.setTheme("ace/theme/solarized_light");        
    //editor.session.setMode("ace/mode/javascript");
    editor.session.setMode("ace/mode/c_cpp");    
  }

  submitCodeForEvaluation() {
    this.questionsService.submitCodeForEvaluation(this.codeEvaluationrequest).subscribe(result => {
      console.log(result);
      alert("Submitted Code for Evaluation");
    });    
  }

}
