import React from 'react';
import { Comment, Avatar,Image,Divider,Button } from 'antd';
import {ShoppingCartOutlined,} from '@ant-design/icons'
import img from '../../static/avatar.webp'
import './fleamarket.min.css'
import avatar from '../../static/avatar.webp'
const Fleamarket = () => {

    const ExampleComment = (props) => (
        <Comment
          actions={[<span key="comment-nested-reply-to">回复</span>]}
          author={<span>{props.info.author}</span>}
          avatar={<Avatar src={img} alt="Han Solo" />}
          content={
            <p>
              {props.info.content}
            </p>
          }
        >
          {props.children}
        </Comment>
      );
    return (
        <div className='fleamarket'>
            <div className='fleam_all'>
              <div className='fleam_left'>
              <Comment
          actions={[<span key="comment-nested-reply-to">回复</span>]}
          author={<span>张伟</span>}
          avatar={<Avatar src={img} alt="Han Solo" />}
          content={
            <div>
              闲置二手手机出售，可小刀
              <Image
      width={160}
      src="http://pic2.58cdn.com.cn/zhuanzh/n_v2bc406c33c827415a915c5592890876c0_338_282.jpg"
    />
            </div>
          }
        >
        </Comment>
            <ExampleComment info={{author:"张三",content:"物美价廉，值得一看"}}>
            </ExampleComment>
            <Divider dashed />
            <Comment
          actions={[<span key="comment-nested-reply-to">回复</span>]}
          author={<span>张伟</span>}
          avatar={<Avatar src={img} alt="Han Solo" />}
          content={
            <div>
              闲置二手手机出售，可小刀
              <Image
      width={160}
      src="http://pic2.58cdn.com.cn/zhuanzh/n_v2bc406c33c827415a915c5592890876c0_338_282.jpg"
    />
            </div>
          }
        >
        </Comment>
            <ExampleComment info={{author:"张三",content:"物美价廉，值得一看"}}>
            </ExampleComment>
            <Divider dashed />
            <Comment
          actions={[<span key="comment-nested-reply-to">回复</span>]}
          author={<span>张伟</span>}
          avatar={<Avatar src={img} alt="Han Solo" />}
          content={
            <div>
              闲置二手手机出售，可小刀
              <Image
      width={160}
      src="http://pic2.58cdn.com.cn/zhuanzh/n_v2bc406c33c827415a915c5592890876c0_338_282.jpg"
    />
            </div>
          }
        >
        </Comment>
            <ExampleComment info={{author:"张三",content:"物美价廉，值得一看"}}>
            </ExampleComment>
            <Divider dashed />
              </div>
              <div className='fleam_right'>
              <div className='inter_right'>
                <div className='int_right_avatar'>
                <Avatar
                    size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }}
                    src={avatar}
                />
                <div className='username'>
                    张伟
                </div>
                </div>
                <div className='int_right_msg'>
                    <div className='points'>我的积分<div>10</div></div>
                    <div className='order'>历史订单<div>5</div></div>
                </div>
                <div className='int_right_shopcart'>
                <Button type="primary" icon={<ShoppingCartOutlined />} size="large"  className='shopcartButton'>
                                        我的购物车
                 </Button>
                </div>
            </div>
              </div>
            
        </div>
        </div>
    );
};

export default Fleamarket;