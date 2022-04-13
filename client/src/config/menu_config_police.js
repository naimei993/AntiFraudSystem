//项目的菜单配置
const menuListPolice = [ //eslint-disable-next-line
  {
    title: '主页', // 菜单标题名称
    key: 'home', // 对应的path
    icon: 'HomeOutlined', // 图标名称
    path: '/admin/home/index'//对应路径
  },
  {
    title: '辖区案件',
    key: 'case_square',
    icon: 'UnorderedListOutlined',
    path:'/admin/case_square/index'
  },
  
  {
    title: '社区生态',
    key: 'flea_market',
    icon: 'SmileOutlined',
    path: '/admin/flea_market/index'//flea market
  },
  {
    title: '历史审核',
    key: 'history_review',
    icon: 'LikeOutlined',
    path: '/admin/history_review/index'
    
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
export default menuListPolice