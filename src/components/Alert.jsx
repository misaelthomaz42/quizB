import React from 'react';

const Alert = ({ type = 'info', children, className = '' }) => {
    const styles = {
        info: { bg: 'var(--info-soft)', color: 'var(--info)', border: 'var(--info)' },
        success: { bg: 'var(--success-soft)', color: 'var(--success)', border: 'var(--success)' },
        error: { bg: 'var(--error-soft)', color: 'var(--error)', border: 'var(--error)' },
        warning: { bg: 'var(--warning-soft)', color: 'var(--warning)', border: 'var(--warning)' },
    };

    const current = styles[type] || styles.info;

    return (
        <div
            className={`animate-fade-in ${className}`}
            style={{
                background: current.bg,
                color: current.color,
                padding: '1rem',
                borderRadius: 'var(--radius-md)',
                border: `1px solid ${current.color}33`,
                fontSize: '0.9rem',
                fontWeight: '500',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                marginBottom: '1.5rem'
            }}
        >
            <span style={{ fontSize: '1.2rem' }}>
                {type === 'success' && '✓'}
                {type === 'error' && '✕'}
                {type === 'warning' && '⚠'}
                {type === 'info' && 'ℹ'}
            </span>
            <div>{children}</div>
        </div>
    );
};

export default Alert;
