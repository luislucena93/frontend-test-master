import React, {useState} from 'react';
import LoadingImage from '../../images/Activity Indicator.png';
import './styles.scss';

const Loading = () => {
    return (
        <div className={"loading"}>
            <img src={LoadingImage}/>
        </div>
    )
}

export default Loading;