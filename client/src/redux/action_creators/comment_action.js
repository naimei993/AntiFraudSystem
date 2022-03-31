import {SAVE_COMMENT_LIST} from '../action_types'

//创建保存用户信息的action
export const createSaveCommentAction = (value)=> {
  return {type:SAVE_COMMENT_LIST,data:value}
}
