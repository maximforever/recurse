//console.log(nand(true, true));
//console.log(not(false));

console.log(or(false, false));

function nand(p, q){
	return !(p && q);
}

function not(p){			
	return nand(p, p);
}

function or(p, q){
	return nand(not(p), not(q));
}

