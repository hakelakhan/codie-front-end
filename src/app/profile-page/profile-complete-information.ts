import { UpdatableProfileDetails } from './profile-update-request';

export interface ProfileInformation {
    updatable:UpdatableProfileDetails,
    email: string,
    programmingSkills: string[],
    solvedProblems:number,        
    score:number,
    badge:string,
    profilePictureUri:string 
}