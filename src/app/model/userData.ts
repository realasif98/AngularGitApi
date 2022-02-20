import { GitProfile } from "./userProfile";
import { GitRepos } from "./userRepos";

export class UserProfile implements GitProfile{
    login!: string;
    username!: string;
    bio!:string;
    profile_url!: string;
    avatar_url!: string;
    email!: string;
    company!: string;
    location!: string;
    followers!: number;
    followings!: number;
    reposCount!: number;
    joined!: Date;
    repo_url!: string;
}

export class UserRepos implements GitRepos{
    reponame!: string;
    size!: number;
    language!: string;
    issues!: number;
    created!: Date;
    updated!: Date;
    link!: string;
    
}