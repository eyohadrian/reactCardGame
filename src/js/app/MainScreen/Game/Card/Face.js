import React from 'react';

export default ({src, onCardLoaded}) => {
    return (
        <img
            src={src}
            onLoad={onCardLoaded} />
    )
}
