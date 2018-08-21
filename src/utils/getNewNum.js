import randomNum from './getRandom';
import create2DArr from '../utils/create2DArr';

// 新数据产生函数,接收两个参数（被填充二维数组，填充个数）
export default function getNewNum(optionList, type) {
  const tempList = optionList;
  const newNumList = [...create2DArr()];
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
  const listObj = {
    tempList,
    newNumList
  };
  return listObj;
}
