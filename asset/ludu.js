const first = (()=>{

	let $ = (container) =>{
		return document.querySelector(container);
	}

	let start = $('.btn-new');
	let roll = $('.btn-roll');
	let activePlayer = 0;
	let finalScore = [0,0];
	//console.log(start);

	let playerName1 = $('#name-0');
	let playerName2 = $('#name-1');
	let playerScore1 = $('#score-0');
	let playerScore2 = $('#score-1');
	let current1 = $('#current-0');
	let current2 = $('#current-1');
	let dice1 = $('#dice-1');
	let dice2 = $('#dice-2');
	let firstPart = $('.player-0-panel');
	let secondPart = $('.player-1-panel');
	let hold = $('.btn-hold');
	let tvalue = true;

	//console.log(firstPart);

	let load = () =>{
		firstPart.classList.remove('winner');
		secondPart.classList.remove('winner');
		firstPart.classList.add('active');
		secondPart.classList.remove('active');

		dice1.style.display = 'none';
		//dice2.style.display = 'none';

		playerName1.textContent = 'Siddiqa';
		playerName2.textContent = 'Other';

		playerScore1.textContent = '0';
		playerScore2.textContent = '0';

		current1.textContent = '0';
		current2.textContent = '0';
	}
	load();

	start.addEventListener('click',()=>{
		load();
	});
	
	let sum = 0;

	
	nextPlayer = () =>{
		activePlayer === 0? activePlayer = 1 : activePlayer = 0;
		sum = 0;

		dice1.style.display = 'none';

		current1.textContent = '0';
		current2.textContent = '0';

		firstPart.classList.toggle('active');
		secondPart.classList.toggle('active');
	}

	roll.addEventListener('click',()=>{
		if(tvalue){
			var num = Math.floor(Math.random()*6)+1;
			//console.log(num);
			dice1.style.display = 'block';
			dice1.src = `asset/dice-${num}.png`;

			if(num !=1){
				sum +=num;
				document.querySelector('#current-'+activePlayer).
				textContent = sum;
			}
			else{
				nextPlayer();
			}

		}
	})

	hold.addEventListener('click',()=>{
		
		if(tvalue){
			// console.log(sum);
			// console.log(finalScore);
			finalScore[activePlayer] += sum;
			//console.log(finalScore);
			document.querySelector('#score-'+activePlayer).textContent =
			finalScore[activePlayer];

			var input = $('.final-score').value;
			var winingScore;
			if(input){
				winingScore = input; 
			}
			else{
				winingScore = 100;
			}

			if(finalScore[activePlayer] >= winingScore){
				document.querySelector('#name-'+activePlayer).textContent
				= "Winner";
				document.querySelector('.player-'+activePlayer+'-panel').
				add('.winner');
				document.querySelector('.player-'+activePlayer+'-panel').
				remove('.active');

				let kip = document.querySelector('.dice');
				console.log(kip);

				tvalue = false;
			}
			else{
				nextPlayer();
			}
		}
	})
	

})();