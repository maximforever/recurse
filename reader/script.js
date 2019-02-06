console.log("heya!");

let index = 0;
let readingSpeedInterval = 5;

let text = `In a hole in the ground there lived a hobbit. Not a nasty, dirty, wet hole, filled with the ends of worms and an oozy smell, nor yet a dry, bare, sandy hole with nothing in it to sit down on or to eat: it was a hobbit-hole, and that means comfort. It had a perfectly round door like a porthole, painted green, with a shiny yellow brass knob in the exact middle. The door opened on to a tube-shaped hall like a tunnel: a very comfortable tunnel without smoke, with panelled walls, and floors tiled and carpeted, provided with polished chairs, and lots and lots of pegs for hats and coats - the hobbit was fond of visitors. The tunnel wound on and on, going fairly but not quite straight into the side of the hill - The Hill, as all the people for many miles round called it - and many little round doors opened out of it, first on one side and then on another. No going upstairs for the hobbit: bedrooms, bathrooms, cellars, pantries (lots of these), wardrobes (he had whole rooms devoted to clothes), kitchens, dining-rooms, all were on the same floor, and indeed on the same passage. The best rooms were all on the left-hand side (going in), for these were the only ones to have windows, deep-set round windows looking over his garden and meadows beyond, sloping down to the river. `

init();


function init(){
	enableTextNavigation();
	refreshScreen();
}

function enableTextNavigation(){
	document.querySelector("body").addEventListener("keydown", function(e){
		scrollThroughText(e);
	});
}

function scrollThroughText(e){

	console.log(e.which);
	if(e.which >= 37 && e.which <= 40){
		
		/*
			37 - left
			38 - up
			39 - right
			40 - down
		 */

		 if(e.which == 38){
		 	index = ((index - readingSpeedInterval) < 0) ? 0 : (index - readingSpeedInterval);
		 }

		 if(e.which == 40){
		 	index = ((index + readingSpeedInterval) > text.length - 1 ) ? text.length -1 : (index + readingSpeedInterval);
		 }


		 if(e.which == 37){
		 	index = ((index - 1) < 0) ? 0 : (index - 1);
		 }

		 if(e.which == 39){
		 	index = ((index + 1) > text.length - 1 ) ? text.length -1 : (index + 1);
		 }

		 console.log(index);
		 refreshScreen();
	}
}

function refreshScreen(){
/*	document.getElementById("text").innerText = text.substring(index, text.length);

*/

	for(let i = 0; i < 9; i++){
		document.getElementById("line-" + (i+1)).innerText = text.substring(index + i*80, index +  i*80 + 80 );
	}
}

