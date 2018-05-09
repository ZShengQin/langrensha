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
  return roleList.sort((a, b) => {
    return Math.random() > 0.5 ? -1 : 1
  }).join('')

}

module.exports = {
  genShuffleArray: genShuffleArray
}