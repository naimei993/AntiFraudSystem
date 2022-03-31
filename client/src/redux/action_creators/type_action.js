import {SAVE_TYPE_LIST} from '../action_types'

//创建保存用户信息的action
export const createSaveTypeAction = (value)=> {
  return {type:SAVE_TYPE_LIST,data:value}
}
