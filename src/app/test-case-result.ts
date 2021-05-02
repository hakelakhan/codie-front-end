export interface TestcaseResult {
    id: number;
    input: string;
    output: string;
    expectedOutput:string;
    memory: string;
    cpuTime: string;
    testcasePassed: boolean;
}