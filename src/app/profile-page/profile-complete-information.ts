import { UpdatableProfileDetails } from './profile-update-request';

export interface ProfileInformation {
    updatable:UpdatableProfileDetails,
    email: string,
    score:number,
    programmingSkills: string[],
    solvedProblems:number,        
}