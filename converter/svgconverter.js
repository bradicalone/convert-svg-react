const Format = require('./format')

const {
	stylePattern,
	isColan,
	isSemiColan,
	isStyle, 
	isColorPattern, 
	isStopOpacity, isClassPattern, isxmlPattern, cssObjects, isTitle, enabledBackground, isIDorVersion
} = require("./constants");

let test_string = `<div class="photo-robot-wrapper"><svg version="1.1" id="clock" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
viewBox="0 0 551.1 551.2" style="enable-background:new 0 0 551.1 551.2;" xml:space="preserve">
<style type="text/css">
.st0{fill:#020202;}
.st1{stroke:#000000;stroke-width:34;stroke-linecap:round;stroke-miterlimit:10;}
</style>
<path id="left-ring" class="st0" d="M150.2,64.6C99.2,91,57.6,132.9,31.6,184.1c-4.9-3.4-9.4-7.4-13.5-12
c-28.4-32.5-22.7-84,12.7-115c35.4-31,87.2-29.7,115.6,2.8C147.8,61.4,149,63,150.2,64.6z"/>
<path id="right-ring" class="st0" d="M533,172.1c-3.9,4.5-8.2,8.3-12.9,11.6c-26.1-51.2-67.9-93.1-119-119.4c1.1-1.5,2.3-3,3.5-4.4
	c28.4-32.5,80.2-33.7,115.6-2.8C555.8,88.1,561.5,139.6,533,172.1z"/><path id="body" d="M421.8,497.5c56.7-43.7,93.2-112.3,93.2-189.4c0-120.2-88.8-219.7-204.3-236.5V33.8h16.8
c9.3,0,16.9-7.6,16.9-16.9v0c0-9.3-7.6-16.9-16.9-16.9H224.6c-9.3,0-16.9,7.6-16.9,16.9v0c0,9.3,7.6,16.9,16.9,16.9h16.8v37.8
C125.7,88.4,37,187.8,37,308.1c0,77.5,36.9,146.4,94.1,190.1L106.2,523c-6.4,6.4-6.4,16.9,0,23.3c3.2,3.2,7.5,4.8,11.7,4.8
c4.2,0,8.4-1.6,11.7-4.8l29.7-29.7c34.5,19.4,74.4,30.4,116.8,30.4c42.8,0,83-11.2,117.7-31l30.2,30.2c3.2,3.2,7.4,4.8,11.7,4.8
c4.2,0,8.4-1.6,11.7-4.8c6.4-6.5,6.4-16.9,0-23.3L421.8,497.5z M386.3,485.4c-4.8,3-9.8,5.8-14.9,8.5c-28.6,14.7-61.1,23-95.5,23
c-34,0-66.1-8.1-94.5-22.5c-5.1-2.6-10.1-5.4-14.9-8.4c-4.8-2.9-9.4-6.1-13.9-9.4c-51.8-38-85.5-99.3-85.5-168.5
c0-115.3,93.5-208.8,208.8-208.8s208.8,93.5,208.8,208.8c0,68.8-33.3,129.8-84.6,167.8C395.7,479.3,391.1,482.4,386.3,485.4z"/>
<g id="hands"><line class="st1" x1="280" y1="308.5" x2="280" y2="198.3"/>
	<line class="st1" x1="280" y1="308.5" x2="224.8" y2="403.8"/></g>
</svg>
</div>`

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
		let last = CSSobjects[length - 1]
		let toString = ''
		for (let i = 0; i < length; i++) {
			const element = CSSobjects[i];

			// Replaces last line
			if (i === length - 1) {
				toString += element.replace(/(\..*;})/gi, '"$1"\n}</style>');
				// Replaces first line
			} else if (i === 0) {
				toString += element.replace(/(\..*;})/gi, '<style type="text/css">{\n"$1"+\n');
				// Replaces every line but first and last
			} else {
				toString += element.replace(/(\..*;})/gi, ' "$1"+\n');
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
		const hasSemiColan = isSemiColan.test(string)
		const isGradientStyle = isColorPattern.test(string)
		const hasClass = isClassPattern.test(string)
		const hasTitle = isTitle.test(string)
		const hasXML = isxmlPattern.test(string)
		const hasStopOpacity = isStopOpacity.test(string)
		const hasEnabledBackground = enabledBackground.test(string)
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
		if (hasEnabledBackground) {
			this.string = this.string.replace(/enable-background.+"\s/g, '')
		}
		if (hasColan) {
			this.string = this.string.replace(isColan, '="')
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
