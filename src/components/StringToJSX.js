import React from 'react';
import ReactDOMServer from 'react-dom/server';
let String = ReactDOMServer.renderToStaticMarkup()


let getNodes = str => {
    return new DOMParser().parseFromString(str, "text/html").body.childNodes
};

let createJSX = (nodeArray) => {

    // const className = nodeArray[0].className;

    return Array.prototype.map.call(nodeArray, (node, i) => {
        let attributeObj = {};
        
        const { attributes, localName, childNodes, nodeValue } = node;

        if (attributes) {
            Array.from(attributes).forEach(attribute => {
 
                if (attribute.name === "style") {
                    let styleAttributes = attribute.nodeValue.split(";");
                    let styleObj = {};
                    styleAttributes.forEach(attribute => {
                        let [key, value] = attribute.split(":");
                        styleObj[key] = value;
                    });
                    attributeObj[attribute.name] = styleObj;
                } else {
                    // Javascript wants to ignore camel casing, once again have to change attribute properties.
                    if(attribute.name === 'xmlnsxlink') {
                        attributeObj['xmlnsXlink'] = attribute.nodeValue
                    } else if (attribute.name === 'classname') {
                        attributeObj['className'] = attribute.nodeValue;
                    } else if (attribute.name === 'xmlspace') {
                        attributeObj['xmlSpace'] = attribute.nodeValue;
                    } else {
                        attributeObj[attribute.name] = attribute.nodeValue;
                    }
                }
            });
        }

        attributeObj.key = i

        return localName ?
            React.createElement(
                localName,
                attributeObj,
                childNodes && Array.isArray(Array.from(childNodes)) ?
                    createJSX( Array.from(childNodes)) : [] ) : nodeValue;

    });
};

export const StringToJSX = props => {
    return createJSX(getNodes(props));
};