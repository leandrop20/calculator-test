class Button {

	constructor(text, callback) {
		this.callback = callback;

		this.el = document.createElement('button');
		this.el.className = 'button';
		this.el.innerText = text;

		this.events('add');
	}

	events(type = 'remove') {
		this.el[type + 'EventListener']('click', this.callback);
	}

}