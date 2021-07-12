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
  input = {
    name: null,
    email: null,
    project: null,
    version: null,
    platform: null,
    summary: null,
    body: null
  };
  
  constructor(private projectInfoService: ProjectInfoService) {
    projectInfoService.fetchAllProjectInfo()
      .catch(this.fetchError)
      .then(this.integrateProjectInfo)
      .catch(this.badProjectInfo)
      .then(this.enableForm)
      .catch(this.strangeError);
  }
  
  fetchError = () => {
    this.statusMessage =
      "We tried to fetch project info from the database,"
      + " but were unsuccessful."
      + " Sorry; this bug reporter presently won't work.";
    // Does TypeScript enforce statement terminators?
    // I expected compile errors from the above.
  }
  
  integrateProjectInfo = (projectInfo) => {
    this.projectInfo = projectInfo;
    this.availableProjects = this.getProjects(this.projectInfo);
    // Rather than transform the data to a form suitable for us, I'm
    // just going to live iterate everytime. The form we need (hierarchical
    // dictionary keyed by name) is troublesome to transform this into.
  
    return true;
  }
  
  badProjectInfo = (error) => {
    console.error(error);
    this.statusMessage =
      "We fetched some project info, but they were bad."
      + " Sorry; this bug reporter presently won't work.";
  }
  
  enableForm = () => {
    this.statusMessage = "";
    this.ready = true;
  }
  
  strangeError = (error) => {
    console.error(error);
    this.statusMessage =
      "Something quite unexpected occured."
      + " Sorry; this bug reporter presently won't work.";
  }
  
  alistFind(array, key, value) {
    return array.find(elem => elem[key] == value);
  }
  
  generateAndSubmitBugReport = () => {
    console.log(this.input);
  }
  
  availableProjects = function() {
    return this.getProjects(this.projectInfo);
  };
  
  availableVersions() {
    if (!this.input.project) return [];
    return this.getVersions(this.projectInfo, this.input.project);
  }
  
  availablePlatforms() {
    if (!this.input.version) return [];
    return this.getPlatforms(
      this.projectInfo,
      this.input.project,
      this.input.version
    );
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
