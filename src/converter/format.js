// Put elements on their own line if on the same line together
/**
 * Class to create new indented stringed svg elements
 * 
 */

class Format {
    constructor(spaces = 4) {
        this.string = ''
        this.spaces = spaces
    }
    newLine() {
        if (typeof this.string !== 'string')
            return {error: '<h1>Not a valid string</h1>'}

        const newLinePattern = /(.*\/?>)(<.*>?)/gim
        const isFormated = newLinePattern.test(this.string)

        if ( isFormated ) {
            this.string = this.string.replace(newLinePattern, '$1\n$2')
            this.newLine() // Updates this.newString until new line formating is done
            return this.string
        } else {
            return this.string
        }
    }

    elementOnOwnLines() {
        const newLine = this.newLine()
        if (!newLine) 
            return {error: '<h1>Can\'t format new lines</h1>'}

        let openClosingPattern = /<\w.+[\s\S]+(<.+>)/gi
        let openClosingElements = newLine.match(openClosingPattern)

        // If empty lines exist remove them
        let emptyLinesPattern = /^\s*[\r\n]/gm
        return openClosingElements[0].replace(emptyLinesPattern, '')
    }

    leftFormat() {
        let elementOnOwnLines = this.elementOnOwnLines();

        if (!elementOnOwnLines) {
            console.log('Can\'t format Elements on Own Lines')
            return {error: '<h1>Can\'t format Elements on Own Lines</h1>'}
        }
        // Remove spaces from both sides
        let removeTabsPattern = /^\s*|\s*$/gm
        let formatLeft =  elementOnOwnLines.replace(removeTabsPattern, '')
        return formatLeft
    }

    indent(string, styleElement){
        this.string = string
        const leftFormat = this.leftFormat()
        const selectAllLines = /.+/gi
        let allArray = leftFormat.match(selectAllLines)
        let length = allArray.length
        let newString = ''
        let space = 0
        let spaces = this.spaces
       
        for (let i = 0; i < length; i++) {
            let element = allArray[i]
            let beginnings = /<svg.+>|<style type="text\/css">|<[^\/].*>|^<[^\/].*[^>]$/i.test(element); // <...> or <.....
            let onelines = /<.*>.*<\/.*>|^<\w.*\/>$|^(\w|-|\.).+[^>]$|^\w.+\/?>$|^['"]?\..*|<\/image>/gi.test(element) //  <./>...<./> or <..../>  or .... or .../>  or ...> or '.photo-st0{fill:#061E2D;}'+
            let endings = /(?<!.+)<\/.*>|^}?<\/style>$/gi.test(element)
            // Indents open elements <g> or <g className="someclass" not closing..
            if ( beginnings ) {
                if ( (/^<[^\/]+>$|^\w.+[^\/]>$/gi.test(allArray[i-1])) ) {  // Tests previous element is the same, if so add space
                    space += spaces;
                    newString += element.replace(/^/g, '\n'+' '.repeat(space))
                } else 
                    newString += element.replace(/^/g, i===0?'':'\n'+' '.repeat(space)) // First line, only adds new line (\n) if it's not the first line
            }
            // **** TO DO indent strings under the <path element  ......   ^<.+([\w\d-,.]+)$  ***
            // Indents single open and closing elements <.../> or <..>...</..>
            else if ( onelines ) {
                if ( /^<[^\/]+>$|^<style.+{?>?$|^[\w|-|\.].+[^\/]>$/gi.test(allArray[i-1]) ) {  // tests if previouos element is <...> or <style...{ or ...> 
                space += spaces;
                    newString += element.replace(/^/g, '\n'+' '.repeat(space)) // Indents if previous line is different
                } else 
                    newString += element.replace(/^/g, '\n'+' '.repeat(space))
            }
            // Doesn't indent closing elements </g>, </div>, }</style> etc etc..
            else if ( endings ) {
                space -= spaces;
                newString += element.replace(/^/g, '\n'+' '.repeat(space))
            } 
        }
        return newString
    }
};


module.exports = new Format()


