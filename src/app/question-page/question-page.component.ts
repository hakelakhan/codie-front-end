import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionsResponse } from '../home-page/questions-response.payload';
import { QuestionsService } from '../questions.service';

@Component({
  selector: 'app-question-page',
  templateUrl: './question-page.component.html',
  styleUrls: ['./question-page.component.css']
})
export class QuestionPageComponent implements OnInit {

  question:QuestionsResponse
  constructor(private activateRoute:ActivatedRoute, private questionsService:QuestionsService) { }

  ngOnInit(): void {
    var questionId:number = this.activateRoute.snapshot.params.id;
    this.questionsService.getQuestionById(questionId).subscribe(response => {this.question = response;console.log(this.question) });
  }

}
