import React from 'react';

let Button = () => {
    const copySVGstring = () => {
       const svgText = document.getElementsByTagName('textarea')[1]
       svgText.select()
       document.execCommand('copy')
    }

    return React.createElement(
        'button',
        {
            key: 'button',
            onClick: () => {copySVGstring()},
            style: {
                position: 'absolute',
                right: '15px',
                height: '40px',
                margin: '15px',
                border: 'none',
                padding: '0 10px',
                borderRadius: '2px',
                cursor: 'pointer',
                background: '#dac0a7',
                color: '#fff',
                fontSize: '15px',
                fontWeight: '600',
                letterSpacing: '.025em',
                boxShadow: '0 4px 6px rgba(50,50,93,.11), 0 1px 3px rgba(0,0,0,.08)'
            }
        },
        'COPY IN CLIPBOARD'
    )
}

export default Button