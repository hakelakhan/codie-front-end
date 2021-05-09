import { Component, Input, OnInit } from '@angular/core';
import { QuestionsService } from '../questions.service';
import {CodeEvaluationRequest} from '../code-evaluation-request-payload';
import { CodeEvaluationResponse } from '../code-evaluation-response-payload';
import {Router} from '@angular/router';
import { AuthenticationService } from '../authentication.service';
declare var jQuery:any;



declare const ace:any;




interface Language {
  value: string;    //This is programming language. If language is C . server will evaluate submitted code with C language.
  id:string;
  mode:string,    //Ace Language Mode. Used to set Language in Edior
  viewValue: string;
  initalCode:string;
}

interface Theme {
  value: string;
  viewValue: string;
}


@Component({
  selector: 'app-ace-editor',
  templateUrl: './ace-editor.component.html',
  styleUrls: ['./ace-editor.component.css']
})
export class AceEditorComponent implements OnInit {

  editor:any;  
  @Input() questionId:number;  
  codeSubmitted:boolean;
  languages:Language[];
  themes:Theme[];  
  fontSizes: number[];
  selectedFontSize:number;
  response:CodeEvaluationResponse | null;
  selectedProgrammingLanguage: string;
  selectedTheme:string;  


  
  
  constructor(private questionsService:QuestionsService, private router:Router, private authService: AuthenticationService) {   
        this.languages = [
          {value: 'c', id:'c', mode : 'c_cpp', viewValue: 'C', initalCode: '#include <stdio.h>\nint main() {\n\t//TODO Write your code here\n\treturn 0;\n}'},
          {value: 'cpp', id:'cpp', mode : 'c_cpp', viewValue: 'C++', initalCode: '#include <iostream.h>\nint main() {\n\treturn 0;\n}'},
          {value: 'java', id:'java', mode : 'java', viewValue: 'Java', initalCode: 'public class MainClass {\n\tpublic static void main(String[] args) {\n\t\t\n\t}\n}'},
          {value: 'python3', id:'python',mode : 'python', viewValue: 'Python 3', initalCode: '#include <stdio.h>\nint main() {\n\treturn 0;\n}'},          
        ];

        this.themes = [		  
        {value : 'clouds',             						viewValue : 'Ambiance' },
        {value : 'ambiance',                      viewValue : 'Chaos' },
        {value : 'chaos',                         viewValue : 'Chrome' },
        {value : 'chrome',                        viewValue : 'Clouds' },
        {value : 'clouds_midnight',               viewValue : 'Clouds Midnight' },
        {value : 'cobalt',                        viewValue : 'Cobalt' },
        {value : 'crimson_editor',                viewValue : 'Crimson Editor' },
        {value : 'dawn',                          viewValue : 'Dawn' },
        {value : 'dracula',                       viewValue : 'Dracula' },
        {value : 'dreamweaver',                   viewValue : 'Dreamweaver' },
        {value : 'eclipse',                       viewValue : 'Eclipse' },
        {value : 'github',                        viewValue : 'Github' },
        {value : 'gob',                           viewValue : 'Gob' },
        {value : 'gruvbox',                       viewValue : 'Gruvbox' },
        {value : 'idle_fingers',                  viewValue : 'Idle Fingers' },
        {value : 'iplastic',                      viewValue : 'Iplastic' },
        {value : 'katzenmilch',                   viewValue : 'Katzenmilch' },        
        {value : 'kuroir',                        viewValue : 'Kuroir' },
        {value : 'merbivore',                     viewValue : 'Merbivore' },
        {value : 'merbivore_soft',                viewValue : 'Merbivore Soft' },
        {value : 'monokai',                       viewValue : 'Monokai' },
        {value : 'mono_industrial',               viewValue : 'Mono Industrial' },
        {value : 'nord_dark',                     viewValue : 'Nord Dark' },
        {value : 'pastel_on_dark',                viewValue : 'Pastel On Dark' },
        {value : 'solarized_dark',                viewValue : 'Solarized Dark' },
        {value : 'solarized_light',               viewValue : 'Solarized Light' },
        {value : 'sqlserver',                     viewValue : 'Sqlserver' },
        {value : 'terminal',                      viewValue : 'Terminal' },
        {value : 'textmate',                      viewValue : 'Textmate' },
        {value : 'tomorrow',                      viewValue : 'Tomorrow' },
        {value : 'tomorrow_night',                viewValue : 'Tomorrow Night' },
        {value : 'tomorrow_night_blue',           viewValue : 'Tomorrow Night Blue' },
        {value : 'tomorrow_night_bright',         viewValue : 'Tomorrow Night Bright' },
        {value : 'tomorrow_night_eighties',       viewValue : 'Tomorrow Night Eighties' },
        {value : 'twilight',                      viewValue : 'Twilight' },
        {value : 'vibrant_ink',                   viewValue : 'Vibrant Ink' },
        {value : 'xcode',                         viewValue : 'Xcode' }
        ]; 

        this.fontSizes = [10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36, 38, 40, 42, 44, 46, 48];
  }
    

