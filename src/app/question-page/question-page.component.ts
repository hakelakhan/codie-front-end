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

  question:QuestionsResponse = {    
    questionId:'',
    difficultyLevel:'',    
    title:'',
    description:'',
    associatedTopics:'',
    solved:false,
    score: '',
    maxScore:''  
  }
  questionId:number;  
  constructor(private activateRoute:ActivatedRoute, private questionsService:QuestionsService) { }

  ngOnInit(): void {
    this.questionId = this.activateRoute.snapshot.params.id;
    this.questionsService.getQuestionById(this.questionId).subscribe(response => {this.question = response;console.log(this.question) });
  }    

}
