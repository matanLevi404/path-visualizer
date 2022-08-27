export const generateAdjencencyList = (rows: number, cols: number) => {
  let adjencencyList = [];
  const neighbors = {
    up: [-2, 0],
    left: [0, -2],
    right: [0, 2],
    down: [2, 0],
  };
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      const node = [i, j];
      for (const dir in neighbors) {
        const neighborNode = [i + neighbors[dir][0], j + neighbors[dir][1]];
        if (
          neighborNode[0] < rows &&
          neighborNode[0] >= 0 &&
          neighborNode[1] < cols &&
          neighborNode[1] >= 0
        ) {
          const edge = {
            node,
            neighborNode,
            weight: Math.floor(Math.random() * 736) + 1,
          };
          adjencencyList.push(edge);
        }
      }
    }
  }

  adjencencyList.sort(function (a, b) {
    return a.weight - b.weight;
  });
  return adjencencyList;
};
