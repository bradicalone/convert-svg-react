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
                margin: '15px',
                border: 'none',
                padding: '5px 10px'
            }
        },
        'Copy Text'
    )
}

export default Button