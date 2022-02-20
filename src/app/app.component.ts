import { Component, OnInit } from '@angular/core';
import { GitapiService } from './service/gitapi.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit  {
  isFound: boolean;
  constructor(private service: GitapiService){
    this.isFound = false;
  }

  ngOnInit(): void {
      this.service.fetchUserProfile()
      .subscribe({
        next: (res) => {
            if(res.username){
               this.isFound = true;
            }
        },
        error: () => {
            this.isFound = false;
        }
      })
  }
}
