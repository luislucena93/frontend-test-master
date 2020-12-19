import React from 'react';
import PlusIcon from '../../../../images/Plus-orange.png';
import MinusIcon from '../../../../images/Minus.png';
import MinusDisabledIcon from '../../../../images/Minus-disabled.png';
import './styles.scss';

const Item = (props) => {
    const {selectedCounter, counter, selectCounter, decCounter, incCounter} = props;

    const handleClicks = (type) => {
        if (!props.refreshing) {
            if (type === 'dec') {
                decCounter();
            } else {
                incCounter();
            }
        }
    };

    const handleSelectItem = () => {
        setTimeout(selectCounter, 1); //wait to dectect click inside before updating DOM element
    }

    return (
        <div className={`item ${selectedCounter === counter.id ? 'selected' : ''}`}>
            <p className={"itemName"} onClick={handleSelectItem}>{counter.title}</p>
            <div className={"counterButtons"}>
                <button disabled={counter.count === 0}
                        onClick={() => handleClicks('dec')}>
                    <img src={counter.count === 0 ? MinusDisabledIcon : MinusIcon} alt={""}/>
                </button>
                <p className={counter.count === 0 ? 'zero' : ''}>{counter.count}</p>
                <button onClick={() => handleClicks('inc')}>
                    <img src={PlusIcon} alt={""}/>
                </button>
            </div>
        </div>
    )
};

export default Item;