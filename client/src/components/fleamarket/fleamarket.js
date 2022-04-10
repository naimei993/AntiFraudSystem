import React from 'react';
import { Comment, Avatar,Image,Divider } from 'antd';
import img from '../../static/avatar.webp'
import './fleamarket.min.css'

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
        </div>
    );
};

export default Fleamarket;