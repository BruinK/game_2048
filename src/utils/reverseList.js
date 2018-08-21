// 数组逆序，接收两个参数（待逆序数组，待填充数组）
export default function reverseList(list, temp) {
  const tempList = [...temp];
  for (let i = 0; i < list.length; i++) {
    for (let j = 0; j < list.length; j++) {
      tempList[i][j] = list[i][3 - j];
    }
  }
  return [...tempList];
}
