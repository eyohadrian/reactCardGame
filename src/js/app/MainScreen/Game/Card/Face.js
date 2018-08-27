import React from 'react';

export default ({src}) => {
    const hi = () => {
        console.log(this);
    }
    return (
        <img 
            src={src}
            onLoad={hi}
        />
    )
}