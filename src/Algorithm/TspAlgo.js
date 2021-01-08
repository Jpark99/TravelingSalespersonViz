function findPath(startRow, startCol, DestRow, DestCol) {

  let path = [];

  let rowDif = DestRow - startRow;
  let colDif = DestCol - startCol;      

  let row = startRow;
  let col = startCol;

  let increment = colDif>0 ? 1 : colDif<0 ? -1 : 0;
  while(colDif !== 0) {
    col += increment;
    path.push([row, col]);
    colDif -= increment;
  }
  increment = rowDif>0 ? 1 : rowDif<0 ? -1 : 0;
  while(Math.abs(rowDif) > 1) {
    row += increment;
    path.push([row, col]);
    rowDif -= increment;
  }
  if (path[path.length-1][0] == DestRow && path[path.length-1][1] == DestCol) {
    path.pop();
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
    