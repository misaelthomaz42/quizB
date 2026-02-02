import React from 'react';

const Card = ({ children, className = '', style = {}, animate = true }) => {
    return (
        <div
            className={`glass-card ${animate ? 'animate-fade-in' : ''} ${className}`}
            style={style}
        >
            {children}
        </div>
    );
};

export default Card;
