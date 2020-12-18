import React, {useEffect, useState} from 'react';
import './styles.scss';

const Loading = () => {
    const [loadingStep, setLoadingStep] = useState(['a', 'b', 'c']);
    useEffect(() => {
        const interval = setInterval(() => {
            updateLoading();
        }, 500);
        return () => clearInterval(interval);
    }, []);

    const updateLoading = () => {
        setLoadingStep((loadingStep) => {
            const last = loadingStep.pop();
            return [last, ...loadingStep];
        });
    }
    return (
        <div className={'loading'}>
            <div className={`circle first ${loadingStep[2]}`}>
                <div className={`circle second ${loadingStep[1]}`}>
                    <div className={`circle third ${loadingStep[0]}`}/>
                </div>
            </div>
        </div>
    )
}

export default Loading;