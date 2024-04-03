import { Directive, ElementRef, HostListener } from '@angular/core';
import { SvgService } from './svg.service';

@Directive({
  selector: '[svg]',
})
export class SvgDirective {
  lastX!: number;
  lastY!: number;

  constructor(private elementRef: ElementRef<SVGSVGElement>, private svgService: SvgService) { }

  @HostListener('pointerdown', ['$event'])
  onPointerDown(e: PointerEvent) {
    if (e.pointerType === 'touch') return;
    if (e.button !== 0 && e.button !== 1 && e.button !== 5) return;

    this.elementRef.nativeElement.setPointerCapture(e.pointerId);
    const info = e;
    this.svgService.onPointerDown(info);
    e.preventDefault();
  }

  @HostListener('pointermove', ['$event'])
  onPointerMove(e: PointerEvent) {
    if (e.pointerType === 'touch') return;
    if (e.clientX === this.lastX && e.clientY === this.lastY) return;
    this.lastX = e.clientX;
    this.lastY = e.clientY;

    const info = e;
    this.svgService.onPointerMove(info);
  }

  @HostListener('pointerup', ['$event'])
  onPointerUp(e: PointerEvent) {
    if (e.pointerType === 'touch') return;
    if (e.button !== 0 && e.button !== 1 && e.button !== 2 && e.button !== 5) return;
    this.lastX = e.clientX;
    this.lastY = e.clientY;


    const info = e;
    this.svgService.onPointerUp(info);
    if (this.elementRef.nativeElement.hasPointerCapture(e.pointerId)) {
      this.elementRef.nativeElement.releasePointerCapture(e.pointerId);
    }
    e.preventDefault();
  }

  // 将 TouchEvent 转换为 PointerEvent
  private touchToPointer(touch: Touch, e?: TouchEvent): PointerEvent {
    const domSvgRoot = e.target.closest("#svgroot");
    const domCanvasBackground = domSvgRoot.getElementById("canvasBackground");
    const domContentBackground = domSvgRoot.getElementById("contentBackground");
    const svgX = parseInt(domCanvasBackground.getAttribute("x")) - domContentBackground.getBoundingClientRect().left;
    const svgY = parseInt(domCanvasBackground.getAttribute("y")) - domContentBackground.getBoundingClientRect().top;

    if (!e || !touch) return;
    var offsetX = touch.clientX + svgX;
    var offsetY = touch.clientY + svgY;
    let pointer = new PointerEvent('pointermove', {
      pointerId: touch.identifier,
      clientX: touch.clientX,
      clientY: touch.clientY,
      button: 0,
      buttons: 1,
      isPrimary: true,
      pointerType: 'touch',
      width: 0,
      height: 0,
      pressure: 0.5,
      tiltX: 0,
      tiltY: 0,
      twist: 0,
    });
    // let obj  = Object.assign(pointer,{offsetX,offsetY});
    let obj: PointerEvent = Object.assign({}, pointer, { offsetX, offsetY, clientX: touch.clientX, clientY: touch.clientY });
    console.log(obj);
    return obj;
  }

  @HostListener('touchstart', ['$event'])
  onPointerDownTouch(e: TouchEvent) {
    if (e.touches.length !== 1) return;
    this.elementRef.nativeElement.setPointerCapture(e.touches[0].identifier);
    const info = this.touchToPointer(e.touches[0], e);
    this.svgService.onPointerDown(info);
    e.preventDefault();
  }

  @HostListener('touchmove', ['$event'])
  onPointerMoveTouch(e: TouchEvent) {
    if (e.touches.length !== 1) return;
    const touch = e.touches[0];
    if (touch.clientX === this.lastX && touch.clientY === this.lastY) return;
    this.lastX = touch.clientX;
    this.lastY = touch.clientY;

    const info = this.touchToPointer(touch, e);
    this.svgService.onPointerMove(info);
  }

  @HostListener('touchend', ['$event'])
  onPointerUpTouch(e: TouchEvent) {
    if (e.touches.length !== 0) return;
    const touch = e.changedTouches[0];

    if (this.elementRef.nativeElement.hasPointerCapture(touch.identifier)) {
      this.elementRef.nativeElement.releasePointerCapture(touch.identifier);
    }

    const info = this.touchToPointer(touch, e);
    this.svgService.onPointerUp(info);
    e.preventDefault();
  }
}