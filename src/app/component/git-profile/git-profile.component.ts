import { Component, OnInit } from '@angular/core';
import { UserProfile, UserRepos } from 'src/app/model/userData';
import { GitProfile } from 'src/app/model/userProfile';
import { GitRepos } from 'src/app/model/userRepos';
import { GitapiService } from 'src/app/service/gitapi.service';

@Component({
  selector: 'app-git-profile',
  templateUrl: './git-profile.component.html',
  styleUrls: ['./git-profile.component.scss']
})
export class GitProfileComponent implements OnInit {

  userProfile: UserProfile;
  userRepos: UserRepos[];
  itemCount: number;
  pageNumber: number;
  constructor(private service: GitapiService) {
    this.userProfile = new UserProfile();
    this.userRepos = [];
    this.itemCount = 5;
    this.pageNumber = 1;
  }

  ngOnInit(): void {
    this.service.fetchUserProfile()
      .subscribe({
        next: (res: GitProfile) => {
          if (res.login) {
            this.userProfile = res;
            this.getAllRepos(this.userProfile.repo_url);
          }
        },
        error: (reason) => {
          console.log("Error: ", reason);
        }
      });
  }

  getAllRepos(repoUrl: string) {
    this.service.getGitUserRepos(repoUrl)
      .subscribe({
        next: (res: GitRepos[]) => {
          this.userRepos = res; 
        },
        error: (reason) => {
          console.log(reason);
        }
      })
  }

  handlePageChange(event: number): void {
    this.pageNumber = event;
  }
}
