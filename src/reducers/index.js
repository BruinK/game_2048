import { originData } from './INIT_STORE';

// 生成从minNum到maxNum的随机数
function randomNum(minNum, maxNum) {
  switch (arguments.length) {
    case 1:
      return parseInt(Math.random() * minNum + 1, 10);
    case 2:
      return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
    default:
      return 0;
  }
}

function getNewNum(optionList, type) {
  const tempList = optionList;

  let order1 = -1;
  let order2 = -1;
  let symbol = -1;
  let flag = type;
  console.log('temp', tempList);
  do {
    order1 = randomNum(1, 4);
    order2 = randomNum(1, 4);
    symbol = randomNum(1, 4);
    if (tempList[order1 - 1][order2 - 1] === 0) {
      switch (symbol) {
        case 1:
        case 3:
        case 2:
          tempList[order1 - 1][order2 - 1] = 2;
          flag -= 1;
          break;
        case 4:
          tempList[order1 - 1][order2 - 1] = 4;
          flag -= 1;
          break;
        default:
          break;
      }
    }
  } while (flag !== 0);
  return tempList;
}

function moveToleft(moveList) {
  const temp = [];
  let scoresTemp = 0;
  const isEmpty = [];
  let overFlag = true;
  let middleList = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
  moveList.map((item, idx) => {
    temp.length = 0;
    item.map(it => temp.push(it));
    // 合并
    for (let i = 0; i < temp.length; i++) {
      if (temp[i] !== 0) {
        for (let k = i + 1; k < temp.length; k++) {
          // 添加判断 避免 2 2 4 8 变成一个16
          let flag = 0;
          if (temp[k] !== 0 && temp[k] !== temp[i]) break;
          
          if (temp[i] === temp[k]) {
            const addTemp = temp[i];
            temp[i] = 2 * addTemp;
            scoresTemp += 2 * addTemp;
            temp[k] = 0;
            flag = 1;
          }
          if (flag) break;
        }
      }
    }
    // 放入中间数组
    for (let j = temp.length - 1; j >= 0; j--) {
      if (temp[j] !== 0) {
        middleList[idx].length -= 1;
        middleList[idx].unshift(temp[j]);
      }
    }
  });
  console.log('分数', scoresTemp);
  middleList.map((item, idx) => {
    item.map((it, id) => {
      if (it === 0) {
        isEmpty.push(`${idx}-${id}`);
      }
    });
  });
  // 判断是否死亡
  if (isEmpty.length === 0) {
    for (let i = 0; i < middleList.length; i++) {
      for (let j = 0; j < middleList.length; j++) {
        if (i + 1 === middleList.length) {
          break;
        } else if (middleList[i][j] === middleList[i + 1][j]) {
          overFlag = false;
        }
        if (j + 1 === middleList.length) {
          break;
        } else if (middleList[i][j] === middleList[i][j + 1]) {
          overFlag = false;
        }
      }
    }
    if (overFlag) {
      alert('Game Over');
      const isOver = true;
      const obj = { middleList, scoresTemp, isOver };
      return obj;
    }
  }

  if (JSON.stringify(moveList) !== JSON.stringify(middleList)) {
    middleList = getNewNum(middleList, 1);
    const isOver = false;
    const obj = { middleList, scoresTemp, isOver };
    return obj;
  }
  const isOver = false;
  const obj = { middleList, scoresTemp, isOver };
  return obj;
}

export default function get(state = originData, action) {
  switch (action.type) {
    case 'STARTGAME': {
      const newState = { ...state };
      newState.mainList = [[2, 2, 2, 2], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
      const newList = getNewNum(newState.mainList, 2);
      newState.scores = 0;
      newState.mainList = [...newList];
      return newState;
    }
    case 'TOUP': {
      const newState = { ...state };
      const tempList = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
      for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
          tempList[i][j] = newState.mainList[j][3 - i];
        }
      }

      const objTemp = moveToleft(tempList);

      const upList = objTemp.middleList;

      for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
          tempList[j][i] = upList[3 - i][j];
        }
      }
      if (objTemp.isOver) {
        if (newState.bestScores < newState.scores) {
          newState.bestScores = newState.scores;
        }
      }
      newState.scores += objTemp.scoresTemp;
      newState.mainList = [...tempList];

      if (newState.scores >= newState.bestScores) {
        newState.bestScores = newState.scores;
      }
      return newState;
    }
    case 'TODOWN': {
      const newState = { ...state };
      const tempList = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
      for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
          tempList[j][i] = newState.mainList[3 - i][j];
        }
      }

      const objTemp = moveToleft(tempList);
      const upList = objTemp.middleList;

      for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
          tempList[i][j] = upList[j][3 - i];
        }
      }
      if (objTemp.isOver) {
        if (newState.bestScores < newState.scores) {
          newState.bestScores = newState.scores;
        }
      }
      newState.mainList = [...tempList];
      newState.scores += objTemp.scoresTemp;

      if (newState.scores >= newState.bestScores) {
        newState.bestScores = newState.scores;
      }
      return newState;
    }
    case 'TOLEFT': {
      const newState = { ...state };

      const objTemp = moveToleft(newState.mainList);
      const tempList = objTemp.middleList;
      if (objTemp.isOver) {
        if (newState.bestScores < newState.scores) {
          newState.bestScores = newState.scores;
        }
      }
      newState.mainList = [...tempList];
      newState.scores += objTemp.scoresTemp;

      if (newState.scores >= newState.bestScores) {
        newState.bestScores = newState.scores;
      }
      return newState;
    }
    case 'TORIGHT': {
      const newState = { ...state };
      const tempList = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
      newState.mainList.map((item, idx) => {
        tempList[idx] = [...item.reverse()];
      });

      const objTemp = moveToleft(tempList);
      const downList = objTemp.middleList;

      downList.map((item, idx) => {
        tempList[idx] = [...item.reverse()];
      });

      if (objTemp.isOver) {
        if (newState.bestScores < newState.scores) {
          newState.bestScores = newState.scores;
        }
      }
      newState.mainList = [...tempList];
      newState.scores += objTemp.scoresTemp;

      if (newState.scores >= newState.bestScores) {
        newState.bestScores = newState.scores;
      }
      return newState;
    }
    default:
      return state;
  }
}

