import React, {useEffect, useState, useRef} from "react";
import RefreshIcon from '../../../../images/Refresh.png';
import RefreshActiveIcon from '../../../../images/Refresh-active.png';
import './styles.scss';

const Summary = (props) => {
    const {selectedCounter, refreshing, refreshCounters, countersQty, totalCount, hidden} = props;

    const [refreshingDots, setRefreshingDots] = useState(0);
    const intervalRef = useRef();

    useEffect(() => {
        if (refreshing) {
            const id = setInterval(() => {
                updateRefreshingDots();
            }, 500);
            intervalRef.current = id;
        } else {
            clearInterval(intervalRef.current);
        }
    }, [refreshing]);

    const updateRefreshingDots = () => {
        setRefreshingDots((refreshingDots) => refreshingDots < 3 ? refreshingDots + 1 : 0);
    }


    const handleClickRefresh = () => {
        if (!refreshing) {
            refreshCounters();
        }
    }

    const getRefresh = () => {
        return (
            <div className={"refresh"}>
                <img onClick={handleClickRefresh} src={refreshing ? RefreshActiveIcon : RefreshIcon} alt={"refresh"}/>
                {refreshing && <p>Refreshing{".".repeat(refreshingDots)}</p>}
            </div>
        )
    };

    if (hidden) {
        return null;
    }
    if (selectedCounter === null) {
        return (
            <div className={"listSummary"} data-testid={"listSummary"}>
                <p className={"itemQty"}>{countersQty} {countersQty === 1 ? 'item' : 'items'}</p>
                <p className={"totalCount"}>{totalCount} {totalCount === 1 ? 'time' : 'times'}</p>
                {getRefresh()}
            </div>
        )
    }
    return (
        <div className={"listSummary"} data-testid={"listSummary"}>
            <p className={"itemSelected"}>1 selected</p>
            {getRefresh()}
        </div>
    )
};

export default Summary;
