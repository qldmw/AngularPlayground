import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ExecuteSample } from './utils/execute-sample';
import { CreationObserables } from './rxjs/creationObservables/index';

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
  }

  Rxjs() {
    let samples = new CreationObserables.timerSamples();
    ExecuteSample(samples, 3);
  }
}