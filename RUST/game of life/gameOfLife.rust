fn main() {
  println!("Hello World!");

  let mut board = [
    [true, false, false, false],
    [false, false, true, false],
    [false, false, true, false],
    [false, false, false, true]
  ];


  println!("1 1 live neighbors: {}", number_of_live_neighbors(1, 1, board));


  for i in 1..10 {
    board = turn(board, i);
    println!("here's our board {:?}", board);
  }




  // while live_count > 0, run turn()


  //println!("here's our board: {:?}", board);

  // for row in board.iter() {
  //   println!("here's our row: {:?}", row);
  // }

}


fn turn(board: [[bool; 4]; 4], turn_count: i32) -> [[bool; 4]; 4]{

  println!("turn {}", turn_count);

  let mut copy_of_board = board;

  for i in 0..copy_of_board.len(){
    for j in 0..board[i].len(){
      let live_neighbors = number_of_live_neighbors(i as i32, j as i32, board);

      let thisCell = board[i][j];

      if live_neighbors < 2 {
        copy_of_board[i][j] = false;
      } else if live_neighbors == 2 && thisCell{
        // don't need to do anything
      } else if live_neighbors == 3{
        // at 3 live neighbors, a live cell is overpopulated & dies, and a dead cell comes back to life
        if thisCell{
          copy_of_board[i][j] = false;
        } else {
          copy_of_board[i][j] = true;
        }
        
      } else {
        copy_of_board[i][j] = false;
      }
    }
  }


  return copy_of_board;
}

// function that returns # of live neighbors

fn number_of_live_neighbors(i:i32, j:i32, board: [[bool; 4]; 4]) -> usize {

  let mut live_count:usize = 0;

  live_count += is_live(i - 1, j - 1, board);
  live_count += is_live(i - 1, j, board);
  live_count += is_live(i - 1, j + 1, board);

  live_count += is_live(i, j - 1, board);
  live_count += is_live(i, j + 1, board);

  live_count += is_live(i + 1, j - 1, board);
  live_count += is_live(i + 1, j, board);
  live_count += is_live(i + 1, j + 1, board);

  return live_count;
}

fn is_live(i: i32, j: i32, board: [[bool; 4]; 4]) -> usize {
  if i < 0 || i >= 4 || j < 0 || j >= 4 {
    return 0; // TODO does this make sense?
  }
  return if board[i as usize][j as usize] { 1 } else { 0 };
}