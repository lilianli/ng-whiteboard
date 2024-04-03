import { AfterViewInit, Component, ElementRef, ViewChild, ViewEncapsulation, Input, Output, EventEmitter } from '@angular/core';
import { ElementTypeEnum, FormatType, NgWhiteboardService, ToolsEnum, WhiteboardElement } from 'ng-whiteboard';
@Component({
  selector: 'ng-whiteboard-complex',
  templateUrl: './ng-whiteboard-complex.html',
  styleUrls: ['./ng-whiteboard-complex.scss'],
  providers: [NgWhiteboardService],
  // encapsulation: ViewEncapsulation.ShadowDom,
})
export class NgWhiteboardComplexComponent implements AfterViewInit {
  @ViewChild('workarea', { static: false }) private workarea!: ElementRef<HTMLElement>;

  toolsEnum = ToolsEnum;
  elementTypeEnum = ElementTypeEnum;
  selectedTool: ToolsEnum = ToolsEnum.BRUSH;
  selectedElement: WhiteboardElement | null = null;

  options = {
    strokeColor: '#ff0',
    strokeWidth: 5,
    fill: '#000',
    backgroundColor: '#fff',
    canvasHeight: 600,
    canvasWidth: 800,
    dasharray: '',
  };

  formatTypes = FormatType;
  outerWidth = 960;
  outerHeight = 720;
  zoom = 1;
  x = 0;
  y = 0;
  @Input() initData:string = "";
  @Input() mode: string = "edit";
  @Output() dataChange = new EventEmitter<string>();
  currentData:WhiteboardElement[] =[];
  constructor(private _whiteboardService: NgWhiteboardService) {
    // const initData = '[{"x":0,"y":0,"rotation":0,"opacity":100,"options":{"strokeWidth":5,"strokeColor":"#ff0","lineCap":"round","lineJoin":"round","dasharray":"","dashoffset":0},"type":"BRUSH","value":"M-138.49,386.92 Q-138.26,385.50 -137.44,383.95 T-134.58,379.59 -128.63,372.64 -118.19,362.85 -102.21,350.43 -79.41,335.64 -50.21,318.70 -16.13,300.56 21.58,282.11 61.36,264.34 101.31,248.17 140.57,233.91 178.84,221.95 214.82,212.21 248.10,204.29 277.78,197.76 303.31,192.53 325.08,188.53 342.79,185.47 356.69,183.13 367.55,181.34 372.34,180.56 372.50,180.58 372.64,180.66 372.75,180.78 372.82,180.92 372.83,181.08 372.80,181.23 372.72,181.37 372.60,181.48 372.45,181.53 372.29,181.54 372.13,181.50 372.00,181.41 371.91,181.28 371.85,181.13 371.85,180.97 371.91,180.82 372.00,180.69 372.13,180.60 372.29,180.56 372.45,180.57 372.60,180.63 372.72,180.73 372.80,180.87 372.83,181.03 372.82,181.18 372.75,181.33 372.64,181.45 372.50,181.52 372.42,181.55 367.71,182.32 356.85,184.11 342.96,186.45 325.26,189.51 303.51,193.51 278.00,198.73 248.33,205.26 215.08,213.17 179.14,222.90 140.91,234.85 101.68,249.09 61.76,265.26 22.02,283.00 -15.66,301.44 -49.71,319.56 -78.86,336.48 -101.59,351.22 -117.50,363.58 -127.86,373.28 -133.74,380.12 -136.50,384.27 -137.39,386.38 -137.52,387.14 -137.57,387.25 -137.64,387.35 -137.74,387.42 -137.84,387.47 -137.96,387.49 -138.08,387.49 -138.20,387.46 -138.30,387.40 -138.39,387.31 -138.45,387.21 -138.49,387.10 -138.50,386.98 Z","id":"element_BRUSH_706"}]'
    // setTimeout(() => {
    //   this._whiteboardService.loadData(initData);
    // }, 2000);
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.calculateSize();
    }, 0);
  }

  calculateSize() {
    const workarea = this.workarea.nativeElement;
    const dim = {
      w: this.options.canvasWidth,
      h: this.options.canvasHeight,
    };
    // let w = workarea.clientWidth;
    // let h = workarea.clientHeight;
    let w = this.options.canvasWidth,h = this.options.canvasWidth;
    const w_orig = w,
      h_orig = h;
    const zoom = this.zoom;
    const multi = 2;
    w = Math.max(w_orig, dim.w * zoom * multi);
    h = Math.max(h_orig, dim.h * zoom * multi);
    const scroll_x = w / 2 - w_orig / 2;
    const scroll_y = h / 2 - h_orig / 2;

    this.outerWidth = w;
    this.outerHeight = h;
    this.updateSize(dim.w, dim.h);

    setTimeout(() => {
      workarea.scrollLeft = scroll_x;
      workarea.scrollTop = scroll_y;
    }, 0);
  }

  updateSize(w: number, h: number) {
    this.options.canvasWidth = w;
    this.options.canvasHeight = h;
    const current_zoom = this.zoom;
    const contentW = this.outerWidth;
    const contentH = this.outerHeight;
    const x = contentW / 2 - (w * current_zoom) / 2;
    const y = contentH / 2 - (h * current_zoom) / 2;
    setTimeout(() => {
      this.x = x;
      this.y = y;
    }, 0);
  }

  zoomWheel(e: Event) {
    const ev = e as WheelEvent;

    if (ev.altKey || ev.ctrlKey) {
      e.preventDefault();
      const zoom = this.zoom * 100;
      this.setZoom(Math.trunc(zoom - (ev.deltaY / 100) * (ev.altKey ? 10 : 5)));
    }
  }

  setZoom(new_zoom: string | number) {
    const old_zoom = this.zoom;
    let zoomlevel = +new_zoom / 100;
    if (zoomlevel < 0.001) {
      zoomlevel = 0.1;
    }
    const dim = {
      w: this.options.canvasWidth,
      h: this.options.canvasHeight,
    };
    let animatedZoom = null;
    if (animatedZoom != null) {
      window.cancelAnimationFrame(animatedZoom);
    }
    // zoom duration 500ms
    const start = Date.now();
    const duration = 500;
    const diff = zoomlevel - old_zoom;
    const animateZoom = () => {
      const progress = Date.now() - start;
      let tick = progress / duration;
      tick = Math.pow(tick - 1, 3) + 1;
      this.zoom = old_zoom + diff * tick;
      this.updateSize(dim.w, dim.h);

      if (tick < 1 && tick > -0.9) {
        animatedZoom = requestAnimationFrame(animateZoom);
      } else {
        this.zoom = zoomlevel;
        this.updateSize(dim.w, dim.h);
      }
    };
    animateZoom();
  }

  setSizeResolution(value: string) {
    let w = this.options.canvasWidth;
    let h = this.options.canvasHeight;
    const dims: number[] = [];
    dims[0] = parseInt(value.split('x')[0]);
    dims[1] = parseInt(value.split('x')[1]);
    if (value == 'Custom') {
      return;
    } else if (value == 'content') {
      dims[0] = 100;
      dims[1] = 100;
    }
    const diff_w = dims[0] - w;
    const diff_h = dims[1] - h;

    let animatedSize = null;
    if (animatedSize != null) {
      window.cancelAnimationFrame(animatedSize);
    }
    const start = Date.now();
    const duration = 500;

    const animateCanvasSize = () => {
      const progress = Date.now() - start;
      let tick = progress / duration;
      tick = Math.pow(tick - 1, 3) + 1;
      w = parseInt((dims[0] - diff_w + tick * diff_w).toFixed(0));
      h = parseInt((dims[1] - diff_h + tick * diff_h).toFixed(0));
      this.updateSize(w, h);
      if (tick < 1 && tick > -0.9) {
        animatedSize = requestAnimationFrame(animateCanvasSize);
      } else {
        this.updateSize(w, h);
      }
    };
    animateCanvasSize();
  }

  onDragDown(input: HTMLInputElement, selectedElement: Record<string, any>, prop: string | number) {
    const min = input.min ? parseInt(input.min, 10) : null;
    const max = input.max ? parseInt(input.max, 10) : null;
    const step = parseInt(input.step, 10);
    let area = 200;
    if (min && max) {
      area = max - min > 0 ? (max - min) / step : 200;
    }
    const scale = (area / 70) * step;
    let lastY = 0;
    let value = parseInt(input.value, 10);

    const onMouseMove = (e: MouseEvent) => {
      if (lastY === 0) {
        lastY = e.pageY;
      }
      const deltaY = (e.pageY - lastY) * -1;
      lastY = e.pageY;
      let val = deltaY * scale * 1;
      const fixed = step < 1 ? 1 : 0;
      val.toFixed(fixed);
      val = Math.floor(Number(value) + Number(val));

      if (max !== null) val = Math.min(val, max);
      if (min !== null) val = Math.max(val, min);
      value = val;

      selectedElement[prop] = value;
      input.value = value.toString();
    };
    const onMouseUp = () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  }

  setNumberValue(obj: Record<string, any>, prop: string, value: number): void {
    if (!isNaN(value)) {
      obj[prop] = value;
    }
  }

  toggleFontWeight() {
    if (!this.selectedElement) {
      return;
    }
    if (this.selectedElement.options.fontWeight === 'normal') {
      this.selectedElement.options.fontWeight = 'bold';
    } else {
      this.selectedElement.options.fontWeight = 'normal';
    }
  }
  toggleFontStyle() {
    if (!this.selectedElement) {
      return;
    }
    if (this.selectedElement.options.fontStyle === 'normal') {
      this.selectedElement.options.fontStyle = 'italic';
    } else {
      this.selectedElement.options.fontStyle = 'normal';
    }
  }
  newDocument() {
    this._whiteboardService.erase();
  }

  saveAs(format: FormatType) {
    this._whiteboardService.save(format);
  }

  addImage(fileInput: EventTarget | null) {
    if (fileInput) {
      const files = (fileInput as HTMLInputElement).files;
      if (files) {
        const reader = new FileReader();
        reader.onload = (e: ProgressEvent) => {
          const image = (e.target as FileReader).result;
          this._whiteboardService.addImage(image as string);
        };
        reader.readAsDataURL(files[0]);
      }
    }
  }

  undo() {
    this._whiteboardService.undo();
  }
  redo() {
    this._whiteboardService.redo();
  }

  colorChange(propName: 'fill' | 'strokeColor', color: string) {
    if (this.selectedElement) {
      this.selectedElement.options[propName] = color;
    } else {
      this.options[propName] = color;
      this.updateOptions();
    }
  }

  swapColors() {
    [this.options.fill, this.options.strokeColor] = [this.options.strokeColor, this.options.fill];
    this.updateOptions();
  }

  updateOptions() {
    this.options = Object.assign({}, this.options);
  }

  setSelectedElement(element: WhiteboardElement | null) {
    this.selectedElement = element;
  }

  onSave(img: string) {
    const cb = navigator.clipboard;
    if (cb) {
      cb.writeText(img);
    }
  }
  onDataChange(element: WhiteboardElement[] | null){
    if(element){
      this.currentData = element;
      this.dataChange.emit(JSON.stringify(element));
    }
  }
}
