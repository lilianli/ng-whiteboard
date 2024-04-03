# NgWhiteboardLib

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.3.29.

Source code was forked from [mostafazke/ng-whiteboard](https://github.com/mostafazke/ng-whiteboard).

Add TouchEvent listeners for mobile.

## Development server

```bash

cd ./
npm i

<!-- 这个组件需要额外的依赖 ng-colors -->
cd project/ng-whiteboard-complex
npm i

ng serve

```

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Note

此项目基于[ng-whiteboard](https://github.com/mostafazke/ng-whiteboard)修改，版本3.0.2。

### Dependency and PeerDependency

#### perfect-freehand

ng-whiteboard 组件依赖的"perfect-freehand": "^1.2.0", 含有无法识别的ts语法

```ts
    import type { xxx } from "module". 
```

只删除了这个type 语法，其余源码逻辑都未做修改。尽量避免使用其他版本造成的功能缺失或api不一致。

#### ng-colors

原本使用的版本是"ngx-colors": "^3.5.2",降低成了 "^2.5.0", 但这只是个color picker，应该影响不大。

### Build Component

为了方便修改样式，实际项目中使用的whiteboard是引用了ng-whiteboard-complex的源码(文件名为ng-whiteboard-complex.component.ts)，而不是导出为独立组件。此项目中该目录仅作测试使用。

## Code scaffolding

Run `ng g c component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
