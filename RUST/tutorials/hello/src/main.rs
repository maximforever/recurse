
// Import (via `use`) the `fmt` module to make it available.
use std::fmt;
// use std::fmt::{self, Formatter, Display};

fn main() {



    // The statements here will be executed when the compiled binary is called

    // Print text to the console
    println!("Hello World!");
    println!("{} days, {} months", 31, 3);

    println!("{0}, get to da {1}", "quick", "choppa");


    println!("{} of {:b} people know binary, the other half doesn't", 1, 2);

    println!("Pi is roughly {}", format!("{:.*}", 3, std::f64::consts::PI));


	 println!("3 - 2 = {}", 3u32 - 2);
    // TODO ^ Try changing `1i32` to `1u32` to see why the type is important


}


