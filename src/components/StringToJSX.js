import React from 'react';
import ReactDOMServer from 'react-dom/server';
import CreateSVG from './CreateSVG';
import Button from './Button';

let getColsWidth = nodeArray => {
    let maxLineLength = nodeArray[0].length
    let lineNumber = []
    nodeArray.forEach((line, i)=> {
        lineNumber.push(i+1)
        if(line.length > maxLineLength) maxLineLength = line.length
    })
    return {lineLength: maxLineLength, lineNumber}
}

let getNodes = str => {
    const stripedStyle = str.replace(/\}(?=<\/style)|"(?=\.\w)|("\+)$|\{?$/gmi, '');
    const stripedLastQuote = stripedStyle.replace(/(.*;\})(")$/gm, '$1') // So stupid!

    return {
        nodeArray: new DOMParser().parseFromString(stripedLastQuote, "application/xml").childNodes,
        string: str.split('\n')
    }
}

let createJSX = (nodeObj) => {
    let svgString = nodeObj.string
    let nodeArray = nodeObj.nodeArray

    return [
        React.createElement(
            'div',
            {
                key: 'wrapper',
                style: {
                    display: 'flex',
                    flexDirection: 'column-reverse',
                    position: 'relative',
                }
            },
            CreateSVG(nodeArray),
            React.createElement(
                'div',
                {
                    key: 'container',
                    style: {
                        display: 'flex',
                        overflow: 'scroll',
                        background: 'rgb(45 45 45)',
                        width: 'auto',
                        height: '100%',
                        resize: 'none'
                    }
                },
                React.createElement(
                    'textarea',
                    {
                        rows: svgString.length,
                        cols: 1,
                        defaultValue: getColsWidth(svgString).lineNumber.join('\n'),
                        style : {
                            className: 'numbered',
                            textAlign: 'right',
                            minWidth: '1rem',
                            padding: '10px 5px 0 5px',
                            border: 'none',
                            background: 'rgb(45 45 45)',
                            color: 'rgb(183 183 183)',
                            resize: 'none'
                        }
                    }
                ),
                React.createElement(
                    'textarea',
                    {
                        rows: svgString.length + 1,
                        cols: getColsWidth(svgString).lineLength,
                        defaultValue: svgString.join('\n'),
                        style : {
                            className: 'svg-code',
                            flexShrink: '0',
                            border: 'none',
                            background: 'rgb(45 45 45)',
                            color: 'rgb(237 236 255)',
                            overflow: 'scroll',
                            paddingLeft: '15px',
                            paddingTop: '10px',
                            resize: 'none',
                        }
                    }
                )
            ),
            Button()
        )
    ]
     
}

export const StringToJSX = props => {
    return createJSX(getNodes(props));
};