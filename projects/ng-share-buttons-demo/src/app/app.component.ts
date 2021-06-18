import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ng-share-buttons-demo';
  counter = 0;

  increment() {
    this.counter++;
  }
  
  numbers = [...Array(10).keys()];
}
