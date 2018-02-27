$(document).ready(function() {
	tictactoe = {
		currentPlayer: 1,
		records: [
			[0, 0, 0, 0, 0, 0, 0, 0, 0],
		],
		status: 'playing',
		checkWin: function() {
			record = this.records[0].slice();
			let countForDraw = 0;
			let row1=0, row2=0, row3=0;
			let col1=0, col2=0, col3=0;
			let dia1=0, dia2=0;
			for(let position in record){
				if(record[position] != 0)countForDraw++;
				if(position < 3)row1 += record[position];
				else if(position < 6)row2 += record[position];
				else row3 += record[position];
				if(position % 3 == 0)col1 += record[position];
				else if(position % 3 == 1)col2 += record[position];
				else col3 +=record[position];
				if(position % 4 == 0)dia1 += record[position];
				if(position != 0 && position != 8 && position % 2 == 0)dia2 += record[position];
			}
			// If no zero at all draws.
			if(countForDraw == 9)return 'draw';
			// If to tatal not 3 nor 30 no wins
			else if(col3 == '30' || col2 == '30' || col1 == '30' || row3 == '30' || row2 == '30' || row1 == '30' || dia2 == '30' || dia1 == '30') return 'X'
			else if(col3 == '3' || col2 == '3' || col1 == '3' || row3 == '3' || row2 == '3' || row1 == '3' || dia2 == '3' || dia1 == '3') return 'O'
			// Default playing
			else return 'playing';
		},
		move: function(position) {
			// Set value (unshift history)
			next = this.records[0].slice();
			next[position] = this.currentPlayer;
			this.records.unshift(next);
			this.currentPlayer = this.currentPlayer == 1 ? 10:1;
			// Show result
			this.display();
		},
		undo: function() {
			if(this.records.length > 1){
				this.records.shift();
				this.currentPlayer = this.currentPlayer == 1 ? 10:1;
			}
			else alert('Cannot undo anymore');
			this.display();

		},
		reset: function() {
			this.records = [this.records[this.records.length - 1]];
			this.currentPlayer = 1;
			this.display();
		},
		display: function() {
			this.status = this.checkWin();

			$('#tictactoe-tab').html(tictactoe.code(this.records[0]));
			$('.box.inactive').off('click').on('click', function(){
				tictactoe.move($(this).attr('id').slice(3));
			});
			$('#undo').off('click').on('click', function(){
				tictactoe.undo();
			});
			$('#reset').off('click').on('click', function(){
				tictactoe.reset();
			});
		},
		code: function(records) {
			let isActive = [], labels = [];
			for(let i in records){
				isActive[i] = this.status == 'playing'? records[i] == 0 ? ' inactive': '': '';
				labels[i] = records[i] == 0 ? '': records[i] == 1 ? 'O': 'X';
			}
			let result;
			let currentPlayer = this.currentPlayer == 1 ? 'O': 'X';
			if(this.status == 'playing'){
				result = currentPlayer + ' turns';
			} else if(this.status == 'draw'){
				result = 'Draw!';
			} else {
				result = this.status + ' wins!';
			}

		return `
			<div id="board">
				<div class="box${isActive[0]}" id="pos0">${labels[0]}</div>
				<div class="box${isActive[1]}" id="pos1">${labels[1]}</div>
				<div class="box${isActive[2]}" id="pos2">${labels[2]}</div>
				<div class="box${isActive[3]}" id="pos3">${labels[3]}</div>
				<div class="box${isActive[4]}" id="pos4">${labels[4]}</div>
				<div class="box${isActive[5]}" id="pos5">${labels[5]}</div>
				<div class="box${isActive[6]}" id="pos6">${labels[6]}</div>
				<div class="box${isActive[7]}" id="pos7">${labels[7]}</div>
				<div class="box${isActive[8]}" id="pos8">${labels[8]}</div>
			</div>
			<h2 id="result">${result}</h2>
			<button id="undo">Undo</button>
			<button id="reset">Reset</button>
		`	
		},
	}
	tictactoe.display();
});