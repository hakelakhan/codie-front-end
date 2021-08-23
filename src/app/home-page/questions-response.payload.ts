export interface QuestionsResponse {
    questionId:String,
    difficultyLevel:String,  
    title:String,
    description:String,
    associatedTopics:String,
    solved:boolean,
    score:String,
    maxScore:String
    testcases:Testcase[]
}
export interface Testcase {
    id: number,
    providedInput:string,
    expectedOutput:string 
}