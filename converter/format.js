// Put elements on their own line if on the same line together
/**
 * Class to create new indented stringed svg elements
 * 
 */

class Format {
    constructor() {
        this.string = ''
        this.newString = this.string
    }
    newLine() {
        if (typeof this.string !== 'string')
            return {error: '<h1>Not a valid string</h1>'}

        const newLinePattern = /(<\/?\w.*>)(\w<\/?\w.*>)/gi
        const isFormated = newLinePattern.test(this.newString)

        if ( isFormated ) {
            //Updates this.newString until new line formating is done
            this.newString = this.newString.replace(newLinePattern, '$1\n$2')
            this.newLine()
            return this.newString
        } else {
            return this.string
        }
    }

    elementOnOwnLines() {
        let newLine = this.newLine()
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

    indent(string){
        this.string = string
        const leftFormat = this.leftFormat()
        
        let selectAllLines = /.+/gi
        let allArray = leftFormat.match(selectAllLines); 
        let length = allArray.length
        let newString = ''
        let spaceCount = 0
        let space = ''
       
        for (let i = 0; i < length; i++) {
            let element = allArray[i]
            let beginnings = /<svg.+>|^<[^\/]+>$|^<[^\/].*[^>]$/gi.test(element); // <...> or <.....
            let onelines = /<.*>.*<\/.*>|^<\w.*\/>$|^(?<!<)\w.+[^>]$|^\w.+\/?>$|^['"]\..*/gi.test(element) //  <./>...<./> or <..../>  or .... or .../>  or ...> or '.photo-st0{fill:#061E2D;}'+
            let endings = /(?<!.+)<\/.*>|^}<\/style>$/gi.test(element) // </...> or }</style>

            // Indents open elements <g> or <g className="someclass" not closing..
            if ( beginnings ) {
                if ( (/^<[^\/]+>$|^\w.+[^\/]>$/gi.test(allArray[i-1])) ) {   // Tests previous element is the same, if so add space
                    // space += '\xa0'
                    space += ' '
                    newString += '\n'+space+element
                } else
                    newString += '\n'+space+element
            }
            // Indents single open and closing elements <.../> or <..>...</..>
            if ( onelines ) {
                if ( /^<[^\/]+>$|^<style.+{$|^\w.+[^\/]>$/gi.test(allArray[i-1]) ) {  // tests if previouos element is <...> or <style...{ or ...>
                    // space += '\xa0'
                    space += ' '
                    newString += '\n'+space+element  // Indents if previous line is different
                } else 
                    newString += '\n'+space+element
            }
            // Doesn't indent closing elements </g>, </div>, }</style> etc etc..
            if ( endings ) {
                spaceCount++
                let spaceCountPattern = new RegExp(`\\s{${spaceCount}}`,'i')
                space = space.replace(spaceCountPattern, '')
                newString += '\n'+space+element
                
                //Resets space count 
                spaceCount = 0
            } 
        }
        return newString
    }
};


module.exports = new Format()


