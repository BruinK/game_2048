// 矩阵转置函数，接收三个参数（待转数组，填充数组，转置类型）
export default function matrixTransform(list, temp, type) {
  // 1 逆时针90
  const tempList = [...temp];
  if (type === 1) {
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        tempList[i][j] = list[j][3 - i];
      }
    }
    return [...tempList];
  }

  // 2 顺时针90
  if (type === 2) {
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        tempList[j][i] = list[3 - i][j];
      }
    }
    return [...tempList];
  }

  return null;
}
