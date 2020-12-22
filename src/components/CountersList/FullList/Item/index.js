import React from 'react';
import PlusIcon from '../../../../images/Plus-orange.png';
import MinusIcon from '../../../../images/Minus.png';
import MinusDisabledIcon from '../../../../images/Minus-disabled.png';
import './styles.scss';

const Item = (props) => {
    const {selectedCounter, counter, selectCounter, decCounter, incCounter, refreshing} = props;

    const handleDecItem = () => {
        if (!refreshing) {
            setTimeout(() => decCounter(counter.id), 1);
        }
    };

    const handleIncItem = () => {
        if (!refreshing) {
            setTimeout(() => incCounter(counter.id), 1);
        }
    }
    const handleSelectItem = () => {
        setTimeout(() => selectCounter(counter.id), 1); //wait to dectect click inside before updating DOM element
    }

    return (
        <div className={`item ${selectedCounter === counter.id ? 'selected' : ''}`} onClick={handleSelectItem}>
            <p className={"itemName"}>{counter.title}</p>
            <div className={"counterButtons"}>
                <button disabled={counter.count === 0}
                        onClick={handleDecItem}>
                    <img src={counter.count === 0 ? MinusDisabledIcon : MinusIcon} alt={"dec"}/>
                </button>
                <p className={counter.count === 0 ? 'zero' : ''} data-testid={"itemCount"}>{counter.count}</p>
                <button onClick={handleIncItem}>
                    <img src={PlusIcon} alt={"inc"}/>
                </button>
            </div>
        </div>
    )
};

export default Item;