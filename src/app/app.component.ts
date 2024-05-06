import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ExecuteSample } from './utils/execute-sample';
import { execute } from './ban-devtools/third-solution';
import { CreationObserables } from './rxjs/creationObservables/index';
import { subjectSamples } from './rxjs/observable/subject';
import { CombinationOperator } from './rxjs/combinationOperators/index';
import { TransformationOperator } from './rxjs/transformationOperators/index';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'AngularPlayground';

  constructor() {
    this.Rxjs();
    execute();
  }

  Rxjs() {
    let samples = new TransformationOperator.BufferTimeSamples();
    ExecuteSample(samples);
  }
}
