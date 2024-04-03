import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { NgWhiteboardModule } from "ng-whiteboard"
import { NgWhiteboardModule } from "projects/ng-whiteboard/src/public-api"
import { NgWhiteboardComplexComponent } from './ng-whiteboard-complex.component';
import { NgxColorsModule } from 'ngx-colors';

@NgModule({
  declarations: [NgWhiteboardComplexComponent],
  imports: [CommonModule, NgWhiteboardModule,NgxColorsModule],
  exports: [NgWhiteboardComplexComponent]
})
export class NgWhiteboardComplexModule { }
