import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgWhiteboardComponent } from './ng-whiteboard.component';
import { SvgDirective } from './core/svg/svg.directive';

@NgModule({
  declarations: [NgWhiteboardComponent, SvgDirective],
  imports: [CommonModule],
  exports: [NgWhiteboardComponent],
  bootstrap: [NgWhiteboardComponent]
})
export class NgWhiteboardModule {}
