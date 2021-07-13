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
  available = {
    projects: [],
    versions: [],
    platforms: []
  };
  input = {
    name: null,
    email: null,
    project: null,
    version: null,
    platform: null,
    summary: null,
    body: null
  };
  
  constructor(private projectInfoService: ProjectInfoService)
  {
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
    // Rather than transform the data to a form suitable for us, I'm
    // just going to live iterate everytime. The form we need (hierarchical
    // dictionary keyed by name) is troublesome to transform this into.
    this.updateAvailables();
  
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
  
  updateAvailables = () => {
  
    let selected = {
      project: null,
      version: [],
      platform: null
    }; 
    let available = {
      projects: [],
      versions: []
    };
    
    if (this.projectInfo)
      available.projects = this.projectInfo;
    
    selected.project =
      available.projects.find(p => p.name == this.input.project);
    
    if (selected.project)
      available.versions = selected.project.versions;
    
    selected.version =
      available.versions.filter(v => v.version == this.input.version);
    /*
    sic., we are going to get an array back - this is the quirkiness of
    the structure of projectInfo. When we select a version, we aren't
    selecting one object, we select many objects of the given version.
    When we select a platform then we can pin down one object among
    these, which is what "selected.platform" is set to below.
    
    This is also why we don't have "available.platforms",
    selected.version here plays that object.
    */
    
    if (selected.version.length > 0)
      selected.platform =
        selected.version.find(v => v.platform == this.input.platform);
    
    this.available.projects = available.projects.map(p => p.name);
    this.available.versions = available.versions.map(v => v.version);
    this.available.platforms = selected.version.map(v => v.platform);
    
    this.input.project =
      !selected.project ? "(select)" : selected.project.name;
    this.input.version =
      selected.version.length == 0 
        ? "(select)" : selected.version[0].version;
    this.input.platform =
      !selected.platform ? "(select)" : selected.platform.platform;

  }
  
  generateAndSubmitBugReport = () => {
    
  }
  
}
