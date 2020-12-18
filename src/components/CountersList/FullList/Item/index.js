import React from 'react';
import {useDispatch} from 'react-redux';
import {decrementCounter, incrementCounter, setSelectedCounter} from "../../../../actions/index";
import PlusIcon from '../../../../images/Plus-orange.png';
import MinusIcon from '../../../../images/Minus.png';
import MinusDisabledIcon from '../../../../images/Minus-disabled.png';
import './styles.scss';

const Item = (props) => {
    const dispatch = useDispatch();
    const {selectedCounter, counter} = props;
    return (
        <div className={`item ${selectedCounter === counter.id ? 'selected' : ''}`}
             onClick={() => dispatch(setSelectedCounter(counter.id))}>
            <p className={"itemName"}>{counter.title}</p>
            <div className={"counterButtons"}>
                <button disabled={counter.count === 0}
                        onClick={() => dispatch(decrementCounter(props.counter.id))}>
                    <img src={counter.count === 0 ? MinusDisabledIcon : MinusIcon} alt={""}/>
                </button>
                <p className={props.counter.count === 0 ? 'zero' : ''}>{counter.count}</p>
                <button onClick={() => dispatch(incrementCounter(counter.id))}>
                    <img src={PlusIcon} alt={""}/>
                </button>
            </div>
        </div>
    )
}

export default Item;