import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Sheet from 'react-modal-sheet';
import CloseIcon from '../../images/Close.png';
import './styles.scss';
import {setNewCounterName, setOpenNamesExamplesModal} from "../../actions/index";

const NamesExamplesModal = () => {
    const dispatch = useDispatch();
    const open = useSelector(state => state.openNamesExamplesModal);
    const NamesSuggestions = [
        {id: 'Drinks', suggestions: ["Cups of coffee", "Glasses of watter", "Martinis"]},
        {id: 'Food', suggestions: ["Hot-dogs", "Cupcakes eaten", "Chicken wings"]},
        {id: 'Misc', suggestions: ["Times sneezed", "Naps", "Day dreaming"]},
    ];

    const handleClickSuggestion = (suggestion) => {
        dispatch(setNewCounterName(suggestion));
        dispatch(setOpenNamesExamplesModal(false));
    }

    return (<Sheet isOpen={open} onClose={() => dispatch(setOpenNamesExamplesModal(false))}>
        <Sheet.Container>
            <Sheet.Header>
                <div className={"modalHeader"}>
                    <img src={CloseIcon} onClick={() => dispatch(setOpenNamesExamplesModal(false))}/>
                    <h1>Examples</h1>
                </div>
            </Sheet.Header>
            <Sheet.Content>
                <div>
                    <div className={"modalContent"}>
                        <p className={"message"}>Select an example to add it to your counters.</p>
                        {
                            NamesSuggestions.map((category) =>
                                <div>
                                    <p className={"categoryName"}>{category.id}</p>
                                    <div key={category.id} className={"categoryContainer"}>
                                        <div className={"scroller"}>
                                            <div className={"categorySuggestions"}>
                                                {
                                                    category.suggestions.map((suggestion) =>
                                                        <div className={"suggestion"} key={suggestion}
                                                             onClick={() => handleClickSuggestion(suggestion)}>
                                                            <p>{suggestion}</p>
                                                        </div>)
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                    </div>
                </div>
            </Sheet.Content>
        </Sheet.Container>
        <Sheet.Backdrop/>
    </Sheet>)
}

export default NamesExamplesModal;
