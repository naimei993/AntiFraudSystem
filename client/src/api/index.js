import { message } from 'antd'
import jsonp from 'jsonp'
import ajax  from './ajax'
import {BASE_URL,CITY} from '../config/index'

//后台管理
//登录请求
// export const reqLogin = (username, password) => ajax('/login', {username, password}, 'POST')
export const reqLogin = (username, password) => ajax.post(`${BASE_URL}/login`, {username, password})
//获取商品列表
export const reqArticleList = (pageNum,pageSize) => ajax.get(`${BASE_URL}/articleList`,{params:{pageNum,pageSize}})
    
//文章是否展示
export const reqArticleIsShow = (data) => ajax.post(`${BASE_URL}/articleIsShow`,data)

//删除文章
export const reqDeleteArticlelist = (articleId) => ajax.post(`${BASE_URL}/article/deletearticle`, {articleId})

//获取文章类型列表
export const reqArticleType = (pageNum,pageSize) => ajax.get(`${BASE_URL}/articleType`,{params:{pageNum,pageSize}})

//添加文章类型分类
export const reqAddType = (typeValue) => ajax.post(`${BASE_URL}/articletype/addtype`, typeValue)

//修改文章类型分类
export const reqUpdateType = (typeValue) => ajax.post(`${BASE_URL}/articletype/updatetype`, typeValue)

//删除文章类型
export const reqDeleteType = (typeValue) => ajax.post(`${BASE_URL}/articletype/deletetype`, typeValue)

//根据ID获取文章内容
export const reqArticleById = (articleId) => ajax.get(`${BASE_URL}/article/info`,{params:{articleId}})

//获取评论
export const reqGetCommentBackground = (pageNum,pageSize)=>ajax.get(`${BASE_URL}/getcommentbackground`,{params:{pageNum,pageSize}})

//评论是否展示
export const reqCommentIsShow = (data) => ajax.post(`${BASE_URL}/commentIsShow`,data)

//删除评论
export const reqDeleteComment = (id)=>ajax.post(`${BASE_URL}/deletecomment`, {id})

//根据id获取评论
export const reqCommentById = (commentId) =>ajax.get(`${BASE_URL}/comment/info`,{params:{commentId}})






//前台
export const reqActualCombat = () => ajax.get(`${BASE_URL}/actualCombat`)

export const reqGenerateShortUrl = (url) => ajax.post(`${BASE_URL}/s`,{url})

export const reqGetComment = ()=>ajax.get(`${BASE_URL}/getcomment`)

export const reqSaveComment = (replydata) => ajax.post(`${BASE_URL}/savecomment`,replydata)

export const reqAddLikeOrDislike = (adddata) => ajax.post(`${BASE_URL}/addlikeordislike`,adddata)

export const reqReduceLikeOrDislike = (reduce) => ajax.post(`${BASE_URL}/reducelikeordislike`,reduce)

export const reqBlogContent = (makedid)=>ajax.get(`${BASE_URL}/upload/${makedid}.md`)

export const reqBlogMsg = (id) => ajax.post(`${BASE_URL}/markedcontent`,id)

// export const reqWheather = (cityname) => ajax.post(`${BASE_URL}/wheatherinfo`,cityname)

export const reqCategoryList = () => ajax.get(`${BASE_URL}/manage/category/list`)
    
//获取天气信息
export const reqWheather = ()=>{
    return new Promise((resolve,reject)=>{
        jsonp(`http://wthrcdn.etouch.cn/weather_mini?city=${CITY}`,(err,data)=>{
        if(err){
          message.error('请求天气接口失败，请联系管理员')
          return new Promise(()=>{})
        }else{
          
          resolve(data)
        }
      })
    })   
}

//新增商品分类
export const reqAddCategory = ({categoryName}) => ajax.post(`${BASE_URL}/manage/category/add`, {categoryName})

//更新商品分类
export const reqUpdateCategory = ({categoryId,categoryName}) => ajax.post(`${BASE_URL}/manage/category/update`, {categoryId,categoryName})

//请求删除分类
export const reqDeleteCategory = (categoryId) => ajax.post(`${BASE_URL}/manage/category/delete`, {categoryId})

//请求商品分页列表
export const reqProductList = (pageNum,pageSize)=> ajax.get(`${BASE_URL}/manage/product/list`,{params:{pageNum,pageSize}})

//请求商品上架下架处理
export const reqUpdateProdStatus = (productId,status) => ajax.post(`${BASE_URL}/manage/product/updateStatus`, {productId,status})

//搜索商品
export const reqSearchProductList = (pageNum,pageSize,searchType,keyWord)=> ajax.get(`${BASE_URL}/manage/product/search`,{params:{pageNum,pageSize,[searchType]:keyWord}})

//根据商品id获取信息
export const reqProdById = (productId)=> ajax.get(`${BASE_URL}/manage/product/info`,{params:{productId}})

//根据图片名称删除图片
export const reqDeletePicture = (name) => ajax.post(`${BASE_URL}/manage/img/delete`, {name})

//请求添加商品
export const reqAddProduct = (product) => ajax.post(`${BASE_URL}/manage/product/add`, {...product})

//请求更新商品
export const reqUpdateProduct = (product) => ajax.post(`${BASE_URL}/manage/product/update`, {...product})

//请求删除商品
export const reqDeleteProduct = (_id) => ajax.post(`${BASE_URL}/manage/product/delete`, {_id})

//请求所有角色列表
export const reqRoleList = ()=>ajax.get(`${BASE_URL}/manage/role/list`)

//请求添加角色
export const reqAddRole = ({roleName})=>ajax.post(`${BASE_URL}/manage/role/add`,{roleName})

//请求给角色授权export const reqAddRole = ({roleName})=>ajax.post(`${BASE_URL}/manage/role/add`,{roleName})
export const reqAuthRole = (roleObj)=>ajax.post(`${BASE_URL}/manage/role/update`,{...roleObj,auth_time:Date.now()})

//请求获取所有用户列表（同时携带着角色列表）
export const reqUserList = ()=> ajax.get(`${BASE_URL}/manage/user/list`)

//请求添加用户
export const reqAddUser = (userObj)=> ajax.post(`${BASE_URL}/manage/user/add`,{...userObj})

//请求更新用户
export const reqUpdateUser = (userObj)=> ajax.post(`${BASE_URL}/manage/user/update`,{...userObj})

//请求删除用户
export const reqDeleteUser = (userId)=> ajax.post(`${BASE_URL}/manage/user/delete`,{userId})