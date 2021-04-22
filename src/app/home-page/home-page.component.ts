import { Component, OnInit } from '@angular/core';
import { QuestionsService } from '../questions.service';
import { QuestionsResponse } from './questions-response.payload';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  questions:QuestionsResponse[];
  
  constructor(private questionsService: QuestionsService) { }

  ngOnInit(): void {
    this.questionsService.getListOfQuestions().subscribe(response => {this.questions = response;console.log(this.questions) });    
  }

}
