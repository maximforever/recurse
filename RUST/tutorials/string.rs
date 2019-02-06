fn main(){
	let mut s = "i am a string literal";
	let mut t = String::from("i am text of type String");
	
	println!("{}", s);
	println!("{}", "mutating...");
	s = "now I'm a different string";
	t.push_str(", pleased to meet you.");
	println!("{}", s);
	println!("{}", t);


}