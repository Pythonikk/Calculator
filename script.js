const buttons = document.querySelectorAll('button');
const display = document.querySelector('.display > p');

const displayArr = [];
let currentValue = 0;
let valueA = 0;
let valueB = 0;

addClickEvents();

document.addEventListener('keydown', (e) => {
	let key = e.key;
	if (key >= 0 && key <= 9 || key == '+' || key == '-' || key == '*' || key == '=' || key == '.') {   
		updateDisplay(key);
	} else if (key == 'Enter') {
		updateDisplay('=');
	} else if (key == '/') {
		e.preventDefault();
		updateDisplay('/'); 
	} else if (key == 'Backspace') {
		updateDisplay('backspace');
	};
});


function addClickEvents() {
	buttons.forEach(node => {
		node.addEventListener('click', () => {
			let char = node.id;
			if (char !== 'clear') {
				if (char.includes('z')) {
					char = char.slice(1);
				} else if (char == 'add') {
					char = '+';
				} else if (char == 'subtract') {
					char = '-';
				} else if (char == 'multiply') {
					char = '*';
				} else if (char == 'divide') {
					char = '/';
				} else if (char == 'decimal') {
					char = '.';
				} else if (char == 'equals') {
					char = '=';
				};
				updateDisplay(char);
			} else {
				clear();
			};
			node.blur();
		});	
	});
};

function updateDisplay(char) {
	if (display.textContent.length == 35) {    // if zero division msg displayed
		char = 'backspace';
	};
	if (char == '+' || char == '-' || char == '*' || char == '/') {
		// if a second operator is used, evaluate expression before displaying new operator.
		if (displayArr.includes(' + ') || displayArr.includes(' - ') || displayArr.includes(' * ') || displayArr.includes(' / ')) {
				getValues();
				displayArr.splice(0, displayArr.length, currentValue.toString());
		};
		displayArr.push(' ' + char + ' '); 
	} else {
		if (char == 'clear') {
			display.textContent = '';
		} else if (char == '=') {
			getValues();
			if (currentValue !== undefined) {
				displayArr.splice(0, displayArr.length, currentValue.toString());	
			} else {
				return;
			};
		} else if (char == 'backspace') {
			displayArr.pop();
		} else if (char == '.' && displayArr.includes('.')) {
			// do nothing.
		} else {
			displayArr.push(char);
		};
	};
	display.textContent = displayArr.join('');	
};

function clear() {
	currentValue = 0;
	valueA = 0;
	valueB = 0;
	displayArr.splice(0, displayArr.length);
	updateDisplay('clear');
};

// the call to operate is inside this function.
function getValues() {
	let valueArr = displayArr.join('').split(' ');
	valueA = Number(valueArr[0]);
	valueB = Number(valueArr[2]);
	currentValue = operate(valueArr[1], valueA, valueB)
	if (currentValue !== undefined && currentValue.toString().length > 10) {
		currentValue = currentValue.toFixed(10);
	};
};

function add(a, b) {
	return a + b;
};

function subtract(a, b) {
	return a - b;
};

function multiply(a, b) {
	return a * b;
};

function divide(a, b) {
	if (valueB == 0) {
		display.textContent = 'Nonsense! You can\'t divide by zero.';
	} else {
		return a / b;
	};
};

function operate(operator, a, b) {
	switch (operator) {
		case '+':
		return add(a, b);

		case '-':
		return subtract(a, b);

		case '*':
		return multiply(a, b);

		case '/':
		return divide(a, b);
	};
};

