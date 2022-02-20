import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, throwError } from 'rxjs';
import { Constant } from '../constant/Constant';
import { UserProfile } from '../model/userData';
import { GitProfile } from '../model/userProfile';
import { GitRepos } from '../model/userRepos';

@Injectable({
  providedIn: 'root'
})
export class GitapiService {
  baseurl: string;
  userProfile: UserProfile = new UserProfile();
  storeUserData: Map<string, any> = new Map();

  constructor(private http: HttpClient) {
    this.baseurl = Constant.BASE_URL;
  }
  
  //Create a new Observable for sharing data to components
  currentProfile = new BehaviorSubject<GitProfile>(this.userProfile);

  /**
   * Returns the searched user GitProfie information
   * @param {string} username
   * @returns {Observable<GitProfile>}
   */
  getGitUserProfile(username: string): Observable<GitProfile> {
    if (!navigator.onLine) {
      return throwError(() => new Error(Constant.NO_INTERNET));
    }
    let res;
    if(this.storeUserData.has(username)){
      res =  this.storeUserData.get(username);
    } else { 
        res = this.http.get<GitProfile>(this.baseurl + username)
        .pipe(map((response: any): GitProfile => {
          let data = this.mapResponseData(response);
          this.sendData(data);
          return data;
        })
        );
        this.storeUserData.set(username, res);  
    }
    return res;
  }

  /**
   * Returns all repository information of a user
   * @param {string} url
   * @returns {Observable<GitRepos[]>}
   */
  getGitUserRepos(url: string): Observable<GitRepos[]> {
    let res = this.http.get<GitRepos[]>(url)
      .pipe(map((response: any): GitRepos[] => { 
        let data = this.mapRepoResponseData(response);
        return data;
      }
      )
      );
    return res;
  }

  //bind the observable for subscription by the component
  fetchUserProfile() {
    return this.currentProfile.asObservable();
  }
  
  // emit the observable to the subcribed component
  sendData(res: GitProfile) {
    this.currentProfile.next(res);
  }

 /**
   * Returns the mapped response to userProfile
   * @param {Response} response
   * @returns {GitProfile}
   */
  mapResponseData(response: any): GitProfile {
    let res: GitProfile = {
      login: response['login'],
      username: response['name'] == null ? response['login'] : response['name'],
      bio: response['bio'],
      profile_url: response['html_url'],
      avatar_url: response['avatar_url'],
      email: response['email'],
      company: response['company'],
      location: response['location'],
      followers: response['followers'],
      followings: response['following'],
      reposCount: response['public_repos'],
      joined: response['created_at'],
      repo_url: response['repos_url']
    }
    return res;
  }

  /**
   * Returns the mapped response to user repose
   * @param {Response} response
   * @returns {GitRepos[]}
   */
  mapRepoResponseData(response: any): GitRepos[] {
    let res: GitRepos[] = response.map((repo: any): GitRepos => ({
      reponame: repo['name'],
      size: repo['size'],
      language: repo['language'],
      issues: repo['open_issues'],
      created: repo['created_at'],
      updated: repo['updated_at'],
      link: repo['html_url']
    }));
    return res;
  }
}
