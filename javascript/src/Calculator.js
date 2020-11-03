class Calculator {

	constructor() {
		Calculator.this = this;

		this.buttons = document.getElementById('buttons');
		this.screen = new Screen();

		this.createButtons();

		this.operator = null;
		this.value1 = 0;
		this.value2 = 0;
		this.lastClickWasOperator = false;
	}

	get BT_TEXTS() {
		return [
			'', '', 'C', '÷',
			'7', '8', '9', 'x',
			'4', '5', '6', '-',
			'1', '2', '3', '+',
			'', '0', '', '='
		];
	}

	set value(value) {
		var n = 0;

		if (!this.operator) {
			this.value1 = parseInt(this.value1 + value);
			n = this.value1;
		} else {
			if (this.lastClickWasOperator) { this.value2 = ''; }

			this.value2 = parseInt(this.value2 + value);
			n = this.value2;
		}

		this.screen.show(n);
	}

	setOperator(symbol) {
		if (this.operator) { this.value2 = this.value1; }

		switch (symbol) {
			case '+': this.operator = OperatorType.SUM; break;
			case '-': this.operator = OperatorType.SUBTRACTION; break;
			case 'x': this.operator = OperatorType.MULTIPLICATION; break;
			case '÷': this.operator = OperatorType.DIVISION; break;
		}

		this.screen.showOperator(symbol);
	}

	createButtons() {
		var button;
		var empty;

		for (let text of this.BT_TEXTS) {
			if (text != '') {
				button = new Button(text, this.onClick);
				this.buttons.appendChild(button.el);
			} else {
				empty = new Empty();
				this.buttons.appendChild(empty.el);
			}
		}
	}

	onClick(e) {
		switch(e.currentTarget.innerText) {
			case '+':
			case '-':
			case 'x':
			case '÷':
				Calculator.this.lastClick = true;
				Calculator.this.setOperator(e.currentTarget.innerText);
				break;
			case '=':
				Calculator.this.calculate();
				Calculator.this.lastClickWasOperator = false;
				break;
			case 'C':
				Calculator.this.reset();
				Calculator.this.lastClickWasOperator = false;
				break;
			default:
				Calculator.this.value = e.currentTarget.innerText;
				Calculator.this.lastClickWasOperator = false;
		}
	}

	calculate() {
		switch (this.operator) {
			case OperatorType.SUM:
				this.value1 = this.value1 + this.value2;
				break;
			case OperatorType.SUBTRACTION: 
				this.value1 = this.value1 - this.value2;
				break;
			case OperatorType.MULTIPLICATION:
				this.value1 = this.value1 * this.value2;
				break;
			case OperatorType.DIVISION:
				this.value1 = this.value1 / this.value2;
				break;
		}

		this.screen.show(this.value1);
	}

	reset() {
		this.value1 = 0;
		this.value2 = 0;
		this.operator = null;
		this.screen.reset();
	}

}