const app = getApp()

/**
 * 生成打乱顺序的数组
 */
const genShuffleArray = member => {
  //生成一个角色数组
  let roleList = []
  //member[1]个平民
  for(let i = 0; i < member[1]; i++) roleList.push(1)
  //member[2]个狼人
  for(let i = member[1]; i < member[1] + member[2]; i++) roleList.push(2)
  //其他角色
  for(let i = 3; i < member.length; i++){
    if(member[i]) roleList.push(i)
  }

  //打乱顺序
  for (let i = roleList.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (roleList.length + 1));
    let temp = roleList[i];
    roleList[i] = roleList[j];
    roleList[j] = temp;
  }
  return roleList.join('');
}

/**
 * 数字转化为角色
 */
const transRole = num => {
  let roleId = app.globalData.roleString.charAt(num - 1)
  switch(roleId){
    case '1':
      return "平民"
    case '2':
      return "狼人"
    case '3':
      return "预言家"
    case '4':
      return "女巫"
    case '5':
      return "猎人"
    case '6':
      return "守卫"
    case '7':
      return "丘比特"
    case '8':
      return "白痴"
    case '9':
      return "小女孩"
    default:
      return "Error!"
  }
}

/**
 * 休眠
 * @pram sleepTime: 休眠的时间，毫秒
 */
const sleep = sleepTime => {
  let now = new Date()
  let exitTime = now.getTime() + sleepTime
  while (true) {
    now = new Date()
    if (now.getTime() > exitTime) {
      return
    }
  }
}


module.exports = {
  genShuffleArray: genShuffleArray,
  transRole: transRole,
  sleep: sleep
}