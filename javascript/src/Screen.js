class Screen {

	constructor() {
		this.screen = document.querySelector('#screen span');
		this.operator = document.getElementById('operator');
	}

	show(text) {
		this.screen.innerText = text;
	}

	showOperator(text) {
		this.operator.innerText = text;
	}

	reset() {
		this.screen.innerText = 0;
		this.operator.innerText = '';
	}

}