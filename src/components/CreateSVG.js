import React from 'react';

let CreateSVG = (nodeArray) => {

    return Array.prototype.map.call(nodeArray, (node, i) => {
        let attributeObj = {style:{width: '5rem', height: '5rem'}};
        
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
                    attributeObj[attribute.name] = attribute.nodeValue;
                    console.log('attribute.name:', attribute.name)
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