// 最高分，与历史最高分对比、存储函数
export default function handelScores(newState, objTemp) {
  const tempState = { ...newState };
  if (objTemp.isOver) {
    if (tempState.bestScores < tempState.scores) {
      tempState.bestScores = tempState.scores;
    }
  }
  tempState.overFlag = objTemp.isOver;
  tempState.scores += objTemp.scoresTemp;

  if (tempState.scores >= tempState.bestScores) {
    tempState.bestScores = tempState.scores;
  }
  return { ...tempState };
}
