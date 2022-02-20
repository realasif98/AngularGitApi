import { Component, OnInit } from '@angular/core';
import { Constant } from 'src/app/constant/Constant';
import { GitProfile } from 'src/app/model/userProfile';
import { GitapiService } from 'src/app/service/gitapi.service';

@Component({
  selector: 'app-git-search',
  templateUrl: './git-search.component.html',
  styleUrls: ['./git-search.component.scss']
})
export class GitSearchComponent implements OnInit {

  constructor(private service: GitapiService) { }

  ngOnInit(): void {
  }

  getUserDetails(username: string) {
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
