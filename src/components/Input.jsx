import React from 'react';

const Input = ({
    label,
    name,
    type = 'text',
    value,
    onChange,
    placeholder,
    required = false,
    error,
    ...props
}) => {
    return (
        <div className="input-group">
            {label && <label className="input-label" htmlFor={name}>{label}</label>}
            <input
                id={name}
                name={name}
                type={type}
                className="input-field"
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                required={required}
                {...props}
            />
            {error && <span className="text-sm" style={{ color: 'var(--error)', marginTop: '0.25rem', display: 'block' }}>{error}</span>}
        </div>
    );
};

export default Input;
