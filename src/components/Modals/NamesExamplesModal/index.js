import React, {useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Sheet from 'react-modal-sheet';
import CloseIcon from '../../../images/Close.png';
import './styles.scss';
import {setNewCounterName, setOpenNamesExamplesModal} from "../../../actions/index";

const NamesExamplesModal = () => {
    const dispatch = useDispatch();
    const open = useSelector(state => state.openNamesExamplesModal);
    const NamesSuggestions = [
        {id: 'Drinks', suggestions: ["Cups of coffee", "Glasses of watter", "Martinis"]},
        {id: 'Food', suggestions: ["Hot-dogs", "Cupcakes eaten", "Chicken wings"]},
        {id: 'Misc', suggestions: ["Times sneezed", "Naps", "Day dreaming"]},
    ];

    const handleClickSuggestion = useCallback((suggestion) => {
        dispatch(setNewCounterName(suggestion));
        dispatch(setOpenNamesExamplesModal(false));
    }, [dispatch]);

    const dispatchCloseNamesExamplesModal = useCallback(() => dispatch(setOpenNamesExamplesModal(false)), [dispatch]);

    const header = () => {
        return (
            <div className={"modalHeader"}>
                <img src={CloseIcon} onClick={dispatchCloseNamesExamplesModal} alt={"close"}/>
                <h1>Examples</h1>
            </div>
        );
    }

    const namesCategoryScroller = (category) => {
        return (
            <div key={category.id}>
                <p className={"categoryName"}>{category.id}</p>
                <div key={category.id} className={"categoryContainer"}>
                    <div className={"scroller"}>
                        <div className={"categorySuggestions"}>
                            {category.suggestions.map((suggestion) => suggestionChip(suggestion))}
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    const suggestionChip = (suggestion) => {
        return (
            <div className={"suggestion"} key={suggestion}
                 onClick={() => handleClickSuggestion(suggestion)}>
                <p>{suggestion}</p>
            </div>
        )
    }
    const content = () => {
        return (
            <div className={"modalContent"}>
                <p className={"message"}>Select an example to add it to your counters.</p>
                {NamesSuggestions.map((category) => namesCategoryScroller(category))}
            </div>
        )
    }
    return (<Sheet isOpen={open} onClose={dispatchCloseNamesExamplesModal}>
        <Sheet.Container>
            <Sheet.Header>
                {header()}
            </Sheet.Header>
            <Sheet.Content>
                {content()}
            </Sheet.Content>
        </Sheet.Container>
        <Sheet.Backdrop/>
    </Sheet>)
}

export default NamesExamplesModal;
