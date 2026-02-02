import React from 'react';

const Button = ({
    children,
    variant = 'primary',
    loading = false,
    disabled = false,
    onClick,
    type = 'button',
    className = '',
    style = {}
}) => {
    const baseClass = 'btn';
    const variantClass = `btn-${variant}`;

    return (
        <button
            type={type}
            className={`${baseClass} ${variantClass} ${className}`}
            disabled={disabled || loading}
            onClick={onClick}
            style={style}
        >
            {loading ? (
                <>
                    <span className="loader" style={{ width: '16px', height: '16px', borderTopColor: 'currentColor' }}></span>
                    {children && <span>Carregando...</span>}
                </>
            ) : (
                children
            )}
        </button>
    );
};

export default Button;
