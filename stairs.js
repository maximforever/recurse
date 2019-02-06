calculateNumberofCombinations(100);


function calculateNumberofCombinations(n){

	let startTime = Date.now();

	let num = numberOfCombinations(n);

//	let num = numberOfCombinationsWithMemoization(n, {});

	let endTime = Date.now();
	let duration = endTime - startTime;

	console.log(`There are ${num} combinations for ${n} steps, calclated in ${duration}ms.`)

}


function numberOfCombinations(n){

	if(n <= 1){
		return n;
	} else {
		return numberOfCombinations (n-1) + numberOfCombinations(n-2);
	}
}


// with memoization




function numberOfCombinationsWithMemoization(n, memo){
	if(typeof(memo[n]) != "undefined"){
		console.log("found " + n);
		return memo[n];
	} else {
		if(n <= 1){
			return n;
		} else {
			memo[n] = numberOfCombinationsWithMemoization (n-1, memo) + numberOfCombinationsWithMemoization(n-2, memo);
			return memo[n];
		}
	}	
}




//

function factorial(num) {
	  // If the number is less than 0, reject it.
	  if (num < 0){
	  	console.log("invalid!");
	  	return 0;
	  } else if (num == 0){
	  	return 1;
	  } else {
	  	return (num * factorial(num - 1)); 
	  }

 }
