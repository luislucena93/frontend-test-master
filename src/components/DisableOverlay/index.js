import React from 'react';

const DisableOverlay = ({disabled}) => {
    if (disabled) {
        return <div className={"disableOverlay"}/>
    }
    return null
}

export default DisableOverlay;