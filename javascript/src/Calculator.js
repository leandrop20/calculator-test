class Calculator {

	constructor() {
		Calculator.this = this;

		this.buttons = document.getElementById('buttons');
		this.display = new Display();

		this.createButtons();

		this.value1 = -1;
		this.value2 = -1;
		this.operatorType = null;
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

		if (!this.operatorType) {
			if (this.value1 == -1) { this.value1 = 0; }

			this.value1 = parseInt(this.value1 + value);
			n = this.value1;
		} else {
			if (this.value2 == -1) { this.value2 = 0; }

			this.value2 = parseInt(this.value2 + value);
			n = this.value2;
		}

		this.display.show(n.toString());
	}

	setOperator(symbol) {
		this.value1 = parseInt(this.display.current);

		switch (symbol) {
			case '+': this.operatorType = OperatorType.SUM; break;
			case '-': this.operatorType = OperatorType.SUBTRACTION; break;
			case 'x': this.operatorType = OperatorType.MULTIPLICATION; break;
			case '÷': this.operatorType = OperatorType.DIVISION; break;
		}

		this.display.showOperator(symbol);
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
				Calculator.this.value2 = -1;
				Calculator.this.setOperator(e.currentTarget.innerText);
				break;
			case '=':
				if (Calculator.this.value2 == -1) {
					Calculator.this.value2 = Calculator.this.value1;
				}

				Calculator.this.value1 = Calculator.this.calculate();
				Calculator.this.display.show(Calculator.this.value1.toString());
				break;
			case 'C':
				Calculator.this.reset();
				break;
			default:
				Calculator.this.value = e.currentTarget.innerText;
		}
	}

	calculate() {
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
		this.display.reset();
	}

}