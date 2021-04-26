export interface TestcaseResult {
    id: number;
    input: string;
    output: string;
    memory: string;
    cpuTime: string;
    testcasePassed: boolean;
}