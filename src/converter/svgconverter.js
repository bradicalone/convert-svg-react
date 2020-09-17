const Format = require('./format')

const {
	stylePattern,
	isColan,
	isSemiColan,
	isStyle, 
	isColorPattern, 
	isStopOpacity, isClassPattern, isxmlPattern, cssObjects, isTitle, enabledBackground, isIDorVersion
} = require("./constants");

let test_string = ``

/**
 * Class to create new stringed svg element
 * 
 */
class Convert {
	/**
	 * 
	 * @param {String} string - path to svg file ex: './pathto/my.svg'
	 *
	 */
	constructor(string) {
		
		this.string = string
		this.svgCSS = ''		
	}
	
	/**
	 * @property {Function} checkString Reads file from path given by client
	 * @returns {object}
	 */
	checkString() {
		if (typeof this.string !== 'string') {
			console.log('not a string')

			return {error: `<h1>File path or file is not of string path.</h1>`}
		}
	}

	/** Adds a string version of inline style element to be used as JSX
	 * @property {Function} stringify_STYLE_ELEM - Optional if user wants to leave style element in svg xml document
	 */
	stringify_STYLE_ELEM() {
		let CSSobjects = this.string.match(cssObjects)
		let length = CSSobjects.length
		let toString = ''

		for (let i = 0; i < length; i++) {
			const element = CSSobjects[i];

			// If only one css object exist
			if( length === 1 )  {
				toString += element.replace(/(\..*;})/i, '<style type="text/css">{\n"$1"\n}</style>');
				break;
			}

			// Replaces first line
			if (i === 0) {
				toString += element.replace(/(\..*;})/i, '<style type="text/css">{\n"$1"+\n');
			}
			// Replaces last line
			else if (i === length - 1 ) {
				toString += element.replace(/(\..*;})/i, '"$1"\n}</style>');
			} 
			// Replaces every other line
			else {
				toString += element.replace(/(\..*;})/i, ' "$1"+\n');
			}
		}
		
		this.string = this.string.replace(/<style.*[\s\S]*<\/style>/gi, toString)
	}

	/**
	 * 
	 * @property {Function} findAndReplace - Looks for all xml attributes that need to be replaced 
	 * @returns {String}
	 */
	findAndReplace() {
		this.checkString()
		let string = this.string
		
		const removeStyleElement = false
		const styleElement = stylePattern.test(string);
		const hasColan = isColan.test(string)
		const hasStyle = isStyle.test(string)

		// G flag problem created. 
		const hasEnabledBackground = enabledBackground.test(string)
		const hasSemiColan = isSemiColan.test(string)
		const isGradientStyle = isColorPattern.test(string)
		const hasClass = isClassPattern.test(string)
		const hasTitle = isTitle.test(string)
		const hasXML = isxmlPattern.test(string)
		const hasStopOpacity = isStopOpacity.test(string)
		
		const hasIDorVersion = isIDorVersion.test(string)
		
		if (!typeof string) return `<div>Must be a valid string</div>`
		
		if (hasXML) {
			switch (true) {
				case /xmlns:xlink/gi.test(string):
					this.string = this.string.replace(/xmlns:xlink/gi, 'xmlnsXlink')
				case /xml:space/gi.test(string):
					this.string = this.string.replace(/xml:space/gi, 'xmlSpace')
				case /xlink:href/gi.test(string):
					this.string = this.string.replace(/xlink:href/gi, 'href')
			}
		}
		//  True to return string of <style type="text/css"> .someElement{someTyle:#A5A5A5;}  </style>
		//    <style type="text/css">{
		//            '.photo-st0{fill:#C13838;}'+
		//        }
		// 	  </style>
		//  Or leave it, stringify it and use it within React
		
		if (styleElement) {
			if (removeStyleElement) {
				this.string = this.string.replace(stylePattern, '')
				// Where the svg Style element exist for client
				this.svgCSS = string.match(stylePattern)[0].replace(/\t/g, ' ')
			} else {
				this.stringify_STYLE_ELEM()
			}
		}

		this.string = this.string.replace(/enable-background.+"\s/g, '')

		if (hasColan) {
			
			this.string =  this.string.replace(/(.*\sstyle=".*)(:)(.*\/>)/gi, '$1="$3')

		}
		if (hasStyle) {
			this.string = this.string.replace(isStyle, '')
		}
		if (hasSemiColan) {
			this.string = this.string.replace(/(<.*)(#.*)(;)(.*)?/gi, '$1$2" $4')
		}
		if (isGradientStyle) {
			this.string = this.string.replace(isColorPattern, 'stopColor')
		}
		if (hasStopOpacity) {
			this.string = this.string.replace(isStopOpacity, 'stopOpacity')
		}
		if (hasClass) {
			this.string = this.string.replace(isClassPattern, 'className=')
		}
		if (hasTitle) {
			this.string = this.string.replace(/<title>.*<\/title>/, '')
		}
		if(hasIDorVersion) {
			this.string = this.string.replace(isIDorVersion, '')
		}
		
		/**
		 * Format
		 * See {@link Format}
		 */
		let formated = Format.indent(this.string, this.svgCSS)

		return formated
	}
}

module.exports = Convert
