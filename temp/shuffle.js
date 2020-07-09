//经典洗牌算法
function shuflle(arr) {
  if(!Array.isArray(arr) && arr.length) {
    return [];
  }
  let res = [];
  for(let i = arr.length; i > 0; i--) {
    const idx = Math.floor(Math.random()*i);
    res.push(res[idx]);
    arr.splice(idx, 1);
  }
  return res
}
//现代洗牌算法
function shuffle(arr) {
  if(!Array.isArray(arr) && arr.length) {
    return [];
  }
  let res = [];
  for(let i = arr.length; i > 0; i--) {
    const idx = Math.floor(Math.random()*i);
    if(idx != i-1) {
      let tmp = arr[idx];
      arr[idx] = arr[i-1];
      arr[i-1] = tmp;
    }
  }
  return arr;
}
