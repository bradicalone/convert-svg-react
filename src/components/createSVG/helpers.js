export const updateStyles = (styles) => {
        
    const catenate = (match, p1, p2, p3) => {
        return p1 + p3.toUpperCase()
    }
    // First replace any style property dashes and concatenate first letter with it
    const newStyleString = styles.replace(/(.?)(-)(.)/ig, catenate)

    // Second make new style object out of replaced string
    return newStyleString.split(";").reduce((obj, style) => {
        const [key, value] = style.split(":")
        if(value)  obj[key.trim()] = value.trim()

            return obj
    },{})
}