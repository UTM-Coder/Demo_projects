$(document).ready(function() {

	window.tabs_data = {
		['tictactoe']: {display_name: 'Tic Tac Toe'},
		['calc']: {display_name: 'Working Calculator'},
		['additional']: {display_name: 'Additional Feature'},
	};

	tabs = '';
	sections = '';
	for(let x in tabs_data){
		tabs += '<button class="tab" id="' + x + '">' + tabs_data[x].display_name + '</button>';
		sections += '<div class="section" id="' + x + '-tab"></div>';
	}

	$('.tabs').html(tabs);
	$('.sections').html(sections).children().hide().first().show();

	$('.tab').click(function() {
		let id = $(this).attr('id');
		$('.section').hide();
		$('.section#' + id + '-tab').show();
	});

});