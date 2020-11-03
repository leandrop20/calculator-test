class Display {

	constructor() {
		this.display = document.querySelector('#display span');
		this.operator = document.getElementById('operator');
	}

	get current() {
		return this.display.innerText;
	}

	show(text) {
		this.display.innerText = text;
	}

	showOperator(text) {
		this.operator.innerText = text;
	}

	reset() {
		this.display.innerText = 0;
		this.operator.innerText = '';
	}

}