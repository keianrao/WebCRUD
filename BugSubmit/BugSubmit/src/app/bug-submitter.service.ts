import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BugSubmitterService {

  constructor() {
    // Do we need to instantiate a connection to the database?
  }
  
  submit(bugReport) {
    // We're simulating the database, so we have to validate the input.
    // Normally we'd transform the bug report to a suitable form,
    // but it as a JSON document is fine for storage, for this mock.
    // 
    // We don't have anywhere to save. I guess one way would be to
    // print the whole database to the console after every submission.
  }
  
}
