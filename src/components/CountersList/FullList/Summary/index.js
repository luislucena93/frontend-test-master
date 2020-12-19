import React, {useEffect, useState, useRef} from "react";
import RefreshIcon from '../../../../images/Refresh.png';
import RefreshActiveIcon from '../../../../images/Refresh-active.png';
import './styles.scss';

const Summary = (props) => {

    const [refreshingDots, setRefreshingDots] = useState(0);
    const intervalRef = useRef();

    useEffect(() => {
        if (props.refreshing) {
            const id = setInterval(() => {
                updateRefreshingDots();
            }, 500);
            intervalRef.current = id;
        } else {
            clearInterval(intervalRef.current);
        }
    }, [props.refreshing])

    const updateRefreshingDots = () => {
        setRefreshingDots((refreshingDots) => refreshingDots < 3 ? refreshingDots + 1 : 0);
    }


    const handleClickRefresh = () => {
        if (!props.refreshing) {
            props.refreshCounters();
        }
    }

    const getRefresh = () => {
        return (
            <div className={"refresh"}>
                <img onClick={handleClickRefresh} src={props.refreshing ? RefreshActiveIcon : RefreshIcon} alt={""}/>
                {props.refreshing && <p>Refreshing{".".repeat(refreshingDots)}</p>}
            </div>
        )
    }

    if (props.selectedCounter === null) {
        if (props.hidden) {
            return null;
        }
        return (
            <div className={"listSummary"}>
                <p className={"itemQty"}>{props.countersQty} items</p>
                <p className={"totalCount"}>{props.totalCount} times</p>
                {getRefresh()}
            </div>
        )
    }
    return (
        <div className={"listSummary"}>
            <p className={"itemSelected"}>1 selected</p>
            {getRefresh()}
        </div>
    )
};

export default Summary;
