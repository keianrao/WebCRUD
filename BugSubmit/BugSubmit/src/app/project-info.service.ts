import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class ProjectInfoService {
	mockData = [
		{
			name: "Ceirann",
			// Are we sure a project would maintain the same name?
			// My inclination is to also return an array, the
			// last element being the latest name. But we could also
			// go for a modifiable name and an unmodifiable unique ID.
			// Anyways, for this app, assume names are constant.
			versions: [
				{ version: "0.1.0", platform: "SUSE Linux" },
				{ version: "0.2.0", platform: "SUSE Linux" },
				{ version: "0.3.0", platform: "SUSE Linux" },
				{ version: "0.4.0", platform: "SUSE Linux" },
				{ version: "0.4.0", platform: "FreeBSD" },
				{ version: "1.0.8", platform: "SUSE Linux" },
				{ version: "1.0.8", platform: "FreeBSD" },
				{ version: "1.1.1", platform: "SUSE Linux" },
				{ version: "1.1.1", platform: "FreeBSD" }
				// Alternatively, a version with an array of platforms.
				// I have them individual because, I can imagine some
				// version getting a port to a different platform later,
				// and the port is registered by appending, to not
				// disturb the previous data structures. It matters not.
			]
		},
		{
			name: "OrangeTech Global Regex Print",
			versions: [
				{ version: "0.1.0", platform: "Microsoft Windows" },
				{ version: "0.2.0", platform: "Microsoft Windows" },
				{ version: "1.0.0", platform: "Microsoft Windows" },
				{ version: "1.1.0", platform: "Microsoft Windows" }
			]
		}
	];
	// I suppose we should rather be creating a mock service?
	// I'm not acquainted enough with TypeScript (I haven't read
	// *any* guides) to know how.
	
	fetchAllProjectInfo() {
		// We should declare a type that we're returning.
		
		return this.mockData;
		// Oui, we doom ourselves to always return an array.
	}
  
}
