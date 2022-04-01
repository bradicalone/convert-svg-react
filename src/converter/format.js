// Put elements on their own line if on the same line together
/**
 * Class to create new indented stringed svg elements
 * 
 */
let j = 0
class Format {
    constructor(spaces = 4) {
        this.string = ''
        this.spaces = spaces
    }

    removeSpaces() {
        return this.string.replace(/[ ]{3,}/igm, ' ')
    }

    /* *** Not being used, refactoring *** */
    trimLines(string) {
        // Splits each line that is 180 characters or long at the very next space 
        let regex = new RegExp('(.{180}[ ])(.*)', 'igm')
        let newArr = []

        // j < 50 incase extremely long and multiple lines 
        if(string.match(regex) && j < 10) {
            let strings = string.split('\n')
            let i = strings.length
            while(i--) {
                // Each line that is too long splits and second line gets it's own
                newArr.unshift(strings[i].replace(regex, '$1\n$2'))
            }
            let newString = newArr.join('\n')
  
            j++
            return this.trimLines(newString)
            
        } else {
            return string.replace(/^\s*\n/gm, '') 
        }
    }

    newLine() {
        const string = this.removeSpaces()
        if (typeof string !== 'string')
            return {error: '<h1>Not a valid string</h1>'}

        return string.replace(/^\s+|\s+$/gm, '').match(/<.[\s\S]*?>(?=[^a-z])|(<\/svg>)|(.+?}")/gm).join('\n')
    }

    leftFormat() {
        const elementOnOwnLines = this.newLine();
        // console.log('elementOnOwnLines:', elementOnOwnLines)

        if (!elementOnOwnLines) {
            console.log('Can\'t format Elements on Own Lines')
            return {error: '<h1>Can\'t format Elements on Own Lines</h1>'}
        }
        // Remove spaces from both sides
        const removeTabsPattern = /^\s*|\s*$/gm
        const formatLeft =  elementOnOwnLines.replace(removeTabsPattern, '')
        return formatLeft
    }

    indent(string, styleElement){

        this.string = string
        const leftFormat = this.leftFormat()
        const selectAllLines = /.+/ig
        let allArray = leftFormat.match(selectAllLines)
        let prevBeginnings = ''
        let length = allArray.length
        let newString = ''
        let space = 0
        let spaces = this.spaces

        try {
            for (let i = 0; i < length; i++) {
                const element = allArray[i]
                const beginnings = /<svg.+>|<style type="text\/css">|<[^\/].*>|^<[^\/].*[^>]$/i.test(element); // <...> or <.....
                const onelines = /<.*>.*<\/.*>|^<\w.*\/>$|^(\w|-|\.).+[^>]$|^[\w",-].+\/?>$|^['"]?\..*|<\/image>/gi.test(element) //  <./>...<./> or <..../>  or .... or .../>  or ...> or '.photo-st0{fill:#061E2D;}'+
                const endings = /<\/.*>|^}?<\/style>$/gi.test(element)
                // Indents open elements <g> or <g className="someclass" not closing..
                if ( beginnings ) {
                    if ( (/<[^\/].+[^\/]>|^\w.+[^\/]>$|<[a-z]+>/gi.test(allArray[i-1])) ) {  // Tests previous element is the same, if so add space
                        space += spaces;
                        prevBeginnings = element
                        newString += element.replace(/^/g, '\n'+' '.repeat(space))
                    } else {
                        prevBeginnings = element
                        newString += element.replace(/^/g, i===0?'':'\n'+' '.repeat(space)) // First line, only adds new line (\n) if it's not the first line
                    }    
                }
                
                // Indents single open and closing elements <.../> or <..>...</..>
                else if ( onelines ) {
                    if ( /^<[^\/]+>$|^<style.+{?>?$|^[\w|-|\.].+[^\/]>$/gi.test(allArray[i-1]) ) {  // tests if previouos element is <...> or <style...{ or ...> 
                        space += spaces;
                        newString += element.replace(/^/g, '\n'+' '.repeat(space)) // Indents if previous line is different
                    } else {
                        // const extraSpace = space + 2  add more spaces if needed
                        const extraSpace = space + 1
                        // single lines ... or ...>
                        newString += element.replace(/^/g, '\n'+' '.repeat(extraSpace))
                    } 
                }

                // Doesn't indent closing elements </g>, </div>, }</style> etc etc..
                else if ( endings ) {
                    const justLetters = element.replace(/[^a-zA-Z]/ig,'');
                    const regex = new RegExp(`^<${justLetters}`, 'gi');

                    /* If indented tag is same ending tag */
                    if(regex.test(prevBeginnings) && justLetters != 'style') {
                        newString += element.replace(/^/g, '\n'+' '.repeat(space))
                        
                    } else {
                        space -= spaces;
                        newString += element.replace(/^/g, '\n'+' '.repeat(space))
                    }
                } 
            }
        } catch(e) {
            console.log(e)
            return `<span>${e}</span>`
        }
        return newString
    }
};


module.exports = new Format()


