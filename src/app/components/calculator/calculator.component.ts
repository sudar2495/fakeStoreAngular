import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent implements OnInit {
  displayText: string = "";
  finalText: string = "0";
  buttons: any = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, '=', '%', '/', '*', '-', '+', '.', 'AC', 'ER']

  constructor() { }

  ngOnInit(): void {
  }

  buttonClick = (value: any) => {
    console.log(value)
    switch (value) {
      case '=':
        this.finalText = eval(this.displayText);
        break;
      case 'AC':
        this.displayText = '';
        this.finalText = '0';
        break;
      case 'ER':
        this.displayText = this.displayText.slice(0, -1);
        if (this.displayText.length) {
          this.finalText = eval(this.displayText);
        } else {
          this.displayText = '';
          this.finalText = '0';
        }
        break;
      default:
        this.displayText += value;
        this.finalText = eval(this.displayText);
        break;
    }
  }

}
