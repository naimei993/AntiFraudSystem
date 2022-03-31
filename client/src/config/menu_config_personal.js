//项目的菜单配置
const menuList = [ //eslint-disable-next-line
  {
    title: '主页', // 菜单标题名称
    key: 'home', // 对应的path
    icon: 'HomeOutlined', // 图标名称
    path: '/admin/home'//对应路径
  },
  {
    title: '我要举报',
    key: 'report',
    icon: 'LikeOutlined',
    path: '/admin/report'
  },
  {
    title: '文章',
    key: 'article_about',
    icon: 'FormOutlined',
    children: [ // 子菜单列表
      {
        title: '文章列表',
        key: 'articlelist',
        icon: 'UnorderedListOutlined',
        path: '/admin/article_about/articlelist'
      },
      {
        title: '写文章',
        key: 'writearticle',
        icon: 'EditOutlined',
        path: '/admin/article_about/writearticle'
      },
      {
        title: '分类目录',
        key: 'classification',
        icon: 'ClusterOutlined',
        path: '/admin/article_about/classification'
      },
    ]
  },
  {
    title: '积分商城',
    key: 'Integralmall',
    icon: 'ShoppingOutlined',
    path: '/admin/Integralmall'
  },
  {
    title: '个人中心',
    key: 'personalcenter',
    icon: 'UserOutlined',
    path: '/admin/personalcenter'
  },
]
export default menuList