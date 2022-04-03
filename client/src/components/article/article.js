import React from 'react';
import './article.min.css'
const Article = () => {
    return (
        <div className='article'>
            <div className='article_bg'>
                <div className='article_all'>
                    <div className='article_item'>
                        <div className='article_left'>
                            <a href='/admin/article_about/index'>
                                <img src='https://www.vvhan.com/headImg/thumb/www.vvhan.com[32]-img.jpg' alt='图片'>
                                </img>
                            </a>
                        </div>
                        <div className='article_right'>
                                芜湖
                        </div>
                    </div>

                </div>
                
            </div>
        </div>
        
    );
};

export default Article;