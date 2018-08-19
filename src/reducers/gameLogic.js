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

  const newNumList = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
  let order1 = -1;
  let order2 = -1;
  let symbol = -1;
  let flag = type;
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
          newNumList[order1 - 1][order2 - 1] = 1;
          flag -= 1;
          break;
        case 4:
          tempList[order1 - 1][order2 - 1] = 4;
          newNumList[order1 - 1][order2 - 1] = 1;
          flag -= 1;
          break;
        default:
          break;
      }
    }
  } while (flag !== 0);
  const listObj = { tempList, newNumList };
  return listObj;
}

function moveToleft(moveList) {
  const temp = [];
  let scoresTemp = 0;
  const isEmpty = [];
  let overFlag = true;
  let middleList = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
  moveList.forEach((item, idx) => {
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
  middleList.forEach((item, idx) => {
    item.forEach((it, id) => {
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
      const isOver = true;
      const newNumList = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
      const obj = {
        middleList, scoresTemp, isOver, isEmpty, newNumList
      };
      return obj;
    }
  }

  if (JSON.stringify(moveList) !== JSON.stringify(middleList)) {
    const listObj = getNewNum(middleList, 1);
    middleList = listObj.tempList;
    const { newNumList } = listObj;
    const isOver = false;
    const obj = {
      middleList, scoresTemp, isOver, isEmpty, newNumList
    };
    return obj;
  }
  const isOver = false;
  const newNumList = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
  const obj = {
    middleList, scoresTemp, isOver, isEmpty, newNumList
  };
  return obj;
}

export default function gameLogic(state = originData, action) {
  switch (action.type) {
    case 'STARTGAME': {
      const newState = { ...state };
      newState.mainList = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
      // newState.mainList = [[0, 2, 4, 8], [16, 4096, 32, 8192], [64, 0, 128, 256], [512, 1024, 2048, 0]];

      const listObj = getNewNum(newState.mainList, 2);

      newState.scores = 0;
      newState.mainList = [...listObj.tempList];
      newState.newNumList = [...listObj.newNumList];
      newState.overFlag = false;
      return newState;
    }
    case 'TOUP': {
      const newState = { ...state };
      const tempList = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
      const newNumTemp = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
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
          newNumTemp[j][i] = objTemp.newNumList[3 - i][j];
        }
      }
      newState.newNumList = [...newNumTemp];

      if (objTemp.isOver) {
        if (newState.bestScores < newState.scores) {
          newState.bestScores = newState.scores;
        }
      }
      newState.scores += objTemp.scoresTemp;
      newState.mainList = [...tempList];
      newState.overFlag = objTemp.isOver;


      if (newState.scores >= newState.bestScores) {
        newState.bestScores = newState.scores;
      }
      return newState;
    }
    case 'TODOWN': {
      const newState = { ...state };
      const tempList = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
      const newNumTemp = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
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
          newNumTemp[i][j] = objTemp.newNumList[j][3 - i];
        }
      }

      newState.newNumList = [...newNumTemp];

      if (objTemp.isOver) {
        if (newState.bestScores < newState.scores) {
          newState.bestScores = newState.scores;
        }
      }
      newState.mainList = [...tempList];
      newState.overFlag = objTemp.isOver;
      newState.scores += objTemp.scoresTemp;

      if (newState.scores >= newState.bestScores) {
        newState.bestScores = newState.scores;
      }
      return newState;
    }
    case 'TOLEFT': {
      const newState = { ...state };

      const objTemp = moveToleft(newState.mainList);
      newState.newNumList = [...objTemp.newNumList];

      const tempList = objTemp.middleList;

      if (objTemp.isOver) {
        if (newState.bestScores < newState.scores) {
          newState.bestScores = newState.scores;
        }
      }
      newState.mainList = [...tempList];
      newState.overFlag = objTemp.isOver;
      newState.scores += objTemp.scoresTemp;

      if (newState.scores >= newState.bestScores) {
        newState.bestScores = newState.scores;
      }
      return newState;
    }
    case 'TORIGHT': {
      const newState = { ...state };
      const tempList = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
      const newNumTemp = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];

      newState.mainList.forEach((item, idx) => {
        tempList[idx] = [...item.reverse()];
      });

      const objTemp = moveToleft(tempList);

      objTemp.newNumList.forEach((item, idx) => {
        newNumTemp[idx] = [...item.reverse()];
      });
      newState.newNumList = [...newNumTemp];


      objTemp.middleList.forEach((item, idx) => {
        tempList[idx] = [...item.reverse()];
      });

      if (objTemp.isOver) {
        if (newState.bestScores < newState.scores) {
          newState.bestScores = newState.scores;
        }
      }
      newState.mainList = [...tempList];
      newState.overFlag = objTemp.isOver;
      newState.scores += objTemp.scoresTemp;

      if (newState.scores >= newState.bestScores) {
        newState.bestScores = newState.scores;
      }
      return newState;
    }
    case 'CLOSEMASK': {
      return {
        ...state,
        overFlag: false
      };
    }
    default:
      return state;
  }
}

