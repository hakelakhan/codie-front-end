import {TestcaseResult} from './test-case-result'
export interface CodeEvaluationResponse {
    errorMessage: string;
    warningMessage: string;
    allTestcasesPassed:boolean;
    passedTestcases: number;    
    totalTestcases:number;
    score : number;
    maxScore:number;
    testcaseResults: TestcaseResult[];
    updatedUserScore:number;
}