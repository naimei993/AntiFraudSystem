import {SAVE_ARTICLE_LIST} from '../action_types'

//创建保存用户信息的action
export const createSaveArticleAction = (value)=> {
  return {type:SAVE_ARTICLE_LIST,data:value}
}
