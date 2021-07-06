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
  projectInfo = [];
  selectedProject = null;
  selectedVersion = null;
  selectedPlatform = null;
  availableProjects = [];
  availableVersions = [];
  availablePlatforms = [];
  
  // Angular's generators are forcing a style of width-2 soft tabs.
  // Given this framework is quite opinionated, we should probably get
  // a text editor dedicated to its tastes..
    
  constructor(private projectInfoService: ProjectInfoService) {
  	this.fetchError = this.fetchError.bind(this);
	this.integrateProjectInfo = this.integrateProjectInfo.bind(this);
	this.badProjectInfo = this.badProjectInfo.bind(this);
	this.enableForm = this.enableForm.bind(this);
	this.strangeError = this.strangeError.bind(this);
	// Kind of weird, changing my methods. But, setup I guess.
	// Though, [Hamed Nourhani votes for arrow functions over bound methods]
	// (https://hamednourhani.gitbooks.io/typescript-book/content/docs/tips/\
	// bind.html), because bind discards type information.
  
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
		+ " but were unsuccessful."
		+ " Sorry; this bug reporter presently won't work.";
	// Does TypeScript enforce statement terminators?
	// I expected compile errors from the above.
  }
  
  integrateProjectInfo(projectInfo) {
	this.projectInfo = projectInfo;
	this.availableProjects = this.getProjects(this.projectInfo);
	// Rather than transform the data to a form suitable for us, I'm
	// just going to live iterate everytime. The form we need (hierarchical
	// dictionary keyed by name) is troublesome to transform this into.
	
	return true;
  }
  
  badProjectInfo(error) {
  	console.error(error);
	this.statusMessage =
		"We fetched some project info, but they were bad."
		+ " Sorry; this bug reporter presently won't work.";
  }
  
  enableForm() {
  	this.statusMessage = "";
  	this.ready = true;
  }
  
  strangeError(error) {
  	console.error(error);
	this.statusMessage =
		"Something quite unexpected occured."
		+ " Sorry; this bug reporter presently won't work.";
  }

  selectProject = name => {
  	this.selectedProject = name;
	this.selectedVersion = null;
	this.selectedPlatform = null;
	this.availableVersions = this.getVersions(
		this.projectInfo,
		this.selectedProject
	);
	this.selectVersion(null);
	this.selectPlatform(null);
  }
  
  selectVersion = version => {
  	this.selectedVersion = version;
	this.selectedPlatform = null;
	this.availablePlatforms = this.getPlatforms(
		this.projectInfo, 
		this.selectedProject,
		this.selectedVersion
	);
	this.selectPlatform(null);
  }
  
  selectPlatform = platform => {
  	this.selectedPlatform = platform;
  }
  
  alistFind(array, key, value) {
  	return array.find(elem => elem[key] == value);
  }
  
  getProjects(projectInfo) {
  	return projectInfo.map(project => project.name);
  }
  
  getVersions(projectInfo, project) {
  	project = this.alistFind(projectInfo, "name", project);
	if (!project) return [];
  	return project.versions.map(version => version.version);
  }
  
  getPlatforms(projectInfo, project, version) {
  	project = this.alistFind(projectInfo, "name", project);
	if (!project) return [];
	return project.versions.reduce((platforms, elem) => {
		if (elem.version == version) platforms.push(elem.platform);
		return platforms;
	}, []);
  }
  
}
