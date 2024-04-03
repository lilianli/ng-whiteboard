import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
// import { NgWhiteboardModule } from "ng-whiteboard"
import { NgWhiteboardModule } from "projects/ng-whiteboard/src/public-api"
// import { NgWhiteboardComplexModule } from "ng-whiteboard-complex"
import { NgWhiteboardComplexModule } from "projects/ng-whiteboard-complex/src/public-api"

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NgWhiteboardModule,
    NgWhiteboardComplexModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
