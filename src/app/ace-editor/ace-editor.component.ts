import { Component, OnInit } from '@angular/core';
declare const ace:any;
@Component({
  selector: 'app-ace-editor',
  templateUrl: './ace-editor.component.html',
  styleUrls: ['./ace-editor.component.css']
})
export class AceEditorComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {    
    ace.config.set('basePath', './');    
    var editor = ace.edit("editor");
    //editor.setTheme("ace/theme/monokai");    
    //editor.setTheme("ace/theme/solarized_light");        
    //editor.session.setMode("ace/mode/javascript");
    editor.session.setMode("ace/mode/c_cpp");    
  }

}
