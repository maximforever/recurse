fn main() {
	//basics();
	adding_things();

	println!("the square of 2 is: {}. Amazing, right?", square_this(2.0));
}

fn basics() {
	let answer = 42;
	println!("Hello world! The answer is {}", answer);

	assert_eq!(answer, 42);

	 for i in 0..5 {
	 	//println!("Hello {}", i);
	 	let even_odd = if i%2 == 0 {"even"} else {"odd"};
 		println!("{} {}", even_odd, i);
	 }

}

fn adding_things(){
	let mut sum = 0.0;		// otherwise, sum can't mutate

	for i in 0..5 {
		sum += i as f64;
	}

	println!("sum is: {}", sum as f64);
}

fn square_this(x: f64) -> f64 {
	x * x			// no need to return
}


fn by_ref(x: &i32) -> i32{
    *x + 1
}

fn main() {
    let i = 10;
    let res1 = by_ref(&i);
    let res2 = by_ref(&41);
    println!("{} {}", res1,res2);
}


fn by_ref(x: &i:32) -> i32 {		// reference with &
	*x + 1				// dereference with *
}







