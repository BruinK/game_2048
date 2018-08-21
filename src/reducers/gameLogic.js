import { originData } from './INIT_STORE';
import * as ActionType from '../const/index';
import getNewNum from '../utils/getNewNum';
import moveToleft from '../utils/moveToleft';
import create2DArr from '../utils/create2DArr';
import reverseList from '../utils/reverseList';
import matrixTransform from '../utils/matrixTransform';
import handelScores from '../utils/handelScores';

export default function gameLogic(state = originData, action) {
  const tempList = create2DArr();
  const newNumTemp = create2DArr();
  const combineTemp = create2DArr();
  const mainTemp = create2DArr();
  switch (action.type) {
    case ActionType.STARTGAME: {
      const objTemp = getNewNum(mainTemp, 2);
      return {
        ...state,
        scores: 0,
        mainList: [...objTemp.tempList],
        newNumList: [...objTemp.newNumList],
        combineList: create2DArr(),
        overFlag: false
      };
    }
    //  四个方向的移动只考虑为向左移动，
    //  其他方向的先把矩阵旋转为向左，
    //  再调用左移函数，得到需要的数据，
    //  最后统一进行store存储
    case ActionType.TOUP:
    case ActionType.TODOWN:
    case ActionType.TOLEFT:
    case ActionType.TORIGHT: {
      const newState = { ...state };
      let objTemp = {};
      switch (action.type) {
        case ActionType.TOUP: {
          objTemp = moveToleft(matrixTransform(newState.mainList, tempList, 1));
          newState.mainList = [...matrixTransform(objTemp.middleList, tempList, 2)];
          newState.newNumList = [...matrixTransform(objTemp.newNumList, newNumTemp, 2)];
          newState.combineList = [...matrixTransform(objTemp.combineList, combineTemp, 2)];
          break;
        }
        case ActionType.TODOWN: {
          objTemp = moveToleft(matrixTransform(newState.mainList, tempList, 2));
          newState.mainList = [...matrixTransform(objTemp.middleList, tempList, 1)];
          newState.newNumList = [...matrixTransform(objTemp.newNumList, newNumTemp, 1)];
          newState.combineList = [...matrixTransform(objTemp.combineList, combineTemp, 1)];
          break;
        }
        case ActionType.TOLEFT: {
          objTemp = moveToleft(newState.mainList);
          newState.newNumList = [...objTemp.newNumList];
          newState.combineList = [...objTemp.combineList];
          newState.mainList = [...objTemp.middleList];
          break;
        }
        case ActionType.TORIGHT: {
          objTemp = moveToleft(reverseList(newState.mainList, mainTemp));
          newState.newNumList = reverseList(objTemp.newNumList, newNumTemp);
          newState.combineList = reverseList(objTemp.combineList, combineTemp);
          newState.mainList = reverseList(objTemp.middleList, tempList);
          break;
        }
        default:
          break;
      }

      const tempState = { ...handelScores(newState, objTemp) };
      return {
        ...state,
        mainList: newState.mainList,
        newNumList: newState.newNumList,
        combineList: newState.combineList,
        scores: tempState.scores,
        bestScores: tempState.bestScores,
        overFlag: tempState.overFlag
      };
    }
    case ActionType.CLOSEMASK: {
      return {
        ...state,
        overFlag: false
      };
    }
    default:
      return state;
  }
}

