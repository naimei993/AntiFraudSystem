import {SAVE_USER_INFO,DELETE_USER_INFO} from '../action_types'

//创建保存用户信息的action
export const createSaveUserInfoAction = (value)=> {
  //向localStorage中保存用户信息
  let j ={}
  j.id=value[0]
  j.username = value[1]
  j.imgsrc = value[2]
  j.type = value[3]
  console.log(JSON.stringify(j),"JJJJJJJJJJJJJJJJJJ");
  localStorage.setItem('user',JSON.stringify(j))
  //向localStorage中保存token
  localStorage.setItem('token',j)
  return {type:SAVE_USER_INFO,data:JSON.stringify(j)}
}
//创建删除用户信息的action
export const createDeleteUserInfoAction = ()=> {
  //从localStorage中删除用户信息
  localStorage.removeItem('user')
   //从localStorage中删除token
  localStorage.removeItem('token')
  return {type:DELETE_USER_INFO}
}