  ngOnInit(): void {    
    ace.config.set('basePath', './');    
    this.editor = ace.edit("editor");
    var language:Language = this.languages[0];    
    //editor.setTheme("ace/theme/monokai");    
    //editor.setTheme("ace/theme/solarized_light");        
    //editor.session.setMode("ace/mode/javascript");    
    this.setLanguage(language);    
    this.setTheme(this.selectedTheme);
    this.setFontSize(this.selectedFontSize);        
  }
  resetEditor(language:Language) {
    this.editor.session.setValue(language.initalCode);
  }
  setTheme(themeValue:string | undefined) {
    if(themeValue === undefined)
      themeValue = this.themes[0].value;
    this.selectedTheme = themeValue;
    this.editor.setTheme("ace/theme/" + themeValue);    
  }
  setLanguage(language:Language | undefined) {
    if(language === undefined)
      language = this.languages[0];
    this.editor.session.setMode("ace/mode/" + language.mode);
    this.resetEditor(language);
    this.selectedProgrammingLanguage = language.id;    
  }
  setFontSize(fontSize : number | undefined) {
    if(fontSize === undefined)
      fontSize = 16;
    this.editor.setFontSize(fontSize);
    this.selectedFontSize = fontSize;

  }
  
  getLanguageValue():string {
    let lang:Language | undefined  = this.getLanguageById(this.selectedProgrammingLanguage);
    if(lang === undefined)  lang = this.languages[0];
    return lang.value;
  }
  getValue():string {
    return this.editor.getValue();
  }
    
  submitCodeForEvaluation(){    
    this.response = null;   
    this.codeSubmitted = true;
    var codeEvaluationRequest:CodeEvaluationRequest = {
      'questionId' : this.questionId,
      'lang' : this.getLanguageValue(),
      'source' : this.getValue()
    }  
    
    this.questionsService.submitCodeForEvaluation(codeEvaluationRequest).subscribe(response => {
      this.response = response; 
      this.codeSubmitted = false;
      this.authService.setPointsForUser(this.response.updatedUserScore);
      if(response.allTestcasesPassed) {
        this.showModal();
      }
    });    
  }
  showModal():void {
    jQuery('.bd-example-modal-lg').modal({show:true});
  }
  hideModal():void {
    jQuery('.bd-example-modal-lg').modal({show:false});
  }
  getLanguageById(id:string):Language {
    var language:Language| undefined = this.languages.find(e => e.id === id);
    if(language == undefined)
      return this.languages[0];
    else
      return language;  
  }
  onChangeLanguage(languageId:string) {    
    console.log("Changed Language Id to " + languageId);
    let lang:Language | undefined = this.getLanguageById(languageId);
    this.setLanguage(lang);
    
  }
  onChangeTheme(themeValue:string) {    
    console.log("Changed Theme to " + themeValue);    
    this.setTheme(themeValue);
    
  }
  onChangeFontSize(fontSize:number) {
    console.log("Changed Font Size to " + fontSize);
    this.setFontSize(fontSize);
  }



  goToNextChallenge() {
    this.hideModal();
    var id:number = this.questionsService.getNextUnsolvedQuestionId(this.questionId);
    console.log("Navigating to question Id " + id);
    this.questionId = id;    
    this.codeSubmitted = false;  
    this.response = null;
    this.resetEditor(this.getLanguageById(this.selectedProgrammingLanguage));
    this.router.navigateByUrl('/questions/' + id);
  }
}
