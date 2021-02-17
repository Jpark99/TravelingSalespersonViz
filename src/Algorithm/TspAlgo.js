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

function distanceMatrix(pins) {
  let disMatrix = [];
  for (let i = 0; i < pins.length; i++) {
    let dis = [];
    for (let j = 0; j < pins.length; j++) {
      dis.push(0);
    }
    disMatrix.push(dis);
  }
  let start = 0;
  let end = 1;
  while (start < pins.length-1) {
    while(end < pins.length) {
      let path = findPath(pins[start][0], pins[start][1], pins[end][0], pins[end][1]);
      disMatrix[start][end] = path.length;
      disMatrix[end][start] = path.length;
      end++;
    }
    start++;
    end = start+1;
  }
  return disMatrix;
}

function indexOfSmallest(a) {
  var lowest = 0;
  for (var i = 1; i < a.length; i++) {
   if (a[i] < a[lowest]) lowest = i;
  }
  return [a[lowest],lowest];
 }

function findMin(M, S, start) {
  if (S.length === 1) {
    return [ M[0][S[0]], [S[0]] ];
  }
  else {
    let candidates = [];
    let pathOps = [];
    for (let k = 0; k < S.length; k++) {
      let new_S = [];
      if (k === S.length-1) {
        new_S = S.slice(0, k);
      }
      else {
        new_S = S.slice(0, k).concat(S.slice(k-S.length+1));
      }
      let minPath = findMin(M, new_S, S[k]);
      candidates.push(M[start][S[k]] + minPath[0]);
      pathOps.push(minPath[1]);
    }
    const result = indexOfSmallest(candidates);
    let resultPath = pathOps[result[1]]
    resultPath.unshift(S[result[1]]);
    return [result[0], resultPath];
  }
}

export function travelingSalesperson(pins) {
  let dist = distanceMatrix(pins);
  let S = [];
  for (let i = 1; i < pins.length; i++) {
    S.push(i)
  }
  let path = findMin(dist, S, 0)[1];
  path.unshift(0);
  let coordinates = [];
  console.log(path);
  for (let j = 0; j < path.length; j++) {
    let start = path[j];
    let finish = path[j+1];
    if (j+1 === path.length) {
      finish = 0;
    }
    let currentPath = findPath(pins[start][0], pins[start][1], pins[finish][0],pins[finish][1]);
    coordinates.push(currentPath);
  }
  return coordinates;
}
    