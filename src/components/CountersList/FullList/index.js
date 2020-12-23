import React, {useEffect} from "react";
import Item from './Item/index';
import Summary from './Summary/index';
import DisableOverlay from '../../DisableOverlay/index';
import './styles.scss';

const FullList = (props) => {
        const {
            counters, selectedCounter, disabled, refreshing, handleClickOutsideList, handleClickOnListItem,
            handleClickIncItem, handleClickDecItem, handleClickRefresh
        } = props;
        const totalCount = counters.reduce((a, b) => a + (b.count || 0), 0);

        useEffect(() => {
            window.addEventListener('click', detectClickOutside);
            return () => window.removeEventListener('click', detectClickOutside);// eslint-disable-next-line react-hooks/exhaustive-deps
        }, []);


        const detectClickOutside = (e) => {
            let clickOutside = true;
            const clickablesElements = document.getElementsByClassName('clickable');
            console.log(e.target);
            [].forEach.call(clickablesElements, (clickableElement) => {
                console.log(clickableElement);
                console.log(clickableElement.contains(e.target));
                if (clickableElement.contains(e.target)) {
                    clickOutside = false;
                }
            });
            if (clickOutside) {
                handleClickOutsideList();
            }
        };

        const EmptyList = () => {
            if (counters.length === 0) {
                return <div className={"noResults"}><p>No results</p></div>
            }
            return null
        }

        const ItemList = () => {
            if (counters.length > 0) {
                return (
                    <div className={"itemsList clickable"}>
                        {counters.map((counter) =>
                            <Item counter={counter} selectedCounter={selectedCounter} key={counter.id}
                                  refreshing={refreshing} decCounter={handleClickDecItem}
                                  incCounter={handleClickIncItem}
                                  selectCounter={handleClickOnListItem}
                            />
                        )}
                    </div>
                )
            }
            return null
        }

        return (
            <div className={`fullList ${disabled ? 'disabled' : ''}`}>
                <Summary refreshing={refreshing} totalCount={totalCount} countersQty={counters.length}
                         hidden={counters.length === 0} selectedCounter={selectedCounter}
                         refreshCounters={handleClickRefresh}/>
                <EmptyList/>
                <ItemList/>
                <DisableOverlay disabled={disabled}/>
            </div>
        );
    }
;

export default FullList;