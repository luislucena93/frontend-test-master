import React, {useEffect, useRef} from 'react';
import './styles.scss';

const Tooltip = (props) => {
    const {counter, close} = props;
    const textAreaRef = useRef(null);

    useEffect(() => {
        setTimeout(() => window.addEventListener('click', detectClickOutsideTooltip), 200);  //Wait for tooltip to show to detect click to close
        return () => window.removeEventListener('click', detectClickOutsideTooltip);// eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const detectClickOutsideTooltip = (e) => {
        const tooltipElement = document.getElementById("tooltip");
        if (!tooltipElement.contains(e.target)) {
            close();
        }
    };

    const copyToClipboard = () => {
        textAreaRef.current.select();
        document.execCommand('copy');
        setTimeout(() => close(), 100);
    };

    return (
        <div>
            <div className={"tooltipOverlay clickable"} data-testid={"tooltipOverlay"}/>
            <div className={"tooltipContainer"}>
                <div className={"tooltip"} id={"tooltip"}>
                    <div className={"leftSide"}>
                        <p className={"tooltipTitle"}>Share 1 counter</p>
                        <button className={"secondaryButton"} onClick={copyToClipboard}>Copy</button>
                    </div>
                    <div className={"paperNote"}>
                        <p>{counter.count} x {counter.title}</p>
                    </div>
                    <div className={"tip"}/>
                </div>
                <textarea
                    ref={textAreaRef}
                    defaultValue={`${counter.count} x ${counter.title}`}
                />
            </div>
        </div>
    )
}

export default Tooltip;