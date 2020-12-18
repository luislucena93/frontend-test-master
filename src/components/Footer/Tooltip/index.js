import React, {useEffect, useRef} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import './styles.scss';
import {setShowTooltip} from "../../../actions/index";

const Tooltip = () => {
    const dispatch = useDispatch();

    const {counter} = useSelector((state) => ({
        counter: state.counters.find((counter) => counter.id === state.selectedCounter) || {},
    }));

    const textAreaRef = useRef(null);

    useEffect(() => {
        setTimeout(() => window.addEventListener('click', detectClickOutsideTooltip), 200);// eslint-disable-next-line react-hooks/exhaustive-deps
        return () => window.removeEventListener('click', detectClickOutsideTooltip);
    }, []);

    const detectClickOutsideTooltip = (e) => {
        const tooltipElement = document.getElementById("tooltip");
        if (!tooltipElement.contains(e.target)) {
            dispatch(setShowTooltip(false));
        }
    };

    const copyToClipboard = () => {
        textAreaRef.current.select();
        document.execCommand('copy');
        setTimeout(() => dispatch(setShowTooltip(false)), 100);

        //setCopySuccess('Copied!');
    };

    return (
        <div className={"tooltipContainer clickable"}>
            <div className={"tooltip"} id={"tooltip"}>
                <div className={"leftSide"}>
                    <p className={"tooltipTitle"}>Share 1 counter</p>
                    <button className={"secondaryButton"} onClick={() => copyToClipboard()}>Copy</button>
                </div>
                <div className={"paperNote"}>
                    <p>{counter.count} x {counter.title}</p>
                </div>
                <div className={"tip"}/>
            </div>
            <textarea
                ref={textAreaRef}
                value={`${counter.count} x ${counter.title}`}
            />
        </div>
    )
}

export default Tooltip;