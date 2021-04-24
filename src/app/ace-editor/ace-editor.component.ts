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
    //ace.config.setModuleUrl('ace/mode/javascript', 'file-loader!./worker-javascript.js')
    var editor = ace.edit("editor");
    editor.setTheme("ace/theme/monokai");    
    editor.session.setMode("ace/mode/javascript");
  }

}
