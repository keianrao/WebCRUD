import { Component } from '@angular/core';
import { ProjectInfoService } from './project-info.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'BugSubmit';
  statusMessage = "Loading data from the server. Pardon us for the wait..";
  ready = false;
  
  // Angular's generators are forcing a style of width-2 soft tabs.
  // Given this framework is quite opinionated, we should probably get
  // a text editor dedicated to its tastes..
  
  constructor(private projectInfoService: ProjectInfoService) {
  	this.fetchError = this.fetchError.bind(this);
	this.integrateProjectInfo = this.integrateProjectInfo.bind(this);
	this.badProjectInfo = this.badProjectInfo.bind(this);
	this.enableForm = this.enableForm.bind(this);
	this.strangeError = this.strangeError.bind(this);
  
  	projectInfoService.fetchAllProjectInfo()
		.catch(this.fetchError)
		.then(this.integrateProjectInfo)
		.catch(this.badProjectInfo)
		.then(this.enableForm)
		.catch(this.strangeError);
  }
  
  fetchError() {
	this.statusMessage =
		"We tried to fetch project info from the database,"
		+ "but were unsuccessful."
		+ "Sorry; this bug reporter presently won't work.";
	// Does TypeScript enforce statement terminators?
	// I expected compile errors from the above.
  }
  
  integrateProjectInfo(projectInfo) {
  	// This is a bit tricky. We show versions only after a project
	// is selected, and we show platforms only after a version is selected.
	// And since ProjectInfoService didn't do it for us, we have to
	// organise platforms hierarchically under versions too.
	
	// For now let's pretend it worked. Bad.
	return true;
  }
  
  badProjectInfo() {
	this.statusMessage =
		"We fetched some project info, but they were bad."
		+ "Sorry; this bug reporter presently won't work.";
  }
  
  enableForm() {
  	this.statusMessage = "Successfully loaded.";
  	this.ready = true;
  }
  
  strangeError(error) {
  	console.error(error);
	this.statusMessage =
		"Something quite unexpected occured."
		+ "Sorry; this bug reporter presently won't work.";
  }
  
}
