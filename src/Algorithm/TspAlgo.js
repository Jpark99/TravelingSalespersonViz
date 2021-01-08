function findPath(startRow, startCol, DestRow, DestCol) {

  let path = [];

  let rowDif = DestRow - startRow;
  let colDif = DestCol - startCol;      

  let row = startRow;
  let col = startCol;

  if (Math.abs(rowDif) === Math.abs(colDif)) {
    return diagnoalPath(startRow, startCol, DestRow, DestCol, path);
  }
  else {
    if (Math.abs(colDif) > Math.abs(rowDif)) {
      let colIncrement = colDif>0 ? 1 : colDif<0 ? -1 : 0;
      while(Math.abs(colDif) > Math.abs(rowDif)) {
        col += colIncrement;
        path.push([row, col]);
        colDif -= colIncrement;
      }
      return diagnoalPath(row, col, DestRow, DestCol, path);
    }
    else {
      let rowIncrement = rowDif>0 ? 1 : rowDif<0 ? -1 : 0;
      while(Math.abs(rowDif) > Math.abs(colDif)) {
        row += rowIncrement;
        path.push([row, col]);
        rowDif -= rowIncrement;
      }
      return diagnoalPath(row, col, DestRow, DestCol, path);
    } 
  }
}

function diagnoalPath(startRow, startCol, DestRow, DestCol, lastPath) {
  let path = lastPath.slice();

  let rowDif = DestRow - startRow;
  let colDif = DestCol - startCol;      

  let row = startRow;
  let col = startCol;

  let diagDif = Math.abs(rowDif);
  let colIncrement = colDif>0 ? 1 : colDif<0 ? -1 : 0;
  let rowIncrement = rowDif>0 ? 1 : rowDif<0 ? -1 : 0;
  while (diagDif > 1) {
    row+=rowIncrement;
    col+=colIncrement;
    path.push([row, col]);
    diagDif -= 1;
  }
  return path;
}

export function travelingSalesperson(pins) {
  let paths = [];
  let start = pins[0]
  let dest = pins[1];
  let startIndx = 0;
  let destIndx = 1;
  do {
    let currentPath = findPath(start[0], start[1], dest[0], dest[1]);
    paths.push(currentPath);
    startIndx ++;
    destIndx ++;
    if (destIndx >= pins.length) {
      destIndx = 0;
    }
    start = pins[startIndx];
    dest = pins[destIndx];
  }
  while (startIndx < pins.length);

  return paths;
}
    