import React from 'react';
import { updateStyles } from './helpers';




let CreateSVG = (nodeArray) => {

    return Array.prototype.map.call(nodeArray, (node, i) => {
        let attributeObj = {};
        
        const { attributes, localName, childNodes, nodeValue } = node;

        if (attributes) {
            Array.from(attributes).forEach(attribute => {

                if (attribute.name === "style") {
                    const styleObj = updateStyles(attribute.nodeValue)
                    
                    attributeObj[attribute.name] = styleObj;

                    // When fromString gets ran classname is not concatinated
                }  else if(attribute.name === 'classname'){
                    attributeObj[attribute.name.replace(/n/, 'N')] = attribute.nodeValue;
                }  else if(attribute.name === 'fillrule'){
                    attributeObj[attribute.name.replace(/r/, 'R')] = attribute.nodeValue;
                }  else if(attribute.name === 'strokelinecap'){
                    attributeObj['strokeLinecap'] = attribute.nodeValue;
                }  else if(attribute.name === 'strokemiterlimit'){
                    attributeObj['strokeMiterlimit'] = attribute.nodeValue;
                }  else if(attribute.name === 'strokelinejoin'){
                    attributeObj['strokeLinejoin'] = attribute.nodeValue;
                }  else if(attribute.name === 'strokewidth'){
                    attributeObj['strokeWidth'] = attribute.nodeValue;
                }  else if(attribute.name === 'clippath'){
                    attributeObj['clipPath'] = attribute.nodeValue;
                } else if(attribute.name === 'xmlspace'){
                        attributeObj['xmlSpace'] = attribute.nodeValue;
                } else {
                    attributeObj[attribute.name] = attribute.nodeValue;
                    // Adds inline style to svg 
                    if(localName === 'svg') attributeObj.style = {width: '5rem', height: '5rem', margin: '10px'}
                }
            });
        }

        attributeObj.key = i
        return localName ?
            React.createElement(
                localName,
                attributeObj,
                childNodes && Array.isArray(Array.from(childNodes)) ?
                    CreateSVG( Array.from(childNodes)) : [] ) : nodeValue;

    });
};

export default CreateSVG