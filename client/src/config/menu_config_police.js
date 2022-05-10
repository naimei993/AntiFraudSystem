//项目的菜单配置
const menuListPolice = [ //eslint-disable-next-line
  {
    title: '主页', // 菜单标题名称
    key: 'home', // 对应的path
    icon: 'HomeOutlined', // 图标名称
    path: '/admin/home/index'//对应路径
  },
  {
    title: '审核案件',
    key: 'case_square',
    icon: 'AuditOutlined',
    path:'/admin/case_square/index'
  },
  {
    title: '案件广场',
    key: 'case_all',
    icon: 'UnorderedListOutlined',
    path:'/admin/case_all/index'
  },
  {
    title: '悬赏任务',
    key: 'review',
    icon: 'LikeOutlined',
    path: '/admin/review/index'
    
  },
  {
    title: '上传任务',
    key: 'upload_case',
    icon: 'UploadOutlined',
    path: '/admin/upload_case/index'//flea market
  },
  {
    title: '社区生态',
    key: 'flea_market',
    icon: 'SmileOutlined',
    path: '/admin/flea_market/index'//flea market
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