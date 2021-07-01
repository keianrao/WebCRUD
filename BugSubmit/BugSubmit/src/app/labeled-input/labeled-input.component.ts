import { Component, Input } from '@angular/core';

var nextID = 1;

@Component({
	selector: 'labeled-input',
	templateUrl: './labeled-input.component.html',
	styleUrls: [ './labeled-input.component.css' ]
})
export class LabeledInputComponent {
	@Input() label: string;
	@Input() type: string;
	id: string;
	
	ngOnInit() {
		this.id = 'labeled-input-' + nextID++;
	}
}

