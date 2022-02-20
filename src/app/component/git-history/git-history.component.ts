import { Component, OnInit } from '@angular/core';
import { Constant } from 'src/app/constant/Constant';
import { GitHiistory } from 'src/app/model/userHistory';
import { GitProfile } from 'src/app/model/userProfile';
import { GitapiService } from 'src/app/service/gitapi.service';

@Component({
  selector: 'app-git-history',
  templateUrl: './git-history.component.html',
  styleUrls: ['./git-history.component.scss']
})
export class GitHistoryComponent implements OnInit {
  userHistory: GitHiistory[];
  savedHistory: GitHiistory[];
  itemCount: number;
  pageNumber: number;
  constructor(private service: GitapiService) {
    this.userHistory = [];
    this.savedHistory = [];
    this.itemCount = 12;
    this.pageNumber = 1;
  }

  ngOnInit(): void {
    this.service.fetchUserProfile()
      .subscribe({
        next: (res) => {
          if (res.username) {
            let data: GitHiistory = {
              login: res.login,
              name: res.username,
              url: res.profile_url,
              repoUrl: res.repo_url
            };
            this.savedHistory.unshift(data);
            this.savedHistory = [...new Map(this.savedHistory.map(item => [JSON.stringify(item), item])).values()];
            this.userHistory = this.savedHistory;
          }
        },
        error: (err) => {

        }
      })
  }

  handlePageChange(event: number): void {
    this.pageNumber = event;
  }

  clearHistory() {
    this.userHistory = [];
    this.savedHistory = [];
  }

  filterList(value: string) {
    value = value.trim().toLowerCase();
    if (value === '') {
      this.userHistory = this.savedHistory;;
    } else {
      this.userHistory = this.savedHistory.filter(item => {
        return item.name.toLowerCase().includes(value);
      });
    }
  }

  getUserProfile(username: string){
    this.service.getGitUserProfile(username)
      .subscribe({
        next: (res) => {

        },
        error: (err) => {  
          if(err.status === 0){
            alert(Constant.NO_INTERNET);
          } else {
            alert(Constant.USER_NOT_FOUND);
          }
        }
      });
  }

}
