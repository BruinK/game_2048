import create2DArr from '../utils/create2DArr';
import getNewNum from './getNewNum';

// 实际处理左移函数，
// 判断是否死亡
export default function moveToleft(moveList) {
  const temp = [];
  const combineTemp = [0, 0, 0, 0];
  let scoresTemp = 0;
  const isEmpty = [];
  let overFlag = true;
  const isOver = true;
  const newNumList = create2DArr();
  const middleList = create2DArr();
  const combineList = create2DArr();
  moveList.forEach((item, idx) => {
    temp.length = 0;
    combineTemp.length = 0;
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
            combineTemp[i] = 2;
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

        combineList[idx].length -= 1;
        combineList[idx].unshift(combineTemp[j]);
      }
    }
  });
  // 记录当前空格
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
      const obj = {
        middleList,
        scoresTemp,
        isOver,
        isEmpty,
        newNumList,
        combineList
      };
      return obj;
    }
  }

  if (JSON.stringify(moveList) !== JSON.stringify(middleList)) {
    const listObj = getNewNum(middleList, 1);
    const obj = {
      middleList: listObj.tempList,
      scoresTemp,
      isOver: false,
      isEmpty,
      newNumList: listObj.newNumList,
      combineList
    };
    return obj;
  }
  const obj = {
    middleList,
    scoresTemp,
    isOver: false,
    isEmpty,
    newNumList,
    combineList
  };
  return obj;
}
