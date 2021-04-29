import { Component, Input, OnInit } from '@angular/core';
import { QuestionsService } from '../questions.service';
import {CodeEvaluationRequest} from '../code-evaluation-request-payload';
import { CodeEvaluationResponse } from '../code-evaluation-response-payload';


declare const ace:any;
@Component({
  selector: 'app-ace-editor',
  templateUrl: './ace-editor.component.html',
  styleUrls: ['./ace-editor.component.css']
})
export class AceEditorComponent implements OnInit {

  editor:any;  
  @Input() questionId:number;  
  response:CodeEvaluationResponse | null;
  
  
  constructor(private questionsService:QuestionsService) {   }  

  ngOnInit(): void {    
    ace.config.set('basePath', './');    
    this.editor = ace.edit("editor");
    this.editor.setValue("#include <stdio.h>\nint main() {\n\treturn 0;\n}");
    //editor.setTheme("ace/theme/monokai");    
    //editor.setTheme("ace/theme/solarized_light");        
    //editor.session.setMode("ace/mode/javascript");
    this.editor.session.setMode("ace/mode/c_cpp");    
  }
  getValue():string {
    return this.editor.getValue();
  }
  
  getLanguage() {
    return 'c';
  }
  submitCodeForEvaluation(){    
    this.response = null;   
    var codeEvaluationRequest:CodeEvaluationRequest = {
      'questionId' : this.questionId,
      'lang' : this.getLanguage(),
      'source' : this.getValue()
    }  
    
    this.questionsService.submitCodeForEvaluation(codeEvaluationRequest).subscribe(response => this.response = response);    
  }
}
