import { Component } from '@angular/core';
import { ProjectInfoService } from './project-info.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'BugSubmit';
  
  // We're supposed to fetch the project info, then unlock our select
  // elements. Should we be locking the whole form until data load..?
}
