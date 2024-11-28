// A program that solves sudokus

/*
What does the programm need?
  Function to build a field
    Using multidimensional arrays
  Functions to check the sudoku field
    3 Functions to check for double numbers: 
      + row
      + collum
      + 3x3 grid 
  A recursive function to solve the sudoku
    functions tries every number and calls it self if number is valid (not double). If number is invalid the function goes one step back and tries the next number and so on.

*/
const SIDE_LENGTH = 9;
let solutionFound = false;


let sudokuGrid = 
  [
    [ , , ,    8, ,1,     , , ,],
    [ , , ,     , , ,     ,4,3,],
    [5, , ,     , , ,     , , ,],

    [ , , ,     ,7, ,    8, , ,],
    [ , , ,     , , ,    1, , ,],
    [ ,2, ,     ,3, ,     , , ,],
    
    [6, , ,     , , ,     ,7,5,],
    [ , ,3,    4, , ,     , , ,],
    [ , , ,    2, , ,    6, , ,],
  ];





function gridBuilder(beam) {

  console.log('++=====================================++');
  console.log(`|| ${beam[0]} | ${beam[1]} | ${beam[2]} || ${beam[3]} | ${beam[4]} | ${beam[5]} || ${beam[6]} | ${beam[7]} | ${beam[8]} ||`);
  console.log(`|| ${beam[9]} | ${beam[10]} | ${beam[11]} || ${beam[12]} | ${beam[13]} | ${beam[14]} || ${beam[15]} | ${beam[16]} | ${beam[17]} ||`);  
  console.log(`|| ${beam[18]} | ${beam[19]} | ${beam[20]} || ${beam[21]} | ${beam[22]} | ${beam[23]} || ${beam[24]} | ${beam[25]} | ${beam[26]} ||`);  
  console.log('++=====================================++');
  console.log(`|| ${beam[27]} | ${beam[28]} | ${beam[29]} || ${beam[30]} | ${beam[31]} | ${beam[32]} || ${beam[33]} | ${beam[34]} | ${beam[35]} ||`);  
  console.log(`|| ${beam[36]} | ${beam[37]} | ${beam[38]} || ${beam[39]} | ${beam[40]} | ${beam[41]} || ${beam[42]} | ${beam[43]} | ${beam[44]} ||`);  
  console.log(`|| ${beam[45]} | ${beam[46]} | ${beam[47]} || ${beam[48]} | ${beam[49]} | ${beam[50]} || ${beam[51]} | ${beam[52]} | ${beam[53]} ||`);  
  console.log('++=====================================++');
  console.log(`|| ${beam[54]} | ${beam[55]} | ${beam[56]} || ${beam[57]} | ${beam[58]} | ${beam[59]} || ${beam[60]} | ${beam[61]} | ${beam[62]} ||`);  
  console.log(`|| ${beam[63]} | ${beam[64]} | ${beam[65]} || ${beam[66]} | ${beam[67]} | ${beam[68]} || ${beam[69]} | ${beam[70]} | ${beam[71]} ||`);  
  console.log(`|| ${beam[72]} | ${beam[73]} | ${beam[74]} || ${beam[75]} | ${beam[76]} | ${beam[77]} || ${beam[78]} | ${beam[79]} | ${beam[80]} ||`);  
  console.log('++=====================================++');
  
}

function gridFiller(grid) {
  for (let row = 0; row < SIDE_LENGTH; row++) {
    for (let collum = 0; collum < SIDE_LENGTH; collum++) {
      if(!grid[row][collum]) {
        grid[row][collum] = ' ';
      }     
    }
    
  }
}

function uniqueNumRowBeam(index, num) {
  for (let j = 0; j < 9; j++) {
    if((index - j) % 9 === 0) {
      return !sudokuBeam.slice(index - j, index - j + 8).includes(num)
    }    
  }
}

function uniqueNumColBeam(index, num) {
  let startNum = (index - (Math.floor(index / 9) * 9));
  
  for (let i = 0; i <  9; i++) {
    if(sudokuBeam[startNum] === num) {
      return false;
    }       
    startNum += 9;
  }
  return true;
}

function uniqueNumGridBeam(index, num) {
  let wierdUpperLeftCornerArr = [0, 3, 6, 27, 30, 33, 54, 57, 60]
 
  for(let collum = 0; collum < 3; collum++) {
    for (let row = 0; row < 27; row += 9) {      
      if(wierdUpperLeftCornerArr.includes(index - collum - row)) {
        let upperLeftCorner = index - collum - row;  
        let count = 0;
        while(count < 27) {
          if([sudokuBeam[upperLeftCorner + count], sudokuBeam[upperLeftCorner + count + 1], sudokuBeam[upperLeftCorner + count + 2]].includes(num)) {
            return false;
          }
          count += 9;
          //console.log(count)
        }
      }   
    }  
  } 
  return true; 
}

function numberFinder(index = 0) {
  if(index === 81) {
    gridBuilder(sudokuBeam);
    solutionFound = true;
    return;    
  }

  if (solutionFound) {
    return;
  }

  tries++;
  if (typeof originalBeam[index] === 'number') {
    numberFinder(index + 1);    
    return;
  }

  for (let num = 1; num <= 9; num++) {    
    if(uniqueNumRowBeam(index, num) && uniqueNumColBeam(index, num) && uniqueNumGridBeam(index, num)) {
      sudokuBeam[index] = num;
      numberFinder(index + 1);
      sudokuBeam[index] = ' ';
    }
  }  
}

gridFiller(sudokuGrid);
let sudokuBeam = sudokuGrid.flat();
let originalBeam = sudokuGrid.flat();
gridBuilder(sudokuBeam);

let tries = 0;
numberFinder();
console.log("tries: "+ tries);  