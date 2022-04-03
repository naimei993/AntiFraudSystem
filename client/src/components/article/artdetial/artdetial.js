import React from 'react';

import {useLocation} from 'react-router-dom';
import './artdetial.min.css'
const Artdetial = () => {

    const { pathname } = useLocation();
    let pathnamedetail = pathname.split('/').splice(2)
    console.log(pathnamedetail);
    return (
        <div>
            {pathnamedetail[1]}
        </div>
    );
};

export default Artdetial;