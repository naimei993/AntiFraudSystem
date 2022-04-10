//项目的菜单配置
const menuListPeople = [ //eslint-disable-next-line
  {
    title: '主页', // 菜单标题名称
    key: 'home', // 对应的path
    icon: 'HomeOutlined', // 图标名称
    path: '/admin/home/index'//对应路径
  },
  {
    title: '我要举报',
    key: 'reporting_center',
    icon: 'LikeOutlined',
    path: '/admin/reporting_center/index'
  },
  
  {
    title: '协助审核',
    key: 'assist_audit',
    icon: 'TeamOutlined',
    path:'/admin/assist_audit/index'
  },
  {
    title: '跳蚤市场',
    key: 'flea_market',
    icon: 'SmileOutlined',
    path: '/admin/flea_market/index'//flea market
  },
  {
    title: '历史审核',
    key: 'article_about',
    icon: 'FormOutlined',
    path:'/admin/article_about/index'
  },
  {
    title: '积分商城',
    key: 'integralmall',
    icon: 'ShoppingOutlined',
    path: '/admin/integralmall/index'
  },
  {
    title: '个人中心',
    key: 'personalcenter',
    icon: 'UserOutlined',
    path: '/admin/personalcenter/index'
  },
]
export default menuListPeople