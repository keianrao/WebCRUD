import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LabeledInputComponent } from './labeled-input/labeled-input.component';

@NgModule({
  declarations: [
    AppComponent,
	LabeledInputComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
