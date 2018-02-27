$(document).ready(function() {
	calculator = {
		display: function() {
			$('#calc-tab').html(this.code());
			let me = this;
			$('.num').click(function(){
				let number = $(this).attr('id').slice(3);
				me.numberPressed(number);
			});
			$('.operand').click(function(){
				let operand = $(this).attr('id');
				me.operandPressed(operand);
			})
			$('#calc-reset').click(function(){me.reset()});
			$('#clear').click(function(){me.clear()});
		},
		numberPressed: function(number){
			if(this.status[0] == 0){
				this.text += number;
			} else {
				this.text = number + '';
				this.status[0] = 0;
			}
			this.updateDisplay();
		},
		operandPressed: function(operand){
			// solve
			let now = parseInt(this.text);
			switch(this.status[1]){
				case 'plus':
					this.value += now;
					this.text = this.value;
					break;
				case 'divd':
					this.value /= now;
					this.text = this.value;
					break;
				case 'minus':
					this.value -= now;
					this.text = this.value;
					break;
				case 'times':
					this.value *= now;
					this.text = this.value;
					break;
				default:
					this.value = now;
			}
			this.status[1] = operand;
			this.status[0] = 1;
			this.updateDisplay();
		},
		reset: function(){
			this.clear();
			this.value = 0;
			this.status = 0;
			this.updateDisplay();
		},
		clear: function(){
			this.text = '0';
			this.updateDisplay();
		},
		text: '0',
		value: 0,
		status: [1, 'none'],
		updateDisplay: function(){
			$('#display-bar').html('');
			setTimeout(() => {
				$('#display-bar').html(this.text);
			}, 100);
		},
		code: function() {
			return `
				<div id="calculator">
					<div id="display-bar">0</div>
					<div id="pads">
						<div id="numpad">
							<button class="num" id="pad9">9</button>
							<button class="num" id="pad8">8</button>
							<button class="num" id="pad7">7</button>
							<button class="num" id="pad6">6</button>
							<button class="num" id="pad5">5</button>
							<button class="num" id="pad4">4</button>
							<button class="num" id="pad3">3</button>
							<button class="num" id="pad2">2</button>
							<button class="num" id="pad1">1</button>
							<button class="num" id="pad0">0</button>
							<button class="num" id="paddot">.</button>
						</div>
						<div id="operand">
							<button class="system" id="clear">CLR</button>
							<button class="system" id="calc-reset">AC</button>
							<button class="operand" id="plus">+</button>
							<button class="operand" id="divd">/</button>
							<button class="operand" id="minus">-</button>
							<button class="operand" id="equal">=</button>
							<button class="operand" id="times">*</button>
						</div>
					</div>
				</div>
			`;
		}
	}

	calculator.display();
});