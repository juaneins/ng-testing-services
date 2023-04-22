import { Component, OnInit } from '@angular/core';
import { Calculator } from './calculator';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'ng-testing-services';

  ngOnInit(): void {
    const calculator = new Calculator();
    const prod = calculator.multiply(5, 4);
    // console.log('multiply: ', prod);

    const res = calculator.divide(8, 0);
    //console.log('divide: ' + res);
  }
}
