import { Component } from '@angular/core';
import { OperatorType } from '../../enums/OperatorType';

@Component({
	selector: 'app-calculator',
	templateUrl: './calculator.component.html',
	styleUrls: ['./calculator.component.scss']
})
export class CalculatorComponent {

	BT_TEXTS: string[] = [
		'empty', 'empty', 'C', '÷',
		'7', '8', '9', 'x',
		'4', '5', '6', '-',
		'1', '2', '3', '+',
		'empty', '0', 'empty', '='
	];

	private operatorType: OperatorType;
	private value1: number;
	private value2: number;

	display: string;
	operator: string;

	constructor() {
		this.reset();
	}

	set value(value: string) {
		var n = 0;

		if (!this.operatorType) {
			if (this.value1 == -1) { this.value1 = 0; }

			this.value1 = parseInt(this.value1 + value);
			n = this.value1;
		} else {
			if (this.value2 == -1) { this.value2 = 0; }

			this.value2 = parseInt(this.value2 + value);
			n = this.value2;
		}

		this.display = n.toString();
	}

	setOperator(symbol: string) {
		this.value1 = parseInt(this.display);

		switch (symbol) {
			case '+': this.operatorType = OperatorType.SUM; break;
			case '-': this.operatorType = OperatorType.SUBTRACTION; break;
			case 'x': this.operatorType = OperatorType.MULTIPLICATION; break;
			case '÷': this.operatorType = OperatorType.DIVISION; break;
		}
		
		this.operator = symbol;
	}

	onClick(e) {
		switch(e.currentTarget.innerText) {
			case '+':
			case '-':
			case 'x':
			case '÷':
				this.value2 = -1;
				this.setOperator(e.currentTarget.innerText);
				break;
			case '=':
				if (this.value2 == -1) { this.value2 = this.value1; }

				this.value1 = this.calculate();
				this.display = this.value1.toString();
				break;
			case 'C':
				this.reset();
				break;
			default:
				this.value = e.currentTarget.innerText;
		}
	}

	calculate(): number {
		switch (this.operatorType) {
			case OperatorType.SUM:
				return this.value1 + this.value2;
				break;
			case OperatorType.SUBTRACTION: 
				return this.value1 - this.value2;
				break;
			case OperatorType.MULTIPLICATION:
				return this.value1 * this.value2;
				break;
			case OperatorType.DIVISION:
				return this.value1 / this.value2;
				break;
		}

		return 0;
	}

	reset() {
		this.value1 = -1;
		this.value2 = -1;
		this.operatorType = null;
		this.display = '0';
		this.operator = '';
	}

}