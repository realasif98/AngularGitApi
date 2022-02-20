import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component'; 
import { GitSearchComponent } from './component/git-search/git-search.component';
import { GitapiService } from './service/gitapi.service';
import { GitProfileComponent } from './component/git-profile/git-profile.component';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { GitHistoryComponent } from './component/git-history/git-history.component';
import { HighLightDirective } from './directives/high-light.directive';

@NgModule({
  declarations: [
    AppComponent,
    GitSearchComponent,
    GitProfileComponent,
    GitHistoryComponent,
    HighLightDirective
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    NgxPaginationModule
  ],
  providers: [GitapiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
