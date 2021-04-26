import {TestcaseResult} from './test-case-result'
export interface CodeEvaluationResponse {
    compilationErrorMessage: string;
    testcaseResults: TestcaseResult[];
}