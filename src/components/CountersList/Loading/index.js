import React, {useEffect, useState} from 'react';
import LodingImage from '../../../images/Activity Indicator.png';
import './styles.scss';

const Loading = () => {
    const [loadingTransparent, setLoadingTransparent] = useState(true);
    useEffect(() => {
        const interval = setInterval(() => {
            updateLoading();
        }, 500);
        return () => clearInterval(interval);
    }, []);

    const updateLoading = () => {
        setLoadingTransparent((loadingTransparent) => !loadingTransparent);
    }
    return (
        <div className={"loading"}>
            <img className={`activityIndicator ${loadingTransparent ? 'transparent' : ''}`} src={LodingImage} alt={""}/>
        </div>
    )
}

export default Loading;