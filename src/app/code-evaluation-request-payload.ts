export interface CodeEvaluationRequest {
    lang:String,
    source:String,
    input:String,
    memory_limit:number,
    time_limit:String,
    context:String,
    callback:String
}